"""Foto de perfil e banner do canal "Física Sem Mistério" (mesmo clima espacial dos vídeos). Uso: python canal_imagens.py"""
import math
import os
import random

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

AQUI = os.path.dirname(os.path.abspath(__file__))
F = r"C:\Windows\Fonts"
OURO, CIANO, BRANCO = (255, 201, 74), (92, 225, 255), (255, 255, 255)


def fonte(nome, tam):
    return ImageFont.truetype(os.path.join(F, nome), tam)


def fundo(w, h, seed=3):
    """Espaço: azul-noite com nebulosas roxa/azul desfocadas e estrelas."""
    ys = np.linspace(0, 1, h)[:, None]
    xs = np.linspace(0, 1, w)[None, :]
    d = np.sqrt((xs - 0.5) ** 2 + (ys - 0.45) ** 2)
    base = np.stack([13 - 10 * d, 22 - 16 * d, 51 - 40 * d], axis=-1)
    neb = Image.new("RGB", (w, h), (0, 0, 0))
    dn = ImageDraw.Draw(neb)
    r = int(min(w, h) * 0.42)
    for cx, cy, cor in ((0.2, 0.3, (90, 50, 200)), (0.82, 0.72, (0, 120, 190)), (0.7, 0.15, (160, 40, 110))):
        dn.ellipse([w * cx - r, h * cy - r, w * cx + r, h * cy + r], fill=cor)
    neb = np.asarray(neb.filter(ImageFilter.GaussianBlur(r * 0.55)), dtype=float) * 0.45
    img = Image.fromarray(np.clip(base + neb, 0, 255).astype("uint8"))
    ds = ImageDraw.Draw(img)
    rnd = random.Random(seed)
    for _ in range(int(w * h / 2500)):
        x, y, s = rnd.random() * w, rnd.random() * h, rnd.choice([1, 1, 1, 2, 2, 3])
        a = rnd.randint(120, 255)
        ds.ellipse([x - s, y - s, x + s, y + s], fill=(a, a, a))
    return img


def atomo(img, cx, cy, r):
    """Átomo com 3 órbitas brilhantes e núcleo dourado."""
    brilho = Image.new("RGB", img.size, (0, 0, 0))
    db = ImageDraw.Draw(brilho)
    camada = Image.new("RGBA", img.size, (0, 0, 0, 0))
    dc = ImageDraw.Draw(camada)
    for ang in (0, 60, 120):
        pts = []
        for k in range(181):
            t = k / 180 * 2 * math.pi
            x, y = r * math.cos(t), r * 0.36 * math.sin(t)
            a = math.radians(ang)
            pts.append((cx + x * math.cos(a) - y * math.sin(a), cy + x * math.sin(a) + y * math.cos(a)))
        db.line(pts, fill=CIANO, width=max(4, int(r * 0.07)))
        dc.line(pts, fill=CIANO + (255,), width=max(3, int(r * 0.035)))
        # elétron
        t = math.radians(40 + ang)
        x, y = r * math.cos(t), r * 0.36 * math.sin(t)
        a = math.radians(ang)
        ex, ey = cx + x * math.cos(a) - y * math.sin(a), cy + x * math.sin(a) + y * math.cos(a)
        er = r * 0.075
        dc.ellipse([ex - er, ey - er, ex + er, ey + er], fill=BRANCO + (255,))
    nr = r * 0.2
    db.ellipse([cx - nr * 1.6, cy - nr * 1.6, cx + nr * 1.6, cy + nr * 1.6], fill=OURO)
    dc.ellipse([cx - nr, cy - nr, cx + nr, cy + nr], fill=OURO + (255,))
    brilho = brilho.filter(ImageFilter.GaussianBlur(r * 0.08))
    out = Image.fromarray(np.clip(np.asarray(img, dtype=float) + np.asarray(brilho, dtype=float) * 0.8, 0, 255).astype("uint8"))
    out.paste(camada, (0, 0), camada)
    return out


def perfil():
    W = 800
    img = atomo(fundo(W, W), W / 2, W / 2, 300)
    img.save(os.path.join(AQUI, "perfil.png"))


def banner():
    W, H = 2560, 1440
    img = fundo(W, H, seed=7)
    ft = fonte("segoeuib.ttf", 140)
    fs = fonte("segoeui.ttf", 48)
    t1, t2 = "Física ", "Sem Mistério"
    d = ImageDraw.Draw(img)
    lt = d.textlength(t1, font=ft) + d.textlength(t2, font=ft)
    icone = 170
    total = icone * 2 + 60 + lt
    x0 = (W - total) / 2
    cy = H / 2
    img = atomo(img, x0 + icone, cy - 25, icone)
    d = ImageDraw.Draw(img)
    tx = x0 + icone * 2 + 60
    d.text((tx, cy + 15), t1, font=ft, fill=BRANCO, anchor="ls")
    d.text((tx + d.textlength(t1, font=ft), cy + 15), t2, font=ft, fill=OURO, anchor="ls")
    d.text((tx + 6, cy + 85), "Curiosidades da física explicadas em menos de 1 minuto", font=fs, fill=(205, 225, 245), anchor="ls")
    img.save(os.path.join(AQUI, "banner.png"))


if __name__ == "__main__":
    perfil()
    banner()
    print("ok")
