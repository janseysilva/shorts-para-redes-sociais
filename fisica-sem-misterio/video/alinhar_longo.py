"""Narração dos LONGOS com a voz do Jansey (KikiVoice): junta as partes e acha o tempo de cada palavra.

O KikiVoice aceita até 1000 caracteres por vez, então o texto do longo é gerado em partes (cortadas no fim de um
capítulo) e salvas como narracoes_kiki/ID_p0.mp3, ID_p1.mp3, ... Este programa junta as partes (com um respiro
entre elas), roda o alinhador (alinhar.py) e grava public/ID/narracao.mp3 + tempos.json no MESMO formato do
narrar_longo.py ({palavras, cenas, capitulos:[{titulo, ini}], total}).

Uso: python alinhar_longo.py roteiros/ID.json
"""
import glob, json, os, subprocess, sys, tempfile
from pathlib import Path

import alinhar

RAIZ = Path(__file__).resolve().parent
FF = glob.glob(os.path.expandvars(r"%LOCALAPPDATA%\ffmpeg\**\ffmpeg.exe"), recursive=True)[0]
INICIO = 0.6   # silêncio antes da 1ª palavra (igual ao narrar_longo)
RESPIRO = 0.7  # silêncio entre uma parte e outra


def main(roteiro):
    dados = json.loads(Path(roteiro).read_text(encoding="utf-8"))
    partes = sorted((RAIZ / "narracoes_kiki").glob(f"{dados['id']}_p*.mp3"), key=lambda p: int(p.stem.rsplit("_p", 1)[1]))
    if not partes:
        sys.exit("nenhuma parte em narracoes_kiki/")
    pub = RAIZ / "public" / dados["id"]; pub.mkdir(parents=True, exist_ok=True)
    tmp = Path(tempfile.mkdtemp())
    sil = lambda d, n: subprocess.run([FF, "-v", "error", "-y", "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono", "-t", str(d), str(tmp / n)], check=True)
    sil(INICIO, "ini.wav"); sil(RESPIRO, "resp.wav")
    lista = [tmp / "ini.wav"]
    for k, p in enumerate(partes):
        w = tmp / f"p{k}.wav"
        subprocess.run([FF, "-v", "error", "-y", "-i", str(p), "-ar", "24000", "-ac", "1", str(w)], check=True)
        lista += ([tmp / "resp.wav"] if k else []) + [w]
    (tmp / "lista.txt").write_text("".join(f"file '{x.as_posix()}'\n" for x in lista), encoding="utf-8")
    final = pub / "narracao.mp3"
    subprocess.run([FF, "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", str(tmp / "lista.txt"), "-c:a", "libmp3lame", "-b:a", "192k", str(final)], check=True)

    frases, primeira_do_cap = [], []
    for cap in dados["capitulos"]:
        primeira_do_cap.append(len(frases))
        frases += [c["frase"] for c in cap["cenas"]]
    palavras, cenas, fim, taxa = alinhar.alinhar(final, frases)
    caps = [{"titulo": cap["titulo"], "ini": cenas[i]} for cap, i in zip(dados["capitulos"], primeira_do_cap)]
    total = round(max(fim, palavras[-1]["fim"]) + 1.5, 2)
    (pub / "tempos.json").write_text(json.dumps({"palavras": palavras, "cenas": cenas, "capitulos": caps, "total": total},
                                                ensure_ascii=False), encoding="utf-8")
    print(f"{len(partes)} partes, {len(palavras)} palavras, {total:.1f}s, {taxa:.0%} casadas, {len(cenas)} cenas")


if __name__ == "__main__":
    main(sys.argv[1])
