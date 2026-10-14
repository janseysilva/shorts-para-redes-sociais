"""Capas (1280x720) dos vídeos longos, a partir de um quadro real do vídeo + texto grande."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
D = Path(__file__).resolve().parent
F = "C:/Windows/Fonts/seguibl.ttf"

def texto(d, xy, s, tam, cor, contorno=10, anchor="la"):
    f = ImageFont.truetype(F, tam)
    d.text(xy, s, font=f, fill=cor, stroke_width=contorno, stroke_fill="black", anchor=anchor)

def base(q, escurece_esq=True, espelha=False):
    im = Image.open(D / q).convert("RGB").resize((1280, 720), Image.LANCZOS)
    if espelha:
        im = im.transpose(Image.FLIP_LEFT_RIGHT)
    im = ImageEnhance.Contrast(im).enhance(1.15)
    if escurece_esq:
        g = Image.linear_gradient("L").rotate(90).resize((1280, 720))  # escuro à esquerda
        g = g.point(lambda v: 255 - v) if g.getpixel((0, 360)) < g.getpixel((1279, 360)) else g
        im = Image.composite(Image.new("RGB", im.size, "black"), im, g.point(lambda v: int(v * 0.75)))
    return im


# Multigerador (14/10)
im = base("q_Multigerador.jpg"); d = ImageDraw.Draw(im)
texto(d, (50, 110), "ENERGIA", 150, "#FFFFFF", 12)
texto(d, (50, 260), "INFINITA?", 150, "#FFC94A", 12)
texto(d, (58, 440), "MULTIGERADOR", 64, "#FFFFFF", 7)
d.rounded_rectangle((58, 580, 700, 665), 18, fill="#E8401C"); texto(d, (379, 622), "e se funcionasse?", 56, "white", 0, "mm")
im.save(D / "capa_Multigerador.jpg", quality=92)
print("ok")
