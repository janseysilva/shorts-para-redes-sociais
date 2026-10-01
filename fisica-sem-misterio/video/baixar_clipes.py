"""Baixa os clipes do Pexels listados em clipes.json para public/clipes/ID_cena.mp4,
grava a duração de cada um em public/clipes/duracoes.json e monta folhas de conferência (previa/clipes_ID.jpg).
Uso: python baixar_clipes.py [ID ...]   (com IDs, baixa só os clipes desses shorts)
"""
import shutil
import json, os, subprocess, sys, urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

RAIZ = Path(__file__).resolve().parent
FF = Path(os.environ["LOCALAPPDATA"]) / "ffmpeg/ffmpeg-8.1.2-essentials_build/bin"
if not FF.exists():  # em outro PC: usa o ffmpeg do PATH
    FF = Path(shutil.which("ffmpeg")).parent
DEST = RAIZ / "public" / "clipes"; DEST.mkdir(parents=True, exist_ok=True)
PREV = RAIZ / "previa"; PREV.mkdir(exist_ok=True)
clipes = json.loads((RAIZ / "clipes.json").read_text(encoding="utf-8"))
if sys.argv[1:]:
    clipes = {k: u for k, u in clipes.items() if k.rsplit("_", 1)[0] in sys.argv[1:]}


def baixar(item):
    nome, url = item
    alvo = DEST / f"{nome}.mp4"
    if not alvo.exists() or alvo.stat().st_size < 10000:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        alvo.write_bytes(urllib.request.urlopen(req, timeout=300).read())
    d = subprocess.run([str(FF / "ffprobe.exe"), "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(alvo)],
                       capture_output=True, text=True).stdout.strip()
    subprocess.run([str(FF / "ffmpeg.exe"), "-v", "error", "-y", "-ss", "2", "-i", str(alvo), "-frames:v", "1", "-vf", "scale=180:320",
                    str(PREV / f"c_{nome}.jpg")])
    return nome, round(float(d), 2)


with ThreadPoolExecutor(6) as ex:
    dur = dict(ex.map(baixar, clipes.items()))
arq = DEST / "duracoes.json"
todas = json.loads(arq.read_text(encoding="utf-8")) if arq.exists() else {}
todas.update(dur)
arq.write_text(json.dumps(todas, indent=1), encoding="utf-8")

# uma folha por short com os quadros dos clipes
for s in sorted({k.split("_")[0] for k in clipes}):
    ims = sorted(PREV.glob(f"c_{s}_*.jpg"))
    args = sum([["-i", str(p)] for p in ims], [])
    subprocess.run([str(FF / "ffmpeg.exe"), "-v", "error", "-y", *args, "-filter_complex", f"hstack=inputs={len(ims)}",
                    str(PREV / f"clipes_{s}.jpg")])
print(len(dur), "clipes;", {k: v for k, v in dur.items() if v < 6})
