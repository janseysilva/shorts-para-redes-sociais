"""Capas do longo Halifax (03/11) — 3 versões para o Teste A/B do YouTube, todas com foto real.
Pedido do Jansey: quase ninguém conhece a explosão de Halifax, então a capa tem que EXPLICAR o que aconteceu."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageFilter
D = Path(__file__).resolve().parent; FOT = D.parent / "public/fotos"
F = "C:/Windows/Fonts/seguibl.ttf"
def texto(d, xy, s, tam, cor, contorno=10, anchor="la"):
    d.text(xy, s, font=ImageFont.truetype(F, tam), fill=cor, stroke_width=contorno, stroke_fill="black", anchor=anchor)
def base(arq, box=None):
    im = Image.open(arq).convert("RGB")
    if box: im = im.crop(box)
    r = 1280 / 720
    if im.width / im.height > r:
        w = int(im.height * r); x = (im.width - w) // 2; im = im.crop((x, 0, x + w, im.height))
    else:
        h = int(im.width / r); y = (im.height - h) // 2; im = im.crop((0, y, im.width, y + h))
    im = im.resize((1280, 720), Image.LANCZOS)
    im = ImageEnhance.Contrast(im).enhance(1.2)
    g = Image.linear_gradient("L").rotate(90).resize((1280, 720)).point(lambda v: int((255 - v) * 0.75))
    return Image.composite(Image.new("RGB", im.size, "black"), im, g)
def foto_direita(arq, box=None):
    """Foto em pé (a nuvem) à direita, fundo escuro desfocado da própria foto à esquerda."""
    im = Image.open(arq).convert("RGB")
    if box: im = im.crop(box)
    im = ImageEnhance.Contrast(im).enhance(1.25)
    fundo = im.resize((1280, int(1280 * im.height / im.width))).crop((0, 300, 1280, 1020)).filter(ImageFilter.GaussianBlur(30))
    fundo = ImageEnhance.Brightness(fundo).enhance(0.35)
    alto = im.resize((int(720 * im.width / im.height), 720), Image.LANCZOS)
    fundo.paste(alto, (1280 - alto.width, 0))
    g = Image.linear_gradient("L").rotate(90).resize((1280, 720)).point(lambda v: int((255 - v) * 0.6))
    return Image.composite(Image.new("RGB", fundo.size, "black"), fundo, g)
def etiqueta(d, x, y, w, s, cor="#E8401C"):
    d.rounded_rectangle((x, y, x + w, y + 80), 18, fill=cor); texto(d, (x + w // 2, y + 40), s, 46, "white", 0, "mm")
# A: a nuvem real da explosão + o que aconteceu
im = foto_direita(FOT / "Hx_nuvem.jpg"); d = ImageDraw.Draw(im)
texto(d, (45, 70), "UM NAVIO", 120, "#FFFFFF", 12); texto(d, (45, 205), "EXPLODIU E", 92, "#FFFFFF", 10)
texto(d, (45, 315), "DESTRUIU UMA", 92, "#FFC94A", 10); texto(d, (45, 425), "CIDADE", 120, "#FFC94A", 12)
etiqueta(d, 52, 585, 520, "Canadá, 1917")
im.save(D / "capa_Halifax_A.jpg", quality=92)
# B: a cidade destruída
im = base(FOT / "Hx_porto.jpg"); d = ImageDraw.Draw(im)
texto(d, (45, 70), "UM NAVIO FEZ ISSO", 104, "#FFFFFF", 12); texto(d, (45, 200), "COM UMA CIDADE", 104, "#FFC94A", 12)
etiqueta(d, 52, 360, 760, "3 mil toneladas de explosivos")
im.save(D / "capa_Halifax_B.jpg", quality=92)
# C: não foi bomba atômica
im = foto_direita(FOT / "Hx_nuvem.jpg"); d = ImageDraw.Draw(im)
texto(d, (45, 70), "NÃO FOI UMA", 104, "#FFFFFF", 12); texto(d, (45, 190), "BOMBA", 130, "#FFC94A", 12)
texto(d, (45, 330), "ATÔMICA", 130, "#FFC94A", 12)
etiqueta(d, 52, 530, 640, "foi um navio, em 1917")
im.save(D / "capa_Halifax_C.jpg", quality=92)
print("ok")
