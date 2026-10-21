"""Capa do longo SolExplodir (21/10): Sol real (NASA/SDO) à direita + 4 palavras grandes."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageFilter
D = Path(__file__).resolve().parent
F = "C:/Windows/Fonts/seguibl.ttf"

def texto(d, xy, s, tam, cor, contorno=10, anchor="la"):
    d.text(xy, s, font=ImageFont.truetype(F, tam), fill=cor, stroke_width=contorno, stroke_fill="black", anchor=anchor)

sol = Image.open(D.parent / "public/fotos/Sol_fil.jpg").convert("RGB")
sol = ImageEnhance.Contrast(sol).enhance(1.2)
sol = ImageEnhance.Brightness(sol).enhance(1.15)
s = 860
sol = sol.resize((round(sol.width * s / sol.height), s), Image.LANCZOS)
im = Image.new("RGB", (1280, 720), "black")
brilho = sol.filter(ImageFilter.GaussianBlur(40))
x = 1280 - sol.width // 2 - 330
im.paste(brilho, (x, -70)); im = Image.blend(im, im, 1)
im.paste(sol, (x, -70), Image.eval(sol.convert("L"), lambda v: 255 if v > 18 else int(v * 14)))
d = ImageDraw.Draw(im)
texto(d, (45, 95), "E SE O SOL", 118, "#FFFFFF", 11)
texto(d, (45, 230), "EXPLODISSE?", 118, "#FFC94A", 11)
d.rounded_rectangle((52, 420, 600, 505), 18, fill="#E8401C"); texto(d, (326, 462), "o que a física diz", 54, "white", 0, "mm")
texto(d, (55, 560), "minuto a minuto", 52, "#FFFFFF", 6)
im.save(D / "capa_SolExplodir.jpg", quality=92)
print("ok")
