"""Capas do longo AviaoPassageiro (21/10) — 3 versões para o Teste A/B do YouTube."""
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
# A: o 747 jogando combustível
im = base("Av_jett"); d = ImageDraw.Draw(im)
texto(d, (45, 90), "NÃO PODE", 130, "#FFFFFF", 11); texto(d, (45, 230), "POUSAR!", 130, "#FFC94A", 11)
d.rounded_rectangle((52, 420, 740, 505), 18, fill="#E8401C"); texto(d, (396, 462), "por que joga combustível?", 48, "white", 0, "mm")
im.save(D / "capa_AviaoPassageiro_A.jpg", quality=92)
# B: o 777 decolando
im = base("Av_777"); d = ImageDraw.Draw(im)
texto(d, (45, 90), "PESADO DEMAIS", 108, "#FFFFFF", 10); texto(d, (45, 215), "PRA POUSAR?", 108, "#FFC94A", 10)
d.rounded_rectangle((52, 400, 640, 485), 18, fill="#E8401C"); texto(d, (346, 442), "+6 dúvidas de avião", 50, "white", 0, "mm")
im.save(D / "capa_AviaoPassageiro_B.jpg", quality=92)
# C: a porta
im = base("Av_toque"); d = ImageDraw.Draw(im)
texto(d, (45, 90), "7 DÚVIDAS", 130, "#FFFFFF", 11); texto(d, (45, 230), "DE AVIÃO", 130, "#FFC94A", 11)
d.rounded_rectangle((52, 420, 620, 505), 18, fill="#E8401C"); texto(d, (336, 462), "que a física responde", 48, "white", 0, "mm")
im.save(D / "capa_AviaoPassageiro_C.jpg", quality=92)
print("ok")
