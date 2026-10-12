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

# Tornado
im = base("q_Tornado_0.jpg"); d = ImageDraw.Draw(im)
texto(d, (50, 110), "TORNADO", 190, "#FFFFFF", 12)
texto(d, (58, 350), "COMO NASCE UM", 74, "#FFC94A", 8)
texto(d, (58, 435), "MONSTRO DE VENTO", 74, "#FFC94A", 8)
d.rounded_rectangle((58, 570, 620, 655), 18, fill="#E8401C"); texto(d, (339, 612), "o Brasil também tem!", 50, "white", 0, "mm")
im.save(D / "capa_Tornado.jpg", quality=92)

# Terra parada
im = base("q_TerraParar_0.jpg", escurece_esq=False, espelha=True); d = ImageDraw.Draw(im)
texto(d, (50, 120), "E SE A TERRA", 110, "#FFFFFF", 10)
texto(d, (50, 250), "PARASSE?", 170, "#FFC94A", 12)
d.rounded_rectangle((58, 560, 600, 645), 18, fill="#1D7FD6"); texto(d, (329, 602), "1.670 km/h → zero", 52, "white", 0, "mm")
im.save(D / "capa_TerraParar.jpg", quality=92)
print("ok2")

# Meteoro
im = base("q_Meteoro_0.jpg"); d = ImageDraw.Draw(im)
texto(d, (50, 110), "METEORO", 190, "#FFFFFF", 12)
texto(d, (58, 350), "O DIA EM QUE OS", 74, "#FFC94A", 8)
texto(d, (58, 435), "DINOSSAUROS ACABARAM", 74, "#FFC94A", 8)
d.rounded_rectangle((58, 570, 560, 655), 18, fill="#E8401C"); texto(d, (309, 612), "e se cair outro?", 54, "white", 0, "mm")
im.save(D / "capa_Meteoro.jpg", quality=92)

# Buraco negro
im = base("q_BuracoNegro_0.jpg"); d = ImageDraw.Draw(im)
texto(d, (50, 110), "BURACO", 170, "#FFFFFF", 12)
texto(d, (50, 290), "NEGRO", 170, "#FFFFFF", 12)
texto(d, (58, 500), "E SE VOCÊ CAÍSSE?", 74, "#FFC94A", 8)
d.rounded_rectangle((58, 600, 640, 680), 18, fill="#1D7FD6"); texto(d, (349, 640), "a primeira foto real", 50, "white", 0, "mm")
im.save(D / "capa_BuracoNegro.jpg", quality=92)
print("ok3")
