"""Imagens para Facebook e Instagram (mesmo visual do YouTube). Saída na pasta Desktop\trabalhos jansey\redes-sociais-fisica.
Uso: python redes_sociais.py"""
import os
from PIL import ImageDraw
from canal_imagens import fundo, atomo, fonte, BRANCO, OURO

SAIDA = os.path.join(os.path.expanduser("~"), "Desktop", "trabalhos jansey", "redes-sociais-fisica")
os.makedirs(SAIDA, exist_ok=True)

# foto de perfil (Facebook e Instagram): 1080x1080, átomo centralizado (o Instagram recorta em círculo)
W = 1080
atomo(fundo(W, W), W / 2, W / 2, 380).save(os.path.join(SAIDA, "perfil_1080.png"))

# capa da Página do Facebook: 1640x624; logo e texto no centro (o celular corta as laterais)
W, H = 1640, 624
img = fundo(W, H, seed=7)
ft, fs = fonte("segoeuib.ttf", 92), fonte("segoeui.ttf", 34)
d = ImageDraw.Draw(img)
t1, t2 = "Física ", "Sem Mistério"
lt = d.textlength(t1, font=ft) + d.textlength(t2, font=ft)
ic = 105
x0 = (W - (ic * 2 + 40 + lt)) / 2
cy = H * 0.36  # mais para cima: no Facebook a foto de perfil fica no centro, embaixo da capa
img = atomo(img, x0 + ic, cy - 15, ic)
d = ImageDraw.Draw(img)
tx = x0 + ic * 2 + 40
d.text((tx, cy + 10), t1, font=ft, fill=BRANCO, anchor="ls")
d.text((tx + d.textlength(t1, font=ft), cy + 10), t2, font=ft, fill=OURO, anchor="ls")
d.text((tx + 4, cy + 60), "Curiosidades da física explicadas sem complicação", font=fs, fill=(205, 225, 245), anchor="ls")
img.save(os.path.join(SAIDA, "capa_facebook_1640x624.png"))
print("ok", SAIDA)
