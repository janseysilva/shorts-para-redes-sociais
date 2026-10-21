"""Capas do longo Quantica (21/10) — 3 versões para o Teste A/B do YouTube."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageEnhance
D = Path(__file__).resolve().parent; FOT = D.parent / "public/fotos"
F = "C:/Windows/Fonts/seguibl.ttf"
def texto(d, xy, s, tam, cor, contorno=10, anchor="la"):
    d.text(xy, s, font=ImageFont.truetype(F, tam), fill=cor, stroke_width=contorno, stroke_fill="black", anchor=anchor)
def base(nome, box=None):
    im = Image.open(FOT / f"{nome}.jpg").convert("RGB")
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
# A: a pulseira
im = base("Qt_pbpulso"); d = ImageDraw.Draw(im)
texto(d, (45, 90), "PULSEIRA", 130, "#FFFFFF", 11); texto(d, (45, 230), "QUÂNTICA?", 130, "#FFC94A", 11)
d.rounded_rectangle((52, 420, 700, 505), 18, fill="#E8401C"); texto(d, (376, 462), "a física responde", 52, "white", 0, "mm")
im.save(D / "capa_Quantica_A.jpg", quality=92)
# B: energia quântica existe?
im = base("Qt_neon"); d = ImageDraw.Draw(im)
texto(d, (45, 90), "ENERGIA", 130, "#FFFFFF", 11); texto(d, (45, 230), "QUÂNTICA?", 130, "#FFC94A", 11)
d.rounded_rectangle((52, 420, 760, 505), 18, fill="#E8401C"); texto(d, (406, 462), "verdade ou propaganda", 50, "white", 0, "mm")
im.save(D / "capa_Quantica_B.jpg", quality=92)
# C: o computador quântico
im = base("Qt_ibm"); d = ImageDraw.Draw(im)
texto(d, (45, 90), "QUÂNTICO", 130, "#FFFFFF", 11); texto(d, (45, 230), "DE VERDADE", 120, "#FFC94A", 11)
d.rounded_rectangle((52, 420, 700, 505), 18, fill="#E8401C"); texto(d, (376, 462), "o que existe mesmo", 52, "white", 0, "mm")
im.save(D / "capa_Quantica_C.jpg", quality=92)
print("ok")
