"""Título + descrição (com capítulos e créditos das fotos reais) dos vídeos longos e dos shorts com foto.
Uso: python descricoes.py ID [ID ...]  -> grava out/descricao_ID.txt"""
import json, sys, html
from pathlib import Path
RAIZ = Path(__file__).resolve().parent
cred = json.loads((RAIZ / "public/fotos/creditos.json").read_text(encoding="utf-8"))

def creditos(fotos):
    linhas = []
    for n in fotos:
        c = cred[n]
        autor = html.unescape(c["autor"]).replace("\n", " ").strip() or "autor desconhecido"
        linhas.append(f"• {c['arquivo'].rsplit('.', 1)[0]}: {autor} ({c['licenca']}), via Wikimedia Commons")
    return linhas

for id_ in sys.argv[1:]:
    r = json.loads((RAIZ / f"roteiros/{id_}.json").read_text(encoding="utf-8"))
    if r.get("longo"):
        t = json.loads((RAIZ / f"public/{id_}/tempos.json").read_text(encoding="utf-8"))
        caps = []
        for i, c in enumerate(t["capitulos"]):
            s = 0 if i == 0 else int(c["ini"])
            caps.append(f"{s // 60}:{s % 60:02d} {c['titulo']}")
        fotos = list(dict.fromkeys(c["foto"] for cap in r["capitulos"] for c in cap["cenas"] if "foto" in c))
        txt = [r["descricao"], "", "Capítulos:", *caps, "",
               "Imagens: vídeos do Pexels e do Pixabay (licença livre). Fotos reais:", *creditos(fotos), "",
               "Inscreva-se no Física Sem Mistério para mais curiosidades da física!", "#fisica #ciencia #curiosidades #documentario"]
    else:
        fotos = [c["foto"] for c in r["cenas"] if "foto" in c]
        txt = [r["legenda"] + " Segue o canal para mais curiosidades!"]
        if fotos:
            txt += ["", "Fotos reais:", *creditos(fotos)]
    (RAIZ / f"out/descricao_{id_}.txt").write_text(r["titulo"] + "\n\n" + "\n".join(txt), encoding="utf-8")
    print("==", id_); print(r["titulo"]); print("\n".join(txt)); print()
