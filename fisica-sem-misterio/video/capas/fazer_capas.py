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

# Vulcão
im = base("q_Vulcao_9.jpg", espelha=True); d = ImageDraw.Draw(im)
texto(d, (60, 120), "VULCÃO", 210, "#FFFFFF", 12)
texto(d, (66, 360), "POR QUE A TERRA", 78, "#FFC94A", 8)
texto(d, (66, 450), "COSPE FOGO?", 78, "#FFC94A", 8)
d.rounded_rectangle((66, 570, 470, 660), 18, fill="#E8401C"); texto(d, (268, 615), "1.200 °C", 66, "white", 0, "mm")
im.save(D / "capa_Vulcao.jpg", quality=92)

# Oymyakon
im = base("q_Oymyakon_30.jpg"); d = ImageDraw.Draw(im)
texto(d, (50, 120), "−67 °C", 175, "#BFF4FF", 12)
texto(d, (58, 370), "A VILA MAIS FRIA", 74, "#FFFFFF", 8)
texto(d, (58, 455), "DO MUNDO", 74, "#FFFFFF", 8)
d.rounded_rectangle((58, 580, 640, 660), 18, fill="#1D7FD6"); texto(d, (349, 620), "água fervendo vira neve", 44, "white", 0, "mm")
im.save(D / "capa_Oymyakon.jpg", quality=92)
print("ok")
