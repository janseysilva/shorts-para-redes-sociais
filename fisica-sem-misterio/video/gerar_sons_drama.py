"""Gera os sons de drama do canal (11/11): estrondo grave, batida de coração, subida de tensão e 'braam'.
Feitos do zero com matemática (sem direitos autorais). Saída em public/sons/*.wav (44,1 kHz, mono)."""
import wave
from pathlib import Path

import numpy as np

SR = 44100
PASTA = Path(__file__).parent / "public" / "sons"
rng = np.random.default_rng(7)


def salvar(nome, x):
    x = x / (np.max(np.abs(x)) + 1e-9) * 0.9
    PASTA.mkdir(parents=True, exist_ok=True)
    with wave.open(str(PASTA / f"{nome}.wav"), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())
    print("ok", nome, f"{len(x) / SR:.1f}s")


def t(seg):
    return np.arange(int(SR * seg)) / SR


def passa_baixa(x, corte):
    a = np.exp(-2 * np.pi * corte / SR)
    y = np.zeros_like(x); acc = 0.0
    for i, v in enumerate(x):
        acc = (1 - a) * v + a * acc; y[i] = acc
    return y


# 1) estrondo grave (impacto de cinema): queda de 90 -> 35 Hz + ruído grave no ataque
tt = t(2.5)
freq = 35 + 55 * np.exp(-tt * 6)
fase = 2 * np.pi * np.cumsum(freq) / SR
corpo = np.sin(fase) * np.exp(-tt * 1.6)
ataque = passa_baixa(rng.standard_normal(len(tt)), 400) * np.exp(-tt * 18) * 3
salvar("impacto", corpo + ataque)

# 2) batida de coração (tum-tum), 2 batidas
def batida(seg_ini, total, forte=1.0):
    x = np.zeros(int(SR * total)); tb = t(0.25)
    b = np.sin(2 * np.pi * (45 + 30 * np.exp(-tb * 30)) * tb) * np.exp(-tb * 22) * forte
    i = int(seg_ini * SR); x[i:i + len(b)] += b; return x
coracao = batida(0, 1.6) + batida(0.28, 1.6, 0.7) + batida(0.8, 1.6) + batida(1.08, 1.6, 0.7)
salvar("coracao", coracao)

# 3) subida de tensão (riser): ruído filtrado que sobe e um tom que sobe, 3 s, termina de repente
tt = t(3.0)
f_sobe = 120 * (8 ** (tt / 3.0))
tom = np.sin(2 * np.pi * np.cumsum(f_sobe) / SR) * (tt / 3.0) ** 2
chiado = rng.standard_normal(len(tt)) * (tt / 3.0) ** 3 * 0.6
salvar("subida", tom + passa_baixa(chiado, 3000))

# 4) braam (trombone grave de trailer): acorde grave com harmônicos e ataque forte
tt = t(3.0)
env = np.minimum(1, tt * 20) * np.exp(-tt * 0.9)
braam = sum(np.sign(np.sin(2 * np.pi * f * tt)) * a for f, a in [(55, 1), (55 * 1.5, 0.5), (110, 0.4)])
salvar("braam", passa_baixa(braam * env, 900))
