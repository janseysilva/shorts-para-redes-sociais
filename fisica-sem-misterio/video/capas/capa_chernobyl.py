"""Capas do longo Chernobyl (09/11) — 3 versões para o Teste A/B do YouTube, todas com foto real.
Fotos reais: reator 4 destruído em 1986 (IAEA, CC BY-SA 2.0) e roda-gigante de Pripyat (CC BY-SA 4.0)."""
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
# A: o reator destruído + o botão
im = base(FOT / "Ch_iaea2.jpg"); d = ImageDraw.Draw(im)
texto(d, (45, 60), "O BOTÃO QUE", 104, "#FFFFFF", 12); texto(d, (45, 180), "EXPLODIU", 130, "#FFC94A", 12)
texto(d, (45, 320), "O REATOR", 130, "#FFC94A", 12)
etiqueta(d, 52, 520, 560, "Chernobyl, 1986")
im.save(D / "capa_Chernobyl_A.jpg", quality=92)
# B: a roda-gigante abandonada
im = base(FOT / "Ch_roda.jpg"); d = ImageDraw.Draw(im)
texto(d, (45, 60), "ABANDONADA", 120, "#FFFFFF", 12); texto(d, (45, 195), "HÁ 40 ANOS", 120, "#FFC94A", 12)
etiqueta(d, 52, 370, 720, "o que explodiu em Chernobyl?")
im.save(D / "capa_Chernobyl_B.jpg", quality=92)
# C: a pergunta direta
im = foto_direita(FOT / "Ch_iaea1.jpg"); d = ImageDraw.Draw(im)
texto(d, (45, 60), "POR QUE", 110, "#FFFFFF", 12); texto(d, (45, 185), "CHERNOBYL", 120, "#FFC94A", 12)
texto(d, (45, 320), "EXPLODIU?", 120, "#FFC94A", 12)
etiqueta(d, 52, 520, 600, "a física do acidente")
im.save(D / "capa_Chernobyl_C.jpg", quality=92)
print("ok")
