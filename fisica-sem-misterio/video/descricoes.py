"""Título + descrição (com capítulos e créditos das fotos reais) dos vídeos longos e dos shorts com foto.
Uso: python descricoes.py ID [ID ...]  -> grava out/descricao_ID.txt (YouTube)
e, nos shorts, out/legenda_redes_ID.txt (Reels do Facebook/Instagram: pergunta para puxar comentário + convite para seguir)."""
import json, sys, html
from pathlib import Path
RAIZ = Path(__file__).resolve().parent
cred = json.loads((RAIZ / "public/fotos/creditos.json").read_text(encoding="utf-8"))
# regra de 28/10: todo longo novo termina divulgando o Espertinhos (link só na descrição dos LONGOS)
PLAY_ESPERTINHOS = "https://play.google.com/store/apps/details?id=com.espertinhos.espertinhos"
# longos que saíram sem o final do Espertinhos (o Jansey decide vídeo a vídeo): a descrição também fica sem o link
SEM_ESPERTINHOS = {"Veneza"}
# filmagens reais de domínio público usadas além do Pexels/Pixabay
VIDEOS_EXTRA = {
    "Titanic": ["Filmagem real de 1911-1912: \"Titanic Disaster - Genuine Footage (1911-1912)\" (domínio público), via Wikimedia Commons.",
                "Icebergs na Groenlândia: NASA (domínio público), via Wikimedia Commons."],
}

def creditos(fotos):
    linhas = []
    for n in fotos:
        c = cred[n]
        autor = html.unescape(c["autor"]).replace("\n", " ").replace("Unknown authorUnknown author", "").strip() or "autor desconhecido"
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
        cenas = [c for cap in r["capitulos"] for c in cap["cenas"]]
        fotos = list(dict.fromkeys(c["foto"] for c in cenas if "foto" in c and not c.get("ia")))
        ia = ["", "Cenas com o selo \"ILUSTRAÇÃO COM IA\" ou \"RECRIAÇÃO COM IA\" foram feitas com inteligência artificial (Google Flow) para explicar o que não foi filmado."] if any(c.get("ia") for c in cenas) else []
        txt = [r["descricao"], "", "Capítulos:", *caps, "",
               "Imagens: vídeos do Pexels e do Pixabay (licença livre).", *VIDEOS_EXTRA.get(id_, []), "Fotos reais:", *creditos(fotos), *ia, "",
               *([] if id_ in SEM_ESPERTINHOS else ["📱 Tem criança em casa? Baixe grátis o Espertinhos, jogos educativos para crianças de 2 a 8 anos: " + PLAY_ESPERTINHOS, ""]),
               "Inscreva-se no Física Sem Mistério para mais curiosidades da física!", "⚡ Gostou? Aperte o botão HYPE embaixo do vídeo: ele ajuda canais pequenos a aparecer para mais gente.", "#fisica #ciencia #curiosidades #documentario"]
    else:
        fotos = [c["foto"] for c in r["cenas"] if "foto" in c and not c.get("ia")]
        txt = [r["legenda"] + " Segue o canal para mais curiosidades! ⚡ Gostou? Aperte o HYPE: ajuda canais pequenos a aparecer."]
        if fotos:
            txt += ["", "Fotos reais:", *creditos(fotos)]
        if any(c.get("ia") for c in r["cenas"]):
            txt += ["", "Cenas com o selo \"ILUSTRAÇÃO COM IA\" foram feitas com inteligência artificial (Google Flow)."]
        corpo, _, tags = r["legenda"].partition(" #")
        pergunta = r.get("pergunta") or "Você já sabia disso? Conta aqui nos comentários 👇"
        redes = [r["titulo"], "", corpo.strip(), "", "💬 " + pergunta,
                 "👉 Siga @fisicasemmisteriobr: 1 curiosidade de física por dia!", "", ("#" + tags).strip() + " "]
        (RAIZ / f"out/legenda_redes_{id_}.txt").write_text(chr(10).join(redes), encoding="utf-8")
    (RAIZ / f"out/descricao_{id_}.txt").write_text(r["titulo"] + "\n\n" + "\n".join(txt), encoding="utf-8")
    print("==", id_); print(r["titulo"]); print("\n".join(txt)); print()
