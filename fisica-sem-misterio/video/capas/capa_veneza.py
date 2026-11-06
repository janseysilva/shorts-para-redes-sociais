"""Capas do longo Veneza (06/11) — 3 versões para o Teste A/B do YouTube, todas com foto real."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageEnhance
D = Path(__file__).resolve().parent; FOT = D.parent / "public/fotos"
F = "C:/Windows/Fonts/seguibl.ttf"
def texto(d, xy, s, tam, cor, contorno=10, anchor="la"):
    d.text(xy, s, font=ImageFont.truetype(F, tam), fill=cor, stroke_width=contorno, stroke_fill="black", anchor=anchor)
def base(arq, y_rel=0.5, forca=0.7):
    im = Image.open(arq).convert("RGB")
    r = 1280 / 720
    if im.width / im.height > r:
        w = int(im.height * r); x = (im.width - w) // 2; im = im.crop((x, 0, x + w, im.height))
    else:
        h = int(im.width / r); y = int((im.height - h) * y_rel); im = im.crop((0, y, im.width, y + h))
    im = im.resize((1280, 720), Image.LANCZOS)
    im = ImageEnhance.Contrast(im).enhance(1.12)
    g = Image.linear_gradient("L").rotate(90).resize((1280, 720)).point(lambda v: int((255 - v) * forca))
    return Image.composite(Image.new("RGB", im.size, "black"), im, g)
def etiqueta(d, x, y, w, s, cor="#E8401C"):
    d.rounded_rectangle((x, y, x + w, y + 80), 18, fill=cor); texto(d, (x + w // 2, y + 40), s, 46, "white", 0, "mm")
# A: a igreja sobre os troncos
im = base(FOT / "Vz_salute.jpg", 0.30); d = ImageDraw.Draw(im)
texto(d, (45, 60), "1 MILHÃO", 128, "#FFC94A", 12); texto(d, (45, 195), "DE TRONCOS", 104, "#FFFFFF", 12)
etiqueta(d, 52, 345, 560, "embaixo desta igreja")
im.save(D / "capa_Veneza_A.jpg", quality=92)
# B: a cidade com a água na porta
im = base(FOT / "Vz_acqua1.jpg", 0.45); d = ImageDraw.Draw(im)
texto(d, (45, 70), "COMO ISSO", 118, "#FFFFFF", 12); texto(d, (45, 205), "NÃO AFUNDA?", 118, "#FFC94A", 12)
etiqueta(d, 52, 370, 620, "Veneza fica sobre lama")
im.save(D / "capa_Veneza_B.jpg", quality=92)
# C: vista do espaço
im = base(FOT / "Vz_nasa2.jpg", 0.5); d = ImageDraw.Draw(im)
texto(d, (45, 70), "UMA CIDADE", 110, "#FFFFFF", 12); texto(d, (45, 195), "SOBRE TRONCOS", 104, "#FFC94A", 12)
etiqueta(d, 52, 345, 560, "no meio de uma lagoa")
im.save(D / "capa_Veneza_C.jpg", quality=92)
print("ok")
