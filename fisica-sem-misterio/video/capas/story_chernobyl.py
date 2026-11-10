"""Moldura do story do longo Chernobyl (1080x1920, transparente no meio). A abertura usa fotos CC BY-SA: crédito pequeno embaixo."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
D = Path(__file__).resolve().parent
F = "C:/Windows/Fonts/seguibl.ttf"
im = Image.new("RGBA", (1080, 1920), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
def t(y, s, tam, cor):
    d.text((540, y), s, font=ImageFont.truetype(F, tam), fill=cor, stroke_width=8, stroke_fill="black", anchor="mm")
def pilula(y, s, tam, fundo, cor, larg):
    d.rounded_rectangle((540 - larg // 2, y - 55, 540 + larg // 2, y + 55), 30, fill=fundo)
    d.text((540, y), s, font=ImageFont.truetype(F, tam), fill=cor, anchor="mm")
pilula(290, "VÍDEO NOVO", 62, "#E8401C", "white", 560)
t(450, "Por que CHERNOBYL", 92, "#FFC94A"); t(560, "explodiu?", 92, "white")
t(1440, "O botão que deveria", 72, "white"); t(1530, "desligar o reator", 72, "white")
pilula(1720, "TOQUE NO LINK", 66, "#FFC94A", "black", 640)
d.text((540, 1868), "Fotos: IAEA Imagebank e Omar D. Sandoval Sida (CC BY-SA)", font=ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 26), fill="white", anchor="mm", stroke_width=3, stroke_fill="black")
im.save(D.parent / "out" / "story_overlay_chernobyl.png")
print("ok")
