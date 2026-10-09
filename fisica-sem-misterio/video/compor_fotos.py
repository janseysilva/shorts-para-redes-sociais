"""Prepara as fotos reais para o vídeo: a foto inteira (sem cortar) sobre um fundo desfocado dela mesma.
Fotos já no formato da tela ocupam a tela toda. Feito aqui (Pillow) para o Remotion não ter que desfocar nada.

Saída: public/fotos_longo/NOME.jpg (1920x1080) e public/fotos_short/NOME.jpg (1080x1920).
Uso: python compor_fotos.py
"""
import json
from pathlib import Path
from PIL import Image, ImageFilter, ImageEnhance

RAIZ = Path(__file__).resolve().parent
FOTOS = RAIZ / "public" / "fotos"


def compor(arq, W, H, saida):
    im = Image.open(arq).convert("RGB")
    if H > W:  # short: foto na altura da tela; o vídeo passeia por ela da esquerda para a direita
        esc = max(H / im.height, W / im.width)
        im.resize((round(im.width * esc), round(im.height * esc)), Image.LANCZOS).save(saida, quality=92)
        return
    r_img, r_tela = im.width / im.height, W / H
    if abs(r_img - r_tela) / r_tela < 0.12:  # quase o mesmo formato: preenche a tela
        esc = max(W / im.width, H / im.height)
        im2 = im.resize((round(im.width * esc), round(im.height * esc)), Image.LANCZOS)
        x, y = (im2.width - W) // 2, (im2.height - H) // 2
        im2.crop((x, y, x + W, y + H)).save(saida, quality=92)
        return
    esc = max(W / im.width, H / im.height)
    fundo = im.resize((round(im.width * esc), round(im.height * esc)))
    x, y = (fundo.width - W) // 2, (fundo.height - H) // 2
    fundo = fundo.crop((x, y, x + W, y + H)).filter(ImageFilter.GaussianBlur(45))
    fundo = ImageEnhance.Brightness(fundo).enhance(0.45)
    m = 0.92
    esc = min(W * m / im.width, H * m / im.height)
    fr = im.resize((round(im.width * esc), round(im.height * esc)), Image.LANCZOS)
    fundo.paste(fr, ((W - fr.width) // 2, (H - fr.height) // 2))
    fundo.save(saida, quality=92)


usadas_longo, usadas_short = set(), set()
for r in (RAIZ / "roteiros").glob("*.json"):
    d = json.loads(r.read_text(encoding="utf-8"))
    if d.get("longo"):
        usadas_longo |= {c["foto"] for cap in d["capitulos"] for c in cap["cenas"] if "foto" in c}
    else:
        usadas_short |= {c["foto"] for c in d.get("cenas", []) if "foto" in c}
for pasta, W, H, nomes in (("fotos_longo", 1920, 1080, usadas_longo), ("fotos_short", 1080, 1920, usadas_short)):
    dest = RAIZ / "public" / pasta; dest.mkdir(exist_ok=True)
    for n in sorted(nomes):
        compor(FOTOS / f"{n}.jpg", W, H, dest / f"{n}.jpg")
    print(pasta, len(nomes))
