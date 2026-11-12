"""Moldura do story do longo ApagaoMundial (1080x1920, transparente no meio). Abertura: clipe Pexels + Terra à noite (NASA)."""
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
t(450, "Vai ter APAGÃO", 92, "#FFC94A"); t(560, "MUNDIAL dia 17?", 92, "white")
t(1440, "O que a física diz sobre", 68, "white"); t(1530, "a tempestade solar", 68, "white")
pilula(1720, "TOQUE NO LINK", 66, "#FFC94A", "black", 640)
d.text((540, 1868), "Imagens: Pexels e NASA", font=ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 26), fill="white", anchor="mm", stroke_width=3, stroke_fill="black")
im.save(D.parent / "out" / "story_overlay_apagao.png")
print("ok")
