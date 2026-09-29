"""Cria música de fundo e efeitos sonoros originais (sintetizados), sem direito autoral.

Uso: python sons.py 22   (duração da música em segundos)
Saída em public/: musica.wav, clique.wav, pop.wav, whoosh.wav, ding.wav
"""
import sys
from pathlib import Path
import numpy as np
import soundfile as sf

SR = 44100
PUB = Path(__file__).resolve().parent / "public"
rng = np.random.default_rng(3)


def env(n, a=0.005, r=0.2):
    t = np.arange(n) / SR
    return np.minimum(1, t / a) * np.exp(-t / r)


def nota(freq, dur, vol=0.3, r=0.25, forma="tri"):
    n = int(dur * SR); t = np.arange(n) / SR
    if forma == "tri":
        w = 2 * np.abs(2 * ((t * freq) % 1) - 1) - 1
    else:
        w = np.sin(2 * np.pi * freq * t)
    return w * env(n, r=r) * vol


def mix(dest, som, ini):
    i = int(ini * SR); j = min(len(dest), i + len(som))
    dest[i:j] += som[: j - i]


def hz(m):
    return 440 * 2 ** ((m - 69) / 12)


def musica(total):
    bpm = 104; b = 60 / bpm
    out = np.zeros(int(total * SR) + SR)
    # progressão alegre: C  G  Am  F
    acordes = [[60, 64, 67], [55, 59, 62], [57, 60, 64], [53, 57, 60]]
    melod = [72, 76, 79, 76, 74, 71, 74, 79, 72, 76, 81, 79, 77, 76, 74, 72]
    t, k = 0.0, 0
    while t < total:
        ac = acordes[(k // 4) % 4]
        # baixo e pad
        if k % 4 == 0:
            mix(out, nota(hz(ac[0] - 12), 4 * b, 0.22, r=1.2, forma="sin"), t)
            for m in ac:
                mix(out, nota(hz(m), 4 * b, 0.05, r=1.5), t)
        # bumbo nos tempos 1 e 3, chimbal em todos, palma no 2 e 4
        if k % 2 == 0:
            n = int(0.25 * SR); tt = np.arange(n) / SR
            mix(out, np.sin(2 * np.pi * (50 + 90 * np.exp(-tt * 30)) * tt) * env(n, r=0.12) * 0.5, t)
        else:
            mix(out, rng.normal(0, 1, int(0.15 * SR)) * env(int(0.15 * SR), r=0.05) * 0.10, t)
        mix(out, rng.normal(0, 1, int(0.05 * SR)) * env(int(0.05 * SR), r=0.012) * 0.05, t + b / 2)
        # melodia de "caixinha" em colcheias
        mix(out, nota(hz(melod[(k * 2) % 16]), b / 2, 0.07, r=0.18), t)
        mix(out, nota(hz(melod[(k * 2 + 1) % 16]), b / 2, 0.06, r=0.18), t + b / 2)
        t += b; k += 1
    out = out[: int(total * SR)]
    fade = int(1.2 * SR); out[-fade:] *= np.linspace(1, 0, fade)
    return out / np.abs(out).max() * 0.8


def efeitos():
    n = int(0.06 * SR)
    clique = rng.normal(0, 1, n) * env(n, a=0.0005, r=0.01) * 0.6
    tt = np.arange(int(0.18 * SR)) / SR
    pop = np.sin(2 * np.pi * (300 + 900 * (1 - np.exp(-tt * 25))) * tt) * env(len(tt), a=0.002, r=0.05) * 0.7
    n = int(0.45 * SR); ruido = rng.normal(0, 1, n)
    k = np.linspace(2, 60, n).astype(int)  # filtro passa-baixa que abre e fecha
    whoosh = np.array([ruido[max(0, i - k[i]):i + 1].mean() for i in range(n)])
    whoosh *= np.sin(np.linspace(0, np.pi, n)) * 3.0
    ding = nota(hz(84), 1.2, 0.4, r=0.5, forma="sin") + nota(hz(91), 1.2, 0.25, r=0.5, forma="sin")
    return {"clique": clique, "pop": pop, "whoosh": whoosh, "ding": ding}


if __name__ == "__main__":
    PUB.mkdir(exist_ok=True)
    sf.write(PUB / "musica.wav", musica(float(sys.argv[1])), SR)
    for nome, s in efeitos().items():
        sf.write(PUB / f"{nome}.wav", np.clip(s, -1, 1), SR)
    print("ok")
