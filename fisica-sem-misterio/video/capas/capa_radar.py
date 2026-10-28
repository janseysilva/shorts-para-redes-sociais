"""Capas do longo Radar (28/10) — 3 versões para o Teste A/B do YouTube (sem foto de Hitler nem suástica)."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageEnhance
D = Path(__file__).resolve().parent; FOT = D.parent / "public/fotos"
F = "C:/Windows/Fonts/seguibl.ttf"
def texto(d, xy, s, tam, cor, contorno=10, anchor="la"):
    d.text(xy, s, font=ImageFont.truetype(F, tam), fill=cor, stroke_width=contorno, stroke_fill="black", anchor=anchor)
def base(arq, box=None):
    im = Image.open(arq).convert("RGB")
    if box: im = im.crop(box)
    r = 1280 / 720
    if im.width / im.height > r:
        w = int(im.height * r); x = (im.width - w) // 2; im = im.crop((x, 0, x + w, im.height))
    else:
        h = int(im.width / r); y = (im.height - h) // 2; im = im.crop((0, y, im.width, y + h))
    im = im.resize((1280, 720), Image.LANCZOS)
    im = ImageEnhance.Contrast(im).enhance(1.15)
    g = Image.linear_gradient("L").rotate(90).resize((1280, 720)).point(lambda v: int((255 - v) * 0.7))
    return Image.composite(Image.new("RGB", im.size, "black"), im, g)
# A: os Spitfires de 1940
im = base(FOT / "Rd_spitfire.jpg"); d = ImageDraw.Draw(im)
texto(d, (45, 90), "RADAR", 150, "#FFFFFF", 12); texto(d, (45, 250), "A ARMA SECRETA", 92, "#FFC94A", 10)
d.rounded_rectangle((52, 420, 700, 505), 18, fill="#E8401C"); texto(d, (376, 462), "que venceu Hitler", 54, "white", 0, "mm")
im.save(D / "capa_Radar_A.jpg", quality=92)
# B: as torres da Chain Home
im = base(FOT / "Rd_poling.jpg"); d = ImageDraw.Draw(im)
texto(d, (45, 90), "RADAR", 150, "#FFFFFF", 12); texto(d, (45, 250), "A ARMA SECRETA", 92, "#FFC94A", 10)
d.rounded_rectangle((52, 420, 760, 505), 18, fill="#E8401C"); texto(d, (406, 462), "e virou o micro-ondas", 52, "white", 0, "mm")
im.save(D / "capa_Radar_B.jpg", quality=92)
# C: a cena do teste de 1935 (IA)
im = base(D / "q_radar_ia.jpg"); d = ImageDraw.Draw(im)
texto(d, (45, 90), "O SEGREDO", 140, "#FFFFFF", 12); texto(d, (45, 245), "QUE PAROU HITLER", 86, "#FFC94A", 10)
d.rounded_rectangle((52, 420, 600, 505), 18, fill="#E8401C"); texto(d, (326, 462), "a física do radar", 52, "white", 0, "mm")
im.save(D / "capa_Radar_C.jpg", quality=92)
print("ok")
