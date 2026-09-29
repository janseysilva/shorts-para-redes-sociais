"""Gera a foto de perfil e o banner do canal "Office Sem Mistério".
Uso: python scripts/canal_imagens.py  (salva em canal/perfil.png e canal/banner.png)
Ícones próprios (planilha / página / slide), sem usar logotipos da Microsoft.
"""
import os
from PIL import Image, ImageDraw, ImageFont

BASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "canal")
FONTS = r"C:\Windows\Fonts"

FUNDO = (16, 18, 22)
GRADE = (30, 44, 38)
VERDE = (16, 124, 65)
AZUL = (43, 108, 217)
LARANJA = (224, 96, 40)
AMARELO = (255, 212, 64)
VERDE_TXT = (60, 220, 130)
BRANCO = (255, 255, 255)
CINZA = (205, 210, 215)
CINZA_LINHA = (170, 180, 195)


def fonte(nome, tam):
    return ImageFont.truetype(os.path.join(FONTS, nome), tam)


def ic_planilha(d, x, y, s):
    d.rounded_rectangle([x, y, x + s, y + s], radius=s * 0.12, fill=VERDE)
    m, g = s * 0.1, s * 0.04
    c = (s - 2 * m - 2 * g) / 3
    for i in range(3):
        for j in range(3):
            cx, cy = x + m + j * (c + g), y + m + i * (c + g)
            cor = AMARELO if (i, j) == (1, 1) else BRANCO
            d.rounded_rectangle([cx, cy, cx + c, cy + c], radius=c * 0.12, fill=cor)
    f = fonte("segoeuiz.ttf", int(c * 0.62))
    d.text((x + s / 2, y + s / 2), "fx", font=f, fill=(20, 60, 35), anchor="mm")


def ic_pagina(d, x, y, s):
    d.rounded_rectangle([x, y, x + s, y + s], radius=s * 0.12, fill=AZUL)
    px0, py0, px1, py1 = x + s * 0.2, y + s * 0.12, x + s * 0.8, y + s * 0.88
    d.rounded_rectangle([px0, py0, px1, py1], radius=s * 0.04, fill=BRANCO)
    lh = s * 0.045
    for k, larg in enumerate([0.9, 0.75, 0.9, 0.6, 0.9, 0.7]):
        ly = py0 + s * 0.1 + k * s * 0.1
        d.rounded_rectangle([px0 + s * 0.06, ly, px0 + s * 0.06 + (px1 - px0 - s * 0.12) * larg, ly + lh],
                            radius=lh / 2, fill=AZUL if k == 0 else CINZA_LINHA)


def ic_slide(d, x, y, s):
    d.rounded_rectangle([x, y, x + s, y + s], radius=s * 0.12, fill=LARANJA)
    sx0, sy0, sx1, sy1 = x + s * 0.12, y + s * 0.2, x + s * 0.88, y + s * 0.68
    d.rounded_rectangle([sx0, sy0, sx1, sy1], radius=s * 0.04, fill=BRANCO)
    # barrinhas de gráfico dentro do slide
    bw = s * 0.09
    for k, h in enumerate([0.14, 0.24, 0.34]):
        bx = sx0 + s * 0.12 + k * (bw + s * 0.06)
        d.rectangle([bx, sy1 - s * 0.06 - s * h, bx + bw, sy1 - s * 0.06], fill=LARANJA if k == 2 else AMARELO)
    # pezinho do projetor/tela
    d.rectangle([x + s * 0.47, sy1, x + s * 0.53, y + s * 0.8], fill=BRANCO)
    d.rounded_rectangle([x + s * 0.34, y + s * 0.78, x + s * 0.66, y + s * 0.84], radius=s * 0.02, fill=BRANCO)


ICONES = [ic_planilha, ic_pagina, ic_slide]


def perfil():
    W = 800
    img = Image.new("RGB", (W, W), FUNDO)
    d = ImageDraw.Draw(img)
    s, gap = 180, 24
    total = 3 * s + 2 * gap
    x0 = (W - total) / 2
    y0 = (W - s) / 2 - 40
    for k, fn in enumerate(ICONES):
        fn(d, x0 + k * (s + gap), y0, s)
    f = fonte("segoeuib.ttf", 64)
    d.text((W / 2, y0 + s + 80), "Sem Mistério", font=f, fill=VERDE_TXT, anchor="mm")
    img.save(os.path.join(BASE, "perfil.png"))


def banner():
    W, H = 2560, 1440
    img = Image.new("RGB", (W, H), FUNDO)
    d = ImageDraw.Draw(img)
    for gx in range(0, W, 120):
        d.line([gx, 0, gx, H], fill=GRADE, width=2)
    for gy in range(0, H, 70):
        d.line([0, gy, W, gy], fill=GRADE, width=2)
    # tudo dentro da área segura do YouTube (1546x423 no centro)
    s, gap = 150, 22
    bloco_icones = 3 * s + 2 * gap
    f_tit = fonte("segoeuib.ttf", 118)
    f_sub = fonte("segoeui.ttf", 42)
    t1, t2 = "Office ", "Sem Mistério"
    larg_tit = d.textlength(t1, font=f_tit) + d.textlength(t2, font=f_tit)
    total = bloco_icones + 70 + larg_tit
    x0 = (W - total) / 2
    cy = H / 2
    for k, fn in enumerate(ICONES):
        fn(d, x0 + k * (s + gap), cy - s / 2, s)
    tx = x0 + bloco_icones + 70
    d.text((tx, cy - 10), t1, font=f_tit, fill=BRANCO, anchor="ls")
    d.text((tx + d.textlength(t1, font=f_tit), cy - 10), t2, font=f_tit, fill=VERDE_TXT, anchor="ls")
    d.text((tx, cy + 65), "Dicas rápidas de Excel, Word e PowerPoint para o dia a dia", font=f_sub, fill=CINZA, anchor="ls")
    img.save(os.path.join(BASE, "banner.png"))


if __name__ == "__main__":
    perfil()
    banner()
    print("ok")
