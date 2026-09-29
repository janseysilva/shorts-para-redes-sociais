"""Música de fundo "espacial" e efeitos sonoros originais (sintetizados), sem direito autoral.

Uso: python sons.py 40   (duração da música em segundos)
Saída em public/: musica.wav, whoosh.wav, brilho.wav, grave.wav
"""
import sys
from pathlib import Path
import numpy as np
import soundfile as sf

SR = 44100
PUB = Path(__file__).resolve().parent / "public"
rng = np.random.default_rng(7)


def hz(m):
    return 440 * 2 ** ((m - 69) / 12)


def pad(freqs, dur, vol):
    """Acorde longo e suave (várias senoides levemente desafinadas, entrada e saída lentas)."""
    n = int(dur * SR); t = np.arange(n) / SR
    w = sum(np.sin(2 * np.pi * f * d * t + rng.uniform(0, 6)) for f in freqs for d in (0.997, 1.0, 1.003))
    e = np.minimum(1, t / (dur * 0.35)) * np.minimum(1, (dur - t) / (dur * 0.35))
    return w * e * vol / (len(freqs) * 3)


def mix(dest, som, ini):
    i = int(ini * SR); j = min(len(dest), i + len(som))
    dest[i:j] += som[: j - i]


def musica(total):
    out = np.zeros(int(total * SR) + SR)
    # progressão lenta e misteriosa: Am  F  C  G (cada acorde ~5 s, sobrepostos)
    acordes = [[57, 64, 69, 72], [53, 60, 65, 69], [48, 55, 64, 67], [55, 62, 67, 71]]
    t, k = 0.0, 0
    while t < total:
        ac = acordes[k % 4]
        mix(out, pad([hz(m) for m in ac], 6.5, 0.5), t)
        mix(out, pad([hz(ac[0] - 12)], 6.5, 0.35), t)  # baixo
        t += 5.0; k += 1
    # "brilhos" de estrela (sininhos agudos esparsos)
    for s in np.arange(1.5, total - 1, 2.3):
        f = hz(rng.choice([81, 84, 88, 91, 93]))
        n = int(1.6 * SR); tt = np.arange(n) / SR
        mix(out, np.sin(2 * np.pi * f * tt) * np.exp(-tt * 2.5) * 0.05, s)
    # pulso grave suave (batida lenta tipo documentário)
    for s in np.arange(0, total, 60 / 70 * 2):
        n = int(0.5 * SR); tt = np.arange(n) / SR
        mix(out, np.sin(2 * np.pi * (45 + 30 * np.exp(-tt * 12)) * tt) * np.exp(-tt * 6) * 0.25, s)
    out = out[: int(total * SR)]
    fade = int(1.5 * SR); out[-fade:] *= np.linspace(1, 0, fade)
    return out / np.abs(out).max() * 0.8


def efeitos():
    n = int(0.9 * SR); ruido = rng.normal(0, 1, n)
    k = np.linspace(3, 80, n).astype(int)
    cs = np.concatenate([[0], np.cumsum(ruido)])
    whoosh = np.array([(cs[i + 1] - cs[max(0, i - k[i])]) / (k[i] + 1) for i in range(n)])
    whoosh *= np.sin(np.linspace(0, np.pi, n)) * 3.0
    tt = np.arange(int(1.4 * SR)) / SR
    brilho = sum(np.sin(2 * np.pi * hz(m) * tt) * np.exp(-tt * 3) for m in (84, 88, 91, 96)) * 0.15
    tt = np.arange(int(1.2 * SR)) / SR
    grave = np.sin(2 * np.pi * (40 + 60 * np.exp(-tt * 5)) * tt) * np.exp(-tt * 3) * 0.8
    return {"whoosh": whoosh, "brilho": brilho, "grave": grave}


if __name__ == "__main__":
    PUB.mkdir(exist_ok=True)
    sf.write(PUB / "musica.wav", musica(float(sys.argv[1])), SR)
    for nome, s in efeitos().items():
        sf.write(PUB / f"{nome}.wav", np.clip(s, -1, 1), SR)
    print("ok")
