"""Moldura do story do longo Halifax (1080x1920, transparente no meio onde entra o vídeo)."""
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
t(450, "Um NAVIO destruiu", 92, "white"); t(560, "uma CIDADE", 104, "#FFC94A")
t(1440, "Halifax, 1917:", 72, "white"); t(1530, "a física da explosão", 72, "white")
pilula(1720, "TOQUE NO LINK", 66, "#FFC94A", "black", 640)
im.save(D.parent / "out" / "story_overlay_halifax.png")
print("ok")
