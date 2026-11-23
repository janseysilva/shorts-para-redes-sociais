"""Capas do longo TerrasRaras (23/11), todas com foto real (USDA, Casa Branca: domínio público; Tmy350: CC BY-SA 4.0)."""
from pathlib import Path
from PIL import Image, ImageDraw
import _capa_base as c
D = Path(__file__).resolve().parent; FOT = D.parent / "public/fotos"
def faz(l, arq, linhas, et, w):
    im = c.base(FOT / arq)
    if l == "A":  # desloca a foto p/ a direita: o texto nao tapa os rostos
        from PIL import ImageOps
        n = im.copy(); n.paste(ImageOps.mirror(im.crop((0, 0, 330, 720))), (0, 0)); n.paste(im.crop((0, 0, 950, 720)), (330, 0)); im = n
    d = ImageDraw.Draw(im); y = 60
    for s, tam, cor in linhas:
        c.texto(d, (45, y), s, tam, cor, 12); y += tam + 20
    c.etiqueta(d, 52, 560, w, et); im.save(D / f"capa_TerrasRaras_{l}.jpg", quality=92)
B, A = "#FFFFFF", "#FFC94A"
faz("A", "Tr_trump_xi.jpg", [("O TESOURO", 120, B), ("DO BRASIL", 130, A), ("que eles querem", 70, B)], "terras raras", 440)
faz("B", "Tr_oxidos.jpg", [("TERRAS", 140, B), ("RARAS", 140, A), ("o que são?", 100, B)], "e por que todos querem", 660)
faz("C", "Tr_mountainpass.jpg", [("POR QUE O", 110, B), ("MUNDO QUER", 120, A), ("ISSO?", 130, A)], "terras raras", 440)
