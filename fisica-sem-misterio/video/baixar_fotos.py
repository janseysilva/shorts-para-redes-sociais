"""Baixa fotos do Wikimedia (largura 1920) para public/fotos/NOME.jpg e grava os créditos em public/fotos/creditos.json.
Uso: python baixar_fotos.py lista.json   (lista = {"NOME": "Arquivo no Commons.jpg", ...})"""
import json, re, sys, urllib.request, urllib.parse
from pathlib import Path
UA={"User-Agent":"FisicaSemMisterio/1.0 (janseysilva@gmail.com)"}
DEST=Path(__file__).resolve().parent/"public"/"fotos"; DEST.mkdir(parents=True,exist_ok=True)
cred_arq=DEST/"creditos.json"; cred=json.loads(cred_arq.read_text(encoding="utf-8")) if cred_arq.exists() else {}
lista=json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
for nome,arq in lista.items():
    u="https://commons.wikimedia.org/w/api.php?"+urllib.parse.urlencode(dict(action="query",titles="File:"+arq,prop="imageinfo",iiprop="url|extmetadata",iiurlwidth=1920,format="json"))
    p=list(json.load(urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=60))["query"]["pages"].values())[0]
    ii=p["imageinfo"][0]; m=ii["extmetadata"]
    url=ii.get("thumburl") or ii["url"]
    (DEST/f"{nome}.jpg").write_bytes(urllib.request.urlopen(urllib.request.Request(url,headers=UA),timeout=120).read())
    cred[nome]={"arquivo":arq,"autor":re.sub("<[^>]+>","",m.get("Artist",{}).get("value","")).strip(),
                "licenca":m.get("LicenseShortName",{}).get("value",""),"pagina":ii["descriptionurl"]}
    print(nome, cred[nome]["licenca"], cred[nome]["autor"][:40])
cred_arq.write_text(json.dumps(cred,ensure_ascii=False,indent=1),encoding="utf-8")
