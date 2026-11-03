"""Capas do longo Titanic (30/10) — 3 versões para o Teste A/B do YouTube, todas com foto real."""
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
def etiqueta(d, x, w, s):
    d.rounded_rectangle((x, 420, x + w, 505), 18, fill="#E8401C"); texto(d, (x + w // 2, 462), s, 52, "white", 0, "mm")
# A: o Titanic saindo de Southampton
im = base(FOT / "Tt_partida.jpg"); d = ImageDraw.Draw(im)
texto(d, (45, 90), "TITANIC", 150, "#FFFFFF", 12); texto(d, (45, 255), "POR QUE AFUNDOU?", 86, "#FFC94A", 10)
etiqueta(d, 52, 620, "a física do naufrágio")
im.save(D / "capa_Titanic_A.jpg", quality=92)
# B: o iceberg fotografado dias depois
im = base(FOT / "Tt_iceberg2.jpg"); d = ImageDraw.Draw(im)
texto(d, (45, 90), "O ICEBERG", 140, "#FFFFFF", 12); texto(d, (45, 245), "DO TITANIC", 100, "#FFC94A", 10)
etiqueta(d, 52, 600, "90% fica escondido")
im.save(D / "capa_Titanic_B.jpg", quality=92)
# C: a proa no fundo do mar
im = base(FOT / "Tt_proa.jpg"); d = ImageDraw.Draw(im)
texto(d, (45, 90), "TITANIC", 150, "#FFFFFF", 12); texto(d, (45, 255), "PARTIDO EM DOIS", 86, "#FFC94A", 10)
etiqueta(d, 52, 560, "a 3.800 metros")
im.save(D / "capa_Titanic_C.jpg", quality=92)
print("ok")
