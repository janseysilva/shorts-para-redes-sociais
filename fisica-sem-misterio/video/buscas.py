"""Lista {ID_cena: termo de busca} de todas as cenas com vídeo real (para achar os clipes no Pexels)."""
import glob, json
d = {}
for p in glob.glob("roteiros/*.json"):
    j = json.load(open(p, encoding="utf-8"))
    for i, c in enumerate(j.get("cenas", [])):
        if "busca" in c:
            d[f"{j['id']}_{i}"] = c["busca"]
print(json.dumps(d))
