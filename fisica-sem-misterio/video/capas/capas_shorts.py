"""Capa própria (1080x1920) para cada short: imagem REAL do assunto + 2 linhas grandes (palavra com * fica amarela).
Regra de 30/10: capa sem foto real e o quadro final "Segue o Física" vão mal — toda capa nasce de foto/vídeo real.
Uso: python capas\\capas_shorts.py [ID ...]   -> capas/shorts/capa_ID.jpg  (+ capas/shorts/_folha.jpg para conferir)
Imagem: CAPA_IMG[id] = "foto:Nome" ou "clipe:ID_n@segundos"; sem isso usa a 1ª foto real do roteiro, senão o 1º clipe.
"""
import json, os, shutil, subprocess, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

RAIZ = Path(__file__).resolve().parents[1]
SAIDA = RAIZ / "capas" / "shorts"; SAIDA.mkdir(parents=True, exist_ok=True)
FF = Path(os.environ["LOCALAPPDATA"]) / "ffmpeg/ffmpeg-8.1.2-essentials_build/bin/ffmpeg.exe"
if not FF.exists():
    FF = Path(shutil.which("ffmpeg"))
FONTE = "C:/Windows/Fonts/seguibl.ttf"
AMARELO, BRANCO = (255, 212, 0), (255, 255, 255)
W, H = 1080, 1920

TEXTO = {
    "AreiaMovedica": "AREIA MOVEDIÇA/te *ENGOLE*?", "GatoEmPeIA": "Por que cai/*EM PÉ*?",
    "PedrasAndam": "PEDRAS que/*ANDAM* sozinhas", "FogosQuantica": "A cor dos FOGOS/é *QUÂNTICA*",
    "PulseiraQuantica": "PULSEIRA QUÂNTICA/*FUNCIONA*?", "PortaAviao": "Dá pra ABRIR/em *PLENO VOO*?",
    "AviaoAlto": "Por que voa/*TÃO ALTO*?", "PousarCheio": "Por que NÃO/pousa *CHEIO*?",
    "CidadeAlta": "A cidade mais/*ALTA* do mundo", "TsunamiRecua": "Por que o mar/*RECUA*?",
    "Orionidas": "Pedaços do/*COMETA HALLEY*", "ElNinoNome": "Por que/*EL NIÑO*?",
    "LugarChuva": "Onde mais/*CHOVE* no mundo", "CidadeEspelhos": "6 MESES/*SEM SOL*",
    "RioFerve": "O rio que/*FERVE*", "LugarSeco": "O lugar mais/*SECO* do mundo",
    "TerraAneis": "E se a Terra/tivesse *ANÉIS*?", "MarDrake": "O mar mais/*PERIGOSO*",
    "LugarAlto": "O ponto mais/*ALTO* da Terra", "LugarQuente": "O lugar mais/*QUENTE*",
    "TrianguloBermudas": "Triângulo das/*BERMUDAS*", "PassaroFio": "Por que NÃO/leva *CHOQUE*?",
    "OndaNazare": "A MAIOR/*ONDA* do mundo", "MacaEscurece": "Por que a maçã/*ESCURECE*?",
    "DedosEnrugam": "Por que os dedos/*ENRUGAM*?", "ViagemTempo": "Viajar no/*TEMPO* existe",
    "FundoMar": "O fundo do mar/*ESMAGA*", "Silencio": "A sala mais/*SILENCIOSA*",
    "ImasRepelem": "Por que os ímãs/se *EMPURRAM*?", "TremTrilho": "Por que o trem/NÃO *ESCAPA*?",
    "CervejaGelo": "Cerveja vira/*GELO* na hora", "BateriaIncha": "Bateria/*INCHADA*?",
    "CocaVidro": "Coca de VIDRO/é *MELHOR*?", "NuvemNaoCai": "Pesa TONELADAS/e *NÃO CAI*",
    "TomadaDerrete": "A tomada/*DERRETEU*?", "BoxEstoura": "O box/*EXPLODIU*?",
    "VozGravacao": "Sua voz é/*ESTRANHA*?", "CopoStanley": "Por que o STANLEY/*GELA* tanto?",
    "AviaoCurva": "Como o avião/faz *CURVA*?", "ChuveiroChoque": "CHOQUE no/*CHUVEIRO*?",
    "LeiteSobe": "Por que o leite/*SOBE*?", "CebolaChorar": "Por que a cebola/faz *CHORAR*?",
    "OuvidoAviao": "Ouvido/*ENTUPIU*?", "AviaoDeLado": "Pousando/*DE LADO*?",
    "GeladeiraEstala": "Por que a geladeira/*ESTALA*?", "PaoMurcha": "Por que o pão/*MURCHA*?",
    "GeloQueima": "O gelo/*QUEIMA*?", "CelularEsquenta": "Celular/*QUENTE*?",
    "RastroAviao": "NÃO é/*FUMAÇA*", "OvoBoia": "O teste/do *OVO*",
    "FogoAzul": "Por que o fogo/é *AZUL*?", "OvoMicro": "O ovo/*EXPLODE*",
    "VidroEmbaca": "Vidro/*EMBAÇADO*?", "TamanhoLua": "A Lua é MENOR/que o *BRASIL*?",
    "BigBang": "BIG BANG/em *30 s*", "Alavanca": "NÃO é força/é *FÍSICA*",
    "PesoMarte": "Seu peso/em *MARTE*", "SolTerra": "O Sol é/*GIGANTE*",
    "TerraGira": "1.600 KM POR HORA/e você *NEM SENTE*", "MarNuncaEnche": "Por que o mar/*NUNCA ENCHE*?",
    "AguaOleo": "Por que NÃO/se *MISTURAM*?", "NavioAco": "AÇO que/*BOIA*",
    "PorDoSol": "Por que fica/*LARANJA*?", "MarSalgado": "Mar SALGADO,/chuva *DOCE*?",
    "Inercia": "Por que você é/*JOGADO*?", "Colher": "A colher/*QUEBROU*?",
    "Estrelas": "Por que elas/*PISCAM*?", "SomEspaco": "SILÊNCIO/no *ESPAÇO*",
    "PanelaPressao": "Por que a panela/é *MAIS RÁPIDA*?", "Aviao": "Como ele/*VOA*?",
    "MetalGelado": "Metal mais/*GELADO*?", "MicroOndas": "Esquenta/*SEM FOGO*",
    "Lua": "Sempre o/*MESMO LADO*", "ArcoIris": "O arco-íris/é um *CÍRCULO*",
    "Astronautas": "Por que/*FLUTUAM*?", "Gelo": "Por que o gelo/*BOIA*?",
    "Trovao": "Raio ANTES/do *TROVÃO*", "CeuAzul": "Por que o céu/é *AZUL*?",
    "CaminhaoFreio": "Por que o FREIO/do caminhão *ACABA*?", "AviaoAntartida": "Por que NINGUÉM/voa na *ANTÁRTIDA*?",
    "ChoqueCarro": "Por que o CARRO/te dá *CHOQUE*?", "DesertoNoite": "Quente de dia,/*GELADO* à noite",
}
TEXTO["ChuteRoberto"] = "O chute/*IMPOSSÍVEL*"; TEXTO["ElevadorCabo"] = "Caiu 75 ANDARES/e *SOBREVIVEU*"
TEXTO_Y = {"ChuteRoberto": 1480, "ElevadorCabo": 1500, "ChoqueCarro": 1420, "FundoMar": 1250}  # altura do texto quando o assunto fica no alto da imagem
CAPA_IMG = {  # escolhas manuais depois de conferir a folha
    "ChuteRoberto": "foto:Rc_falta_capa", "ElevadorCabo": "foto:El_empire",
    "CeuAzul": "foto:CeuAzul_capa", "GatoEmPeIA": "clipe:GatoEmPeIA_3@4", "LugarChuva": "clipe:LugarChuva_1@1.5",
    "TrianguloBermudas": "foto:B_avenger", "FundoMar": "clipe:FundoMar_5@1.5", "ImasRepelem": "clipe:ImasRepelem_5@1.5",
    "CervejaGelo": "clipe:CervejaGelo_5@1.5", "AviaoCurva": "clipe:AviaoCurva_5@1.5", "RastroAviao": "clipe:RastroAviao_3@1.5",
    "MetalGelado": "clipe:MetalGelado_5@1.5", "Lua": "clipe:Lua_5@1.5", "Trovao": "clipe:Trovao_0@4",
    "CaminhaoFreio": "clipe:CaminhaoFreio_0@2", "AviaoAntartida": "foto:Aa_757",
    "ChoqueCarro": "clipe:ChoqueCarro_3@2", "DesertoNoite": "clipe:DesertoNoite_3@3",
}


def foto(nome):
    for pasta in ("fotos_short", "fotos"):
        p = RAIZ / "public" / pasta / f"{nome}.jpg"
        if p.exists():
            return Image.open(p).convert("RGB")


def quadro(fonte, seg=1.5):
    tmp = SAIDA / "_quadro.jpg"
    subprocess.run([str(FF), "-v", "error", "-y", "-ss", str(seg), "-i", fonte, "-frames:v", "1", str(tmp)], timeout=180)
    return Image.open(tmp).convert("RGB") if tmp.exists() and tmp.stat().st_size else None


def clipe(chave, seg=1.5):
    local = RAIZ / "public" / "clipes" / f"{chave}.mp4"
    if local.exists():
        return quadro(str(local), seg)
    url = json.loads((RAIZ / "clipes.json").read_text(encoding="utf-8")).get(chave)
    return quadro(url, seg) if url else None


def imagem(id_):
    r = json.loads((RAIZ / "roteiros" / f"{id_}.json").read_text(encoding="utf-8"))
    escolha = CAPA_IMG.get(id_)
    if escolha:
        tipo, val = escolha.split(":", 1)
        if tipo == "foto":
            return foto(val)
        chave, _, seg = val.partition("@")
        return clipe(chave, float(seg or 1.5))
    for c in r.get("cenas", []):
        if "foto" in c and (im := foto(c["foto"])):
            return im
    urls = json.loads((RAIZ / "clipes.json").read_text(encoding="utf-8"))
    for n in range(len(r.get("cenas", [])) or 6):
        if f"{id_}_{n}" in urls or (RAIZ / "public" / "clipes" / f"{id_}_{n}.mp4").exists():
            if im := clipe(f"{id_}_{n}"):
                return im


def cobrir(im):
    esc = max(W / im.width, H / im.height)
    im = im.resize((round(im.width * esc), round(im.height * esc)), Image.LANCZOS)
    x, y = (im.width - W) // 2, (im.height - H) // 2
    return im.crop((x, y, x + W, y + H))


def linha_partes(texto):
    partes, dentro = [], False
    for i, pedaco in enumerate(texto.split("*")):
        if pedaco:
            partes.append((pedaco, AMARELO if i % 2 else BRANCO))
    return partes


def capa(id_):
    im = imagem(id_)
    if im is None:
        print("sem imagem:", id_); return None
    im = cobrir(im)
    cy = TEXTO_Y.get(id_, 520)
    # escurece o miolo onde vai o texto (gradiente vertical suave)
    sombra = Image.new("L", (W, H), 0); ds = ImageDraw.Draw(sombra)
    for y in range(H):
        d = abs(y - cy) / 460
        ds.line([(0, y), (W, y)], fill=int(150 * max(0, 1 - d * d)))
    im = Image.composite(Image.new("RGB", (W, H), (0, 0, 0)), im, sombra)
    d = ImageDraw.Draw(im)
    linhas = [linha_partes(l.upper()) for l in TEXTO[id_].split("/")]
    tam = 150
    while True:
        f = ImageFont.truetype(FONTE, tam)
        larg = [sum(d.textlength(t, font=f) for t, _ in l) for l in linhas]
        if max(larg) <= 980 or tam <= 70:
            break
        tam -= 6
    alt = tam * 1.12
    y0 = cy - alt * len(linhas) / 2
    for l, lw in zip(linhas, larg):
        x = (W - lw) / 2
        for t, cor in l:
            d.text((x, y0), t, font=f, fill=cor, stroke_width=max(8, tam // 14), stroke_fill="black")
            x += d.textlength(t, font=f)
        y0 += alt
    destino = SAIDA / f"capa_{id_}.jpg"
    im.save(destino, quality=88)
    return destino


if __name__ == "__main__":
    ids = sys.argv[1:] or list(TEXTO)
    feitas = [p for i in ids if (p := capa(i))]
    if feitas:
        cols, tw, th = 10, 216, 384
        folha = Image.new("RGB", (cols * tw, -(-len(feitas) // cols) * (th + 30)), "white")
        dd = ImageDraw.Draw(folha); fl = ImageFont.truetype("arialbd.ttf", 16)
        for k, p in enumerate(feitas):
            x, y = (k % cols) * tw, (k // cols) * (th + 30)
            folha.paste(Image.open(p).resize((tw, th)), (x, y))
            dd.text((x + 4, y + th + 6), p.stem[5:], fill="black", font=fl)
        folha.save(SAIDA / "_folha.jpg", quality=80)
    print(len(feitas), "capas")
