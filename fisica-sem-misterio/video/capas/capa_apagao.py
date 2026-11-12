"""Capas do longo ApagaoMundial (12/11) — 3 versões para o Teste A/B do YouTube, todas com foto real.
Fotos: Terra à noite (NASA, domínio público), nuvem do Sol vista pelo SOHO (NASA, domínio público) e aurora de maio de 2024
na Suécia (W.carter, CC BY-SA 4.0). Textos pensados na busca 'vai ter apagão dia 17 de novembro'."""
from pathlib import Path
from PIL import Image, ImageDraw
import _capa_base as c  # reaproveita base(), foto_direita(), texto() e etiqueta()

D = Path(__file__).resolve().parent; FOT = D.parent / "public/fotos"

# A: a Terra à noite
im = c.base(FOT / "Ap_terra_noite.jpg"); d = ImageDraw.Draw(im)
c.texto(d, (45, 60), "APAGÃO", 130, "#FFFFFF", 12); c.texto(d, (45, 200), "MUNDIAL", 130, "#FFC94A", 12)
c.texto(d, (45, 340), "DIA 17?", 130, "#FFC94A", 12)
c.etiqueta(d, 52, 540, 560, "o que a física diz")
im.save(D / "capa_ApagaoMundial_A.jpg", quality=92)

# B: o Sol arremessando a nuvem
im = c.foto_direita(FOT / "Ap_cme.jpg"); d = ImageDraw.Draw(im)
c.texto(d, (45, 60), "O SOL PODE", 110, "#FFFFFF", 12); c.texto(d, (45, 190), "APAGAR", 130, "#FFC94A", 12)
c.texto(d, (45, 330), "O MUNDO?", 130, "#FFC94A", 12)
c.etiqueta(d, 52, 540, 520, "tempestade solar")
im.save(D / "capa_ApagaoMundial_B.jpg", quality=92)

# C: a aurora da tempestade de 2024
im = c.base(FOT / "Ap_aurora2024.jpg"); d = ImageDraw.Draw(im)
c.texto(d, (45, 60), "VAI TER", 120, "#FFFFFF", 12); c.texto(d, (45, 190), "APAGÃO", 130, "#FFC94A", 12)
c.texto(d, (45, 330), "DIA 17?", 130, "#FFC94A", 12)
c.etiqueta(d, 52, 540, 560, "verdade ou boato?")
im.save(D / "capa_ApagaoMundial_C.jpg", quality=92)
print("ok")
