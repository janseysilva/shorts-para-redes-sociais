"""Gera as falas de um esquete (uma voz por personagem) e o tempo de cada uma.

Uso: python falas.py ep1
Saída: public/ep1/falas.wav e public/ep1/tempos.json ({falas:[{quem,texto,ini,fim}], total})
"""
import asyncio, json, os, subprocess, sys
from pathlib import Path

import edge_tts
import numpy as np
import soundfile as sf

RAIZ = Path(__file__).resolve().parent
FF = Path(os.environ["LOCALAPPDATA"]) / "ffmpeg/ffmpeg-8.1.2-essentials_build/bin/ffmpeg.exe"
SR = 44100

# voz, velocidade, tom (voz aguda = personagem de desenho)
VOZES = {
    "mae": ("pt-BR-FranciscaNeural", "+5%", "+0Hz"),
    "leo": ("pt-BR-AntonioNeural", "+12%", "+70Hz"),
    "pipoca": ("pt-BR-ThalitaMultilingualNeural", "+25%", "+90Hz"),
}

EPISODIOS = {
    # (quem, texto, pausa depois em segundos); quem="pausa" = só silêncio (cena sem fala)
    "ep1": [
        ("pausa", "", 0.8),
        ("mae", "Léo! Hora de acordar! Você vai se atrasar pra escola!", 0.5),
        ("leo", "Só mais cinco minutinhos...", 0.3),
        ("pausa", "", 4.2),
        ("leo", "Pronto! Cinco minutinhos! ... Ué? Já é de noite?!", 0.4),
        ("mae", "Léo! Hora de dormir!", 0.3),
        ("leo", "Mas eu acabei de acordar!", 0.2),
        ("pipoca", "Rá rá rá rá!", 3.0),
    ],
}


async def falar(texto, voz, vel, tom, destino):
    await edge_tts.Communicate(texto, voz, rate=vel, pitch=tom).save(str(destino))


def main(ep):
    pasta = RAIZ / "public" / ep
    pasta.mkdir(parents=True, exist_ok=True)
    trilha, falas, t = [], [], 0.0
    for i, (quem, texto, pausa) in enumerate(EPISODIOS[ep]):
        if quem != "pausa":
            mp3 = pasta / f"f{i}.mp3"
            asyncio.run(falar(texto, *VOZES[quem], mp3))
            wav = pasta / f"f{i}.wav"
            subprocess.run([str(FF), "-v", "error", "-y", "-i", str(mp3), "-ar", str(SR), "-ac", "1", str(wav)], check=True)
            a, _ = sf.read(wav)
            falas.append({"quem": quem, "texto": texto, "ini": round(t, 2), "fim": round(t + len(a) / SR, 2)})
            trilha.append(a); t += len(a) / SR
            mp3.unlink(); wav.unlink()
        trilha.append(np.zeros(int(pausa * SR))); t += pausa
    audio = np.concatenate(trilha)
    sf.write(pasta / "falas.wav", audio / max(1e-6, np.abs(audio).max()) * 0.9, SR)
    (pasta / "tempos.json").write_text(json.dumps({"falas": falas, "total": round(t, 2)}, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"{len(falas)} falas, {t:.1f}s")
    for f in falas:
        print(f"  {f['ini']:5.1f}-{f['fim']:5.1f} {f['quem']}: {f['texto']}")


main(sys.argv[1])
