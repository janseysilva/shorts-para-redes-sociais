"""Tira prints de um short em alguns segundos e junta numa folha (previa/<id>_folha.jpg).
Uso: python previa.py SemSalvar 1,5,9,13
"""
import shutil
import os, subprocess, sys
from pathlib import Path
from PIL import Image

RAIZ = Path(__file__).resolve().parent
NODE = Path(os.environ["LOCALAPPDATA"]) / "nodejs" / "node-v24.21.0-win-x64"
if not NODE.exists():  # em outro PC: usa o Node do PATH
    NODE = Path(shutil.which("npx")).parent
env = dict(os.environ, PATH=str(NODE) + os.pathsep + os.environ["PATH"])
comp, tempos = sys.argv[1], [float(x) for x in sys.argv[2].split(",")]
(RAIZ / "previa").mkdir(exist_ok=True)
ims = []
for s in tempos:
    out = RAIZ / "previa" / f"{comp}_{int(s*30)}.png"
    subprocess.run([str(NODE / "npx.cmd"), "remotion", "still", "src/index.ts", comp, str(out), f"--frame={int(s*30)}", "--log=error"],
                   cwd=RAIZ, env=env, check=True)
    ims.append(Image.open(out).convert("RGB").resize((300, 533)))
folha = Image.new("RGB", (300 * len(ims), 533))
for i, im in enumerate(ims):
    folha.paste(im, (i * 300, 0))
folha.save(RAIZ / "previa" / f"{comp}_folha.jpg", quality=85)
print("ok")
