"""Narração dos vídeos longos: gera cada cena separada (tempo exato de cada cena) e junta tudo.

Uso: python narrar_longo.py roteiros/Vulcao.json
Saída em public/ID/: narracao.mp3 e tempos.json ({palavras, cenas, capitulos:[{titulo, ini}], total})
"""
import asyncio, json, shutil, subprocess, sys, tempfile
from pathlib import Path
import edge_tts

VOZ = "pt-BR-AntonioNeural"
VELOCIDADE = "+3%"   # um pouco mais calmo que os shorts
PAUSA = 0.45          # silêncio entre as cenas (s)
PAUSA_CAP = 0.9       # silêncio extra antes de um capítulo novo
RAIZ = Path(__file__).resolve().parent
_BIN = Path.home() / "AppData/Local/ffmpeg/ffmpeg-8.1.2-essentials_build/bin"
FF = str(_BIN / "ffmpeg.exe") if _BIN.exists() else shutil.which("ffmpeg")
FP = str(_BIN / "ffprobe.exe") if _BIN.exists() else shutil.which("ffprobe")


async def cena(texto):
    com = edge_tts.Communicate(texto, VOZ, rate=VELOCIDADE, boundary="WordBoundary")
    audio, palavras = bytearray(), []
    async for ch in com.stream():
        if ch["type"] == "audio":
            audio += ch["data"]
        elif ch["type"] == "WordBoundary":
            ini = ch["offset"] / 1e7
            palavras.append({"t": ch["text"], "ini": ini, "fim": ini + ch["duration"] / 1e7})
    return bytes(audio), palavras


def duracao(arq):
    out = subprocess.run([FP, "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(arq)], capture_output=True, text=True).stdout
    return float(out.strip())


async def main(roteiro):
    dados = json.loads(Path(roteiro).read_text(encoding="utf-8"))
    pub = RAIZ / "public" / dados["id"]; pub.mkdir(parents=True, exist_ok=True)
    tmp = Path(tempfile.mkdtemp())
    palavras, cenas, caps, partes, t = [], [], [], [], 0.6
    n = 0
    for cap in dados["capitulos"]:
        if n:
            t += PAUSA_CAP
        caps.append({"titulo": cap["titulo"], "ini": round(t, 3)})
        for c in cap["cenas"]:
            for tentativa in range(3):
                try:
                    audio, pal = await cena(c["frase"]); break
                except Exception:
                    if tentativa == 2: raise
                    await asyncio.sleep(3)
            arq = tmp / f"{n:03d}.mp3"; arq.write_bytes(audio)
            d = duracao(arq)
            cenas.append(round(t, 3))
            palavras += [{"t": p["t"], "ini": round(t + p["ini"], 3), "fim": round(t + p["fim"], 3)} for p in pal]
            partes.append((arq, t))
            t += d + PAUSA
            n += 1
    total = t + 8.0  # tempo da tela final
    # mistura: cada trecho entra no seu tempo exato
    args, filtros = [], []
    for i, (arq, ini) in enumerate(partes):
        args += ["-i", str(arq)]
        filtros.append(f"[{i}]adelay={int(ini * 1000)}|{int(ini * 1000)}[a{i}]")
    filtros.append("".join(f"[a{i}]" for i in range(len(partes))) + f"amix=inputs={len(partes)}:normalize=0,atrim=0:{total:.2f}[s]")
    (tmp / "f.txt").write_text(";".join(filtros), encoding="utf-8")
    subprocess.run([FF, "-v", "error", "-y", *args, "-filter_complex_script", str(tmp / "f.txt"), "-map", "[s]", "-c:a", "libmp3lame",
                    "-b:a", "160k", str(pub / "narracao.mp3")], check=True)
    (pub / "tempos.json").write_text(json.dumps({"palavras": palavras, "cenas": cenas, "capitulos": caps, "total": round(total, 2)},
                                                ensure_ascii=False), encoding="utf-8")
    shutil.rmtree(tmp, ignore_errors=True)
    print(f"{dados['id']}: {n} cenas, {len(palavras)} palavras, {total / 60:.1f} min")
    for c in caps:
        m, s = divmod(int(c["ini"]), 60); print(f"  {m}:{s:02d} {c['titulo']}")


asyncio.run(main(sys.argv[1]))
