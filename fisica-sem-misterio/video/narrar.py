"""Gera a narração (voz Antonio, Microsoft Edge TTS) + o tempo de cada palavra, para a legenda palavra por palavra.

Uso: python narrar.py roteiros/fixar_conversa.json
Saída em public/: narracao.mp3 e tempos.json ({palavras:[{t,ini,fim}], cenas:[ini...], total})
"""
import asyncio, json, sys
from pathlib import Path
import edge_tts

VOZ = "pt-BR-AntonioNeural"
VELOCIDADE = "+8%"   # shorts pedem ritmo um pouco mais rápido

RAIZ = Path(__file__).resolve().parent


async def main(roteiro):
    dados = json.loads(Path(roteiro).read_text(encoding="utf-8"))
    frases = dados["frases"]
    texto = " ".join(frases)
    com = edge_tts.Communicate(texto, VOZ, rate=VELOCIDADE, boundary="WordBoundary")
    audio, palavras = bytearray(), []
    async for ch in com.stream():
        if ch["type"] == "audio":
            audio += ch["data"]
        elif ch["type"] == "WordBoundary":
            ini = ch["offset"] / 1e7
            palavras.append({"t": ch["text"], "ini": round(ini, 3), "fim": round(ini + ch["duration"] / 1e7, 3)})
    pub = RAIZ / "public" / dados["id"]; pub.mkdir(parents=True, exist_ok=True)
    (pub / "narracao.mp3").write_bytes(audio)
    # início de cada frase = início da primeira palavra dela
    cenas, i = [], 0
    for f in frases:
        cenas.append(palavras[i]["ini"] if i < len(palavras) else palavras[-1]["fim"])
        i += len(f.split())
    total = palavras[-1]["fim"] + 1.2
    (pub / "tempos.json").write_text(json.dumps({"palavras": palavras, "cenas": cenas, "total": round(total, 2)},
                                                ensure_ascii=False), encoding="utf-8")
    print(f"{len(palavras)} palavras, {total:.1f}s, cenas={cenas}")


asyncio.run(main(sys.argv[1]))
