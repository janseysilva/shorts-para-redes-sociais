"""Foto de perfil e banner do canal "Truques de Celular". Uso: python canal_imagens.py"""
import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont

AQUI = os.path.dirname(os.path.abspath(__file__))
F = r"C:\Windows\Fonts"
VERDE, AMARELO, ROXO = (37, 211, 102), (255, 212, 59), (124, 77, 255)
BRANCO = (255, 255, 255)


def fonte(nome, tam):
    return ImageFont.truetype(os.path.join(F, nome), tam)


def fundo(w, h):
    """Degradê verde-escuro → roxo com bolhas desfocadas (mesmo clima dos vídeos)."""
    import numpy as np
    xs = np.linspace(0, 1, w)[None, :]
    ys = np.linspace(0, 1, h)[:, None]
    k = xs * 0.6 + ys * 0.4
    base = np.stack([11 + 16 * k, 61 - 43 * k, 51 - 3 * k], axis=-1)
    bolhas = Image.new("RGB", (w, h), (0, 0, 0))
    d = ImageDraw.Draw(bolhas)
    r = int(min(w, h) * 0.45)
    d.ellipse([w * 0.15 - r, h * 0.3 - r, w * 0.15 + r, h * 0.3 + r], fill=(20, 110, 60))
    d.ellipse([w * 0.85 - r, h * 0.75 - r, w * 0.85 + r, h * 0.75 + r], fill=(70, 40, 140))
    bolhas = np.asarray(bolhas.filter(ImageFilter.GaussianBlur(r * 0.5)), dtype=float)
    return Image.fromarray(np.clip(base + bolhas, 0, 255).astype("uint8"))

def celular(d, cx, cy, h, com_estrela=True):
    """Desenha um celular estilizado com um 'brilho' de truque ao lado."""
    w = h * 0.52
    x0, y0, x1, y1 = cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2
    d.rounded_rectangle([x0, y0, x1, y1], radius=h * 0.1, fill=(10, 10, 10), outline=(60, 60, 60), width=max(2, int(h * 0.012)))
    m = h * 0.045
    d.rounded_rectangle([x0 + m, y0 + m, x1 - m, y1 - m], radius=h * 0.07, fill=VERDE)
    # "balões" de conversa na tela
    bx0, bw = x0 + m * 2.2, (w - m * 4.4)
    for i, (larg, cor) in enumerate([(0.8, BRANCO), (0.6, (220, 248, 198)), (0.85, BRANCO)]):
        yy = y0 + h * 0.22 + i * h * 0.19
        xa = bx0 if i != 1 else bx0 + bw * (1 - larg)
        d.rounded_rectangle([xa, yy, xa + bw * larg, yy + h * 0.12], radius=h * 0.035, fill=cor)
    if com_estrela:
        estrela(d, x1 + h * 0.02, y0 + h * 0.05, h * 0.2, AMARELO)
        estrela(d, x0 - h * 0.06, y1 - h * 0.2, h * 0.11, BRANCO)


def estrela(d, cx, cy, r, cor):
    """Brilho de 4 pontas (símbolo de 'truque')."""
    k = r * 0.28
    d.polygon([(cx, cy - r), (cx + k, cy - k), (cx + r, cy), (cx + k, cy + k),
               (cx, cy + r), (cx - k, cy + k), (cx - r, cy), (cx - k, cy - k)], fill=cor)


def perfil():
    W = 800
    img = fundo(W, W)
    d = ImageDraw.Draw(img)
    celular(d, W / 2 - 10, W / 2 + 10, 470)
    img.save(os.path.join(AQUI, "perfil.png"))


def banner():
    W, H = 2560, 1440
    img = fundo(W, H)
    d = ImageDraw.Draw(img)
    ft = fonte("segoeuib.ttf", 130)
    fs = fonte("segoeui.ttf", 46)
    t1, t2 = "Truques de ", "Celular"
    lt = d.textlength(t1, font=ft) + d.textlength(t2, font=ft)
    icone = 230
    total = icone * 0.6 + 70 + lt
    x0 = (W - total) / 2
    cy = H / 2
    celular(d, x0 + icone * 0.26, cy, icone)
    tx = x0 + icone * 0.6 + 70
    d.text((tx, cy - 5), t1, font=ft, fill=BRANCO, anchor="ls")
    d.text((tx + d.textlength(t1, font=ft), cy - 5), t2, font=ft, fill=VERDE, anchor="ls")
    d.text((tx + 4, cy + 70), "Dicas rápidas para usar melhor o seu celular", font=fs, fill=(215, 225, 220), anchor="ls")
    img.save(os.path.join(AQUI, "banner.png"))


if __name__ == "__main__":
    perfil()
    banner()
    print("ok")
