"""VÍDEOS LONGOS: baixa os clipes de clipes_longos.json para public/clipes_longo/ID_cena.mp4,
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
DEST = RAIZ / "public" / "clipes_longo"; DEST.mkdir(parents=True, exist_ok=True)
PREV = RAIZ / "previa"; PREV.mkdir(exist_ok=True)
clipes = json.loads((RAIZ / "clipes_longos.json").read_text(encoding="utf-8"))
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
    subprocess.run([str(FF / "ffmpeg.exe"), "-v", "error", "-y", "-ss", "2", "-i", str(alvo), "-frames:v", "1", "-vf", "scale=320:180",
                    str(PREV / f"L_{nome}.jpg")])
    return nome, round(float(d), 2)


with ThreadPoolExecutor(6) as ex:
    dur = dict(ex.map(baixar, clipes.items()))
arq = DEST / "duracoes.json"
todas = json.loads(arq.read_text(encoding="utf-8")) if arq.exists() else {}
todas.update(dur)
arq.write_text(json.dumps(todas, indent=1), encoding="utf-8")

# folha de conferência com nome de cada clipe
from PIL import Image, ImageDraw
for s_ in sorted({k.rsplit("_", 1)[0] for k in clipes}):
    ims = sorted(PREV.glob(f"L_{s_}_*.jpg"), key=lambda p: int(p.stem.rsplit("_", 1)[1]))
    cols = 6; W, H = 320, 180
    fol = Image.new("RGB", (W * cols, (H + 20) * ((len(ims) + cols - 1) // cols)), "black"); d = ImageDraw.Draw(fol)
    for i, p in enumerate(ims):
        x, y = (i % cols) * W, (i // cols) * (H + 20)
        fol.paste(Image.open(p).resize((W, H)), (x, y)); d.text((x + 4, y + H + 3), p.stem[2:], fill="white")
    fol.save(PREV / f"longo_{s_}.jpg")
print(len(dur), "clipes;", {k: v for k, v in dur.items() if v < 8})
