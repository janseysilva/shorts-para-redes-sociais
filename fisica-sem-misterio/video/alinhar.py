"""Acha o tempo de cada palavra do roteiro dentro de um áudio já gravado (voz do Jansey clonada no KikiVoice).

Usa o reconhecedor de fala faster-whisper (roda no PC, sem internet depois do 1º uso) para ouvir o áudio,
e casa as palavras ouvidas com as palavras do roteiro. O texto da legenda é SEMPRE o do roteiro (grafia certa);
do reconhecedor só vem o tempo. Trechos que ele ouve diferente (ex.: "1986" no lugar de "mil novecentos e
oitenta e seis") recebem o tempo do intervalo, dividido pelo tamanho das palavras.

Uso como programa:  python alinhar.py roteiros/ID.json AUDIO.mp3   -> grava public/ID/narracao.mp3 e tempos.json
"""
import difflib, json, re, shutil, sys, unicodedata
from pathlib import Path

RAIZ = Path(__file__).resolve().parent
MODELO = "small"  # bom equilíbrio para português num PC de 4 núcleos
_modelo = None


def _norm(p):
    p = unicodedata.normalize("NFD", p.lower())
    p = "".join(c for c in p if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9]", "", p)


def _limpa(p):
    return p.strip(".,;:!?\"'()…—-–")


def ouvir(audio):
    """Palavras ouvidas: [(texto_normalizado, ini, fim)]."""
    global _modelo
    if _modelo is None:
        from faster_whisper import WhisperModel
        _modelo = WhisperModel(MODELO, device="cpu", compute_type="int8", cpu_threads=2)
    # o leitor de áudio do faster-whisper (pacote av) quebra nesta versão: lê com o ffmpeg do PC
    import glob, os, subprocess
    import numpy as np
    ff = glob.glob(os.path.expandvars(r"%LOCALAPPDATA%\ffmpeg\**\ffmpeg.exe"), recursive=True)[0]
    raw = subprocess.run([ff, "-v", "error", "-i", str(audio), "-ac", "1", "-ar", "16000", "-f", "s16le", "-"],
                         capture_output=True, check=True).stdout
    onda = np.frombuffer(raw, np.int16).astype(np.float32) / 32768
    segs, _ = _modelo.transcribe(onda, language="pt", word_timestamps=True, vad_filter=False, beam_size=5)
    out = []
    for s in segs:
        for w in s.words or []:
            n = _norm(w.word)
            if n:
                out.append((n, float(w.start), float(w.end)))
    return out


def alinhar(audio, frases):
    """Devolve (palavras[{t,ini,fim}], cenas[ini de cada frase], fim_da_fala)."""
    tokens, frase_de = [], []
    for k, f in enumerate(frases):
        for p in f.split():
            if _limpa(p):
                tokens.append(_limpa(p)); frase_de.append(k)
    ouv = ouvir(audio)
    a = [_norm(t) for t in tokens]
    b = [o[0] for o in ouv]
    tempo = [None] * len(tokens)
    for bl in difflib.SequenceMatcher(None, a, b, autojunk=False).get_matching_blocks():
        for j in range(bl.size):
            tempo[bl.a + j] = (ouv[bl.b + j][1], ouv[bl.b + j][2])
    fim_fala = ouv[-1][2] if ouv else 0.0
    # buracos (palavras que o reconhecedor ouviu diferente): divide o intervalo pelo tamanho das palavras
    i = 0
    while i < len(tokens):
        if tempo[i] is not None:
            i += 1; continue
        j = i
        while j < len(tokens) and tempo[j] is None:
            j += 1
        ini = tempo[i - 1][1] if i > 0 else (ouv[0][1] if ouv else 0.0)
        fim = tempo[j][0] if j < len(tokens) else fim_fala
        if fim <= ini:
            fim = ini + 0.25 * (j - i)
        pesos = [max(1, len(tokens[k])) for k in range(i, j)]
        tot, acc = sum(pesos), ini
        for k, w in zip(range(i, j), pesos):
            d = (fim - ini) * w / tot
            tempo[k] = (acc, acc + d * 0.92); acc += d
        i = j
    palavras = [{"t": t, "ini": round(s, 3), "fim": round(e, 3)} for t, (s, e) in zip(tokens, tempo)]
    cenas = []
    for k in range(len(frases)):
        idx = frase_de.index(k) if k in frase_de else len(tokens) - 1
        cenas.append(palavras[idx]["ini"])
    acertos = sum(1 for bl in difflib.SequenceMatcher(None, a, b, autojunk=False).get_matching_blocks() for _ in range(bl.size))
    return palavras, cenas, fim_fala, acertos / max(1, len(tokens))


def main(roteiro, audio):
    dados = json.loads(Path(roteiro).read_text(encoding="utf-8"))
    palavras, cenas, fim, taxa = alinhar(audio, dados["frases"])
    pub = RAIZ / "public" / dados["id"]; pub.mkdir(parents=True, exist_ok=True)
    if Path(audio).resolve() != (pub / "narracao.mp3").resolve():
        shutil.copyfile(audio, pub / "narracao.mp3")
    total = round(max(fim, palavras[-1]["fim"]) + 1.2, 2)
    (pub / "tempos.json").write_text(json.dumps({"palavras": palavras, "cenas": cenas, "total": total}, ensure_ascii=False), encoding="utf-8")
    print(f"{len(palavras)} palavras, {total:.1f}s, {taxa:.0%} casadas pelo reconhecedor, cenas={cenas}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
