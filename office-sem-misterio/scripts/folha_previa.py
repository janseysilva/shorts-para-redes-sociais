"""Junta os prints de previa/<nome>/ numa folha só (pra conferir rápido). Uso: python scripts/folha_previa.py word1"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw

d = Path(__file__).resolve().parent.parent / "previa" / sys.argv[1]
ims = sorted(d.glob("t*.png"))
W, H = 360, 640
cols = 4
rows = (len(ims) + cols - 1) // cols
folha = Image.new("RGB", (cols * W, rows * (H + 30)), "white")
dr = ImageDraw.Draw(folha)
for i, p in enumerate(ims):
    x, y = (i % cols) * W, (i // cols) * (H + 30)
    folha.paste(Image.open(p).resize((W, H)), (x, y + 30))
    dr.text((x + 8, y + 8), p.stem, fill="black")
folha.save(d.parent / f"{sys.argv[1]}_folha.jpg", quality=85)
