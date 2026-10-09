"""Roteiros dos VÍDEOS LONGOS (horizontais, ~8 min) do Física Sem Mistério.

Cada vídeo tem capítulos; cada capítulo tem cenas. Cada cena = uma ou duas frases faladas + o que aparece na tela:
  v("termo")        vídeo real do Pexels (horizontal 1920x1080)
  f("arquivo")      foto real (Wikimedia/NASA/USGS) em public/fotos/, com zoom lento
  a(emoji, texto)   animação simples (só quando não existe imagem real)
Grava roteiros/ID.json (campo "longo": true). Narração: python narrar_longo.py roteiros/ID.json
"""
import json
from pathlib import Path

L = []


def longo(id_, titulo, descricao, capitulos):
    L.append(dict(id=id_, longo=True, titulo=titulo, descricao=descricao,
                  capitulos=[dict(titulo=t, cenas=[dict(frase=c[0], **c[1]) for c in cenas]) for t, cenas in capitulos]))


def v(busca, desde=0):
    return {"busca": busca, "desde": desde}


def f(arquivo):
    return {"foto": arquivo}


def a(emoji, texto):
    return {"anim": {"emoji": emoji, "texto": texto}}


longo("Vulcao", "VULCÃO: por que a Terra cospe fogo? 🌋 (e a cidade enterrada em um dia)",
      "De onde vem a lava a mais de mil graus, por que alguns vulcões só escorrem e outros explodem, o que aconteceu em Pompeia, "
      "o barulho mais alto da história, os raios dentro da fumaça e os vulcões que já existiram no Brasil.", [
    ("Abertura", [
        ("Isso é rocha. Rocha derretida, a mais de mil graus, escorrendo como se fosse água.", v("lava flow close up")),
        ("Neste vídeo você vai entender de onde ela vem, por que alguns vulcões só escorrem lava e outros explodem com uma força assustadora, e o que aconteceu com uma cidade inteira que foi enterrada em um único dia.", v("volcano eruption night")),
        ("E no final, a pergunta que muita gente faz: existe vulcão no Brasil?", v("volcano aerial smoke")),
    ]),
    ("O fogo embaixo dos seus pés", [
        ("Debaixo do chão que você pisa, a temperatura sobe uns vinte e cinco graus a cada quilômetro de profundidade.", a("🌍", "+25 °C a cada quilômetro para baixo")),
        ("A uns cem quilômetros para baixo, já passa de mil graus. É calor de sobra para derreter rocha, mas a pressão lá embaixo é tão grande que quase tudo continua sólido.", a("🔥", "Mais de 1.000 °C lá embaixo")),
        ("A rocha só derrete de verdade quando essa pressão alivia, ou quando entra água no meio dela. E isso acontece principalmente nas bordas das placas tectônicas, as peças gigantes que formam a casca da Terra.", v("iceland rift aerial")),
        ("Quando uma placa afunda por baixo da outra, ou quando duas se afastam, nasce o magma: rocha derretida, cheia de gases dissolvidos.", v("magma lava bubbling")),
        ("Como é mais leve que a rocha em volta, o magma sobe devagar, ao longo de milhares de anos, e se acumula em bolsões a poucos quilômetros da superfície. É a câmara magmática.", v("volcano crater smoke")),
        ("Por isso três de cada quatro vulcões do planeta ficam em volta do Oceano Pacífico, no chamado Anel de Fogo, onde várias placas se encontram.", a("🌋", "Anel de Fogo: 75% dos vulcões")),
    ]),
    ("Por que o vulcão explode", [
        ("Agora, a parte mais importante: o que faz um vulcão entrar em erupção?", v("volcano eruption lava fountain")),
        ("Pense numa garrafa de refrigerante. Enquanto está fechada, o gás fica escondido dentro do líquido, preso pela pressão.", v("soda bottle")),
        ("Quando você abre, a pressão cai, o gás vira bolhas, as bolhas crescem e o refrigerante espirra para fora.", v("soda bubbles pouring")),
        ("Com o magma acontece a mesma coisa. Ele carrega vapor d'água, gás carbônico e enxofre dissolvidos. Quando sobe e a pressão diminui, esses gases viram bolhas que crescem centenas de vezes.", a("🫧", "Os gases viram bolhas")),
        ("Se o magma for mole e escorregadio, as bolhas escapam fácil, e a lava sai escorrendo e jorrando, como no Havaí e na Islândia.", v("lava fountain iceland")),
        ("Mas se o magma for grosso e pegajoso, como mel gelado, as bolhas ficam presas. A pressão vai acumulando até que tudo estoura de uma vez, e a rocha é despedaçada em cinzas.", v("volcanic ash plume")),
    ]),
    ("Rios de fogo", [
        ("Nos vulcões mais calmos, a lava sai entre mil e mil e duzentos graus. Ela brilha em amarelo e laranja, como o filamento de uma lâmpada.", v("lava river night")),
        ("Conforme esfria, a cor muda para vermelho escuro, e a superfície forma uma casca preta, enquanto por baixo ela continua correndo.", v("lava crust cooling")),
        ("A lava pode andar devagar, como uma pessoa caminhando, ou descer uma encosta mais rápido que um carro. Ela queima e enterra tudo no caminho: estradas, casas, florestas.", v("lava flow road")),
        ("Em 2023, na Islândia, a cidade de Grindavík teve que ser esvaziada às pressas quando o chão começou a rachar. Semanas depois, a lava apareceu do lado das casas.", v("iceland eruption aerial")),
        ("Quando esfria de vez, a lava vira rocha nova, o basalto. E se esfriar muito rápido, ela vira um vidro preto e brilhante, a obsidiana.", v("basalt lava rock")),
    ]),
    ("A cidade enterrada em um dia", [
        ("Agora vamos voltar quase dois mil anos, para o ano setenta e nove, no sul da Itália.", v("pompeii ruins")),
        ("A cidade de Pompeia ficava ao pé do Vesúvio. Os moradores nem desconfiavam que aquela montanha verde era um vulcão: ele estava quieto havia séculos.", v("vesuvius mountain")),
        ("Num dia de verão, o Vesúvio explodiu. Uma coluna de cinzas e pedras subiu mais de trinta quilômetros no céu e começou a cair sobre a cidade como chuva.", v("volcano ash column eruption")),
        ("Durante horas, pedras-pomes e cinzas cobriram telhados e ruas. Muita gente fugiu, mas outros ficaram, se protegendo dentro de casa.", v("pompeii street")),
        ("Na manhã seguinte veio o pior: as nuvens ardentes. São avalanches de gás e cinzas a centenas de graus, que descem a montanha a mais de cem quilômetros por hora.", a("☁️", "Nuvem ardente: mais de 100 km/h")),
        ("Ninguém consegue correr disso. Em poucos minutos, Pompeia ficou enterrada debaixo de uns cinco metros de cinzas.", v("pompeii aerial")),
        ("A cidade ficou esquecida por mais de mil e seiscentos anos. Quando os arqueólogos escavaram, encontraram pães nos fornos, pinturas nas paredes e até o formato das pessoas, marcado nas cinzas endurecidas.", v("pompeii fresco")),
        ("Hoje o Vesúvio continua ativo, e cerca de seiscentas mil pessoas vivem na zona de perigo em volta dele.", v("naples bay vesuvius")),
    ]),
    ("O barulho mais alto da história", [
        ("Em mil oitocentos e oitenta e três, o vulcão Krakatoa, na Indonésia, explodiu com tanta força que a ilha praticamente desapareceu.", v("volcano island ocean")),
        ("O estrondo foi ouvido a quase cinco mil quilômetros de distância. É mais longe do que de Manaus até Porto Alegre.", a("🔊", "Ouvido a quase 5.000 km")),
        ("Foi o som mais alto já registrado. A onda de pressão deu a volta na Terra sete vezes e apareceu nos barômetros do mundo inteiro.", a("🌍", "Deu 7 voltas na Terra")),
        ("E em 2022, o vulcão Hunga Tonga, no meio do Oceano Pacífico, lançou uma coluna de fumaça a cinquenta e sete quilômetros de altura, a mais alta já vista por satélite.", v("earth from space clouds")),
    ]),
    ("Cinza não é fumaça", [
        ("Aquela nuvem cinza que sai do vulcão parece fumaça, mas não é. É rocha e vidro moídos em pedacinhos menores que um grão de areia.", v("volcanic ash cloud")),
        ("Essa cinza é afiada, não derrete na chuva e é pesada: poucos centímetros dela em cima de um telhado podem derrubar uma casa.", v("volcanic ash ground")),
        ("E ela é um perigo enorme para os aviões. Dentro da turbina, a mais de mil graus, a cinza derrete, gruda nas peças e apaga o motor.", v("airplane jet engine")),
        ("Em mil novecentos e oitenta e dois, um avião de passageiros atravessou uma nuvem de cinzas na Indonésia e os quatro motores pararam. Ele planou por vários minutos até os pilotos conseguirem religar as turbinas, e todos sobreviveram.", v("airplane flying clouds")),
        ("Por isso, em 2010, quando um vulcão da Islândia entrou em erupção, quase todo o céu da Europa foi fechado, e mais de cem mil voos foram cancelados.", v("airport airplanes parked")),
    ]),
    ("Raios dentro da fumaça", [
        ("E existe um fenômeno ainda mais estranho: raios dentro da nuvem do vulcão.", v("volcano lightning")),
        ("As partículas de cinza, gelo e rocha se chocam umas contra as outras e vão ganhando carga elétrica, como quando você esfrega um balão no cabelo.", a("⚡", "Partículas que se chocam")),
        ("Quando a carga fica grande demais, ela se descarrega em raios no meio da erupção. É uma tempestade elétrica criada pelo próprio vulcão.", v("lightning storm night")),
    ]),
    ("E no Brasil?", [
        ("Agora, a pergunta que todo mundo faz: existe vulcão no Brasil?", v("brazil aerial landscape")),
        ("Ativo, não. O Brasil fica bem no meio da placa Sul-Americana, longe das bordas, onde o chão é estável.", a("🇧🇷", "Longe das bordas da placa")),
        ("Mas já teve. O arquipélago de Fernando de Noronha é o que sobrou de um vulcão que se apagou há milhões de anos, e o Morro do Pico é a antiga chaminé dele.", v("fernando de noronha")),
        ("E a cidade de Poços de Caldas, em Minas Gerais, fica dentro de uma cratera gigante, com mais de trinta quilômetros de largura, de um vulcão que se apagou há uns oitenta milhões de anos.", v("minas gerais hills aerial")),
    ]),
    ("O vulcão também cria", [
        ("Apesar de todo o perigo, os vulcões também constroem.", v("lava ocean steam")),
        ("Quando a lava chega no mar e esfria, nasce terra nova. O Havaí, a Islândia e o próprio Fernando de Noronha surgiram assim, do fundo do oceano.", v("lava entering ocean")),
        ("A cinza, com o tempo, vira um dos solos mais férteis do mundo. É por isso que tanta gente planta e mora perto de vulcões.", v("vineyard volcano")),
        ("E na Islândia, o calor que vem de baixo da terra aquece as casas, a água do banho e ainda gera energia elétrica.", v("geothermal iceland steam")),
    ]),
    ("Final", [
        ("Então, da próxima vez que você vir um vulcão, lembre: é o planeta mostrando que, por baixo da casca fria, a Terra ainda está viva e quente.", v("volcano eruption night", 6)),
        ("Se você gostou, se inscreva no Física Sem Mistério e me conta nos comentários: você teria coragem de ver um vulcão de perto?", {"fim": True}),
    ]),
])

longo("Oymyakon", "A vila mais FRIA do mundo: −67 °C 🥶 O que a física faz com tudo lá",
      "Oymyakon, na Sibéria: água fervendo que vira neve no ar, celular que apaga, carro ligado o dia inteiro e por que lá é tão frio.", [
    ("Abertura", [
        ("Imagine sair de casa e sentir o ar tão gelado que os seus cílios congelam em poucos minutos.", v("frozen eyelashes")),
        ("Aqui, jogar uma panela de água fervendo para o alto faz nevar. E o carro precisa ficar ligado o dia inteiro, senão não liga nunca mais.", v("boiling water freezing air")),
        ("Bem-vindo a Oymyakon, na Sibéria: a vila habitada mais fria do planeta.", v("siberia village winter")),
        ("Neste vídeo você vai entender por que lá é tão frio, o que a física faz com as coisas a quase setenta graus negativos, e como quinhentas pessoas conseguem viver ali.", v("snowy village smoke chimney")),
    ]),
    ("Onde fica o lugar mais frio", [
        ("Oymyakon fica na Iacútia, no extremo leste da Rússia, a mais de cinco mil quilômetros de Moscou.", v("siberia aerial winter")),
        ("Em janeiro, a média fica em torno de quarenta e seis graus negativos. E em mil novecentos e trinta e três, os termômetros marcaram sessenta e sete vírgula sete graus negativos: o recorde oficial de frio num lugar onde vivem pessoas.", a("🌡️", "Recorde: −67,7 °C")),
        ("Existe até um registro antigo, de mil novecentos e vinte e quatro, de setenta e um graus negativos, mas ele nunca foi confirmado oficialmente.", a("📜", "−71 °C? Nunca confirmado")),
        ("Para comparar: o congelador da sua casa fica em uns dezoito graus negativos. Um dia comum de inverno em Oymyakon é mais que o dobro disso.", v("freezer ice")),
        ("E o mais curioso: no verão, a temperatura pode passar de trinta graus. É uma diferença de mais de cem graus entre o inverno e o verão.", a("☀️", "Mais de 100 °C de diferença")),
    ]),
    ("Por que lá é tão frio", [
        ("Mas por que justamente ali? São quatro motivos, e todos são física pura.", v("snow mountains winter")),
        ("Primeiro: fica muito ao norte. No auge do inverno, o Sol aparece só umas três horas por dia, baixinho no horizonte, e quase não esquenta nada.", v("low sun winter snow")),
        ("Segundo: fica longe do mar, e ainda é cercada de montanhas. A água do oceano guarda calor e esquenta o ar do litoral no inverno, mas esse ar mais ameno não chega até lá.", v("snowy mountains aerial")),
        ("Terceiro: o céu quase sempre limpo. Sem nuvens fazendo papel de cobertor, o calor do chão escapa direto para o espaço durante as noites longuíssimas.", v("starry sky winter night")),
        ("E quarto, o mais importante: a vila fica no fundo de um vale, rodeado de montanhas.", v("valley snow aerial")),
        ("O ar frio é mais pesado que o ar quente. À noite, ele escorre das montanhas, desce como se fosse água e fica preso no fundo do vale, cada vez mais gelado.", a("⬇️", "O ar frio é pesado e desce")),
        ("É a chamada inversão térmica: lá embaixo, onde as pessoas moram, faz mais frio do que no alto das montanhas em volta.", v("fog valley winter")),
    ]),
    ("A água que vira neve no ar", [
        ("Agora, o lado divertido da física. O truque mais famoso de Oymyakon é jogar água fervendo para cima.", v("throwing boiling water cold")),
        ("A água quente se espalha em milhões de gotinhas minúsculas, e boa parte dela vira vapor na hora.", v("hot water steam winter")),
        ("Em contato com o ar a quarenta graus negativos, o vapor e as gotinhas congelam em menos de um segundo e caem como neve, ou ficam no ar como uma nuvem branca.", v("snow falling slow motion")),
        ("E tem que ser água quente mesmo: ela solta muito mais vapor que a água fria, por isso o efeito fica muito maior.", a("💨", "Água quente solta mais vapor")),
        ("Pelo mesmo motivo, a vila vive coberta por uma neblina de gelo: o vapor das casas, dos carros e até da respiração das pessoas congela e fica pairando no ar.", v("frosty town fog winter")),
        ("Os moradores contam que, abaixo de cinquenta graus negativos, dá para ouvir a própria respiração congelando: um barulhinho de cristais de gelo que eles chamam de sussurro das estrelas.", v("breath vapor cold")),
    ]),
    ("O que quebra no frio", [
        ("Nesse frio, quase tudo para de funcionar.", v("frozen car snow")),
        ("A bateria do celular apaga em minutos. Ela funciona com uma reação química, e reação química fica lentíssima no frio. O celular acha que a bateria acabou.", v("phone snow cold")),
        ("O óleo do motor engrossa como manteiga e o diesel vira uma pasta. Por isso muitos moradores deixam o carro ligado o dia inteiro, ou guardam numa garagem aquecida.", v("car exhaust winter cold")),
        ("A borracha do pneu fica dura e pode rachar, o plástico se quebra como vidro, e a tinta da caneta congela dentro dela.", v("ice frost close up")),
        ("Até a neve muda de som. Em vez de fofa, ela range debaixo das botas, porque os cristais estão tão gelados que raspam uns nos outros em vez de derreter um pouquinho.", v("walking snow boots")),
        ("E quem usa óculos precisa de cuidado: a armação de metal gruda na pele, porque a umidade do rosto congela na hora.", v("frost face winter")),
    ]),
    ("O corpo humano no limite", [
        ("E o corpo humano? A primeira coisa que ele faz no frio extremo é se proteger por dentro.", v("person winter coat snow")),
        ("Ele aperta os vasos sanguíneos das mãos, dos pés, do nariz e das orelhas, e manda o sangue quente para o coração e o cérebro.", a("🩸", "O sangue vai para o centro")),
        ("O problema é que essas pontas ficam sem calor, e a pele exposta pode congelar em poucos minutos. Por isso todo mundo anda coberto dos pés à cabeça, só com os olhos de fora.", v("person covered face snow")),
        ("E o ar gelado demais machuca até por dentro. As pessoas respiram através do cachecol, que esquenta um pouco o ar antes de ele chegar aos pulmões.", v("scarf winter cold")),
    ]),
    ("Como eles vivem", [
        ("Mesmo assim, umas quinhentas pessoas moram em Oymyakon.", v("snowy village houses")),
        ("As casas têm paredes grossas de madeira, janelas duplas ou triplas, e o aquecimento fica ligado o inverno inteiro.", v("wooden house snow")),
        ("O chão é congelado o ano todo, o chamado permafrost. Um cano enterrado congelaria e racharia, por isso em muitas casas o banheiro fica do lado de fora.", v("frozen ground snow")),
        ("Quase nada cresce no inverno, então a comida é carne de rena, de cavalo e muito peixe.", v("reindeer snow")),
        ("O peixe congela tão duro que é comido cru, em lascas finas, raspado com a faca como se fosse madeira. É a stroganina, o prato típico da região.", v("frozen fish")),
        ("E as crianças vão para a escola normalmente. As aulas só são canceladas quando o frio passa de uns cinquenta graus negativos.", v("children playing snow")),
    ]),
    ("Existe lugar mais frio?", [
        ("Mas Oymyakon não é o lugar mais frio da Terra. Esse título fica com a Antártida.", v("antarctica")),
        ("Lá, numa estação de pesquisa chamada Vostok, já fez oitenta e nove graus negativos, em mil novecentos e oitenta e três. Só que ninguém mora lá de verdade: são pesquisadores que ficam alguns meses.", v("antarctica research station")),
        ("Oymyakon é especial porque é o lugar mais frio onde pessoas nascem, crescem e vivem a vida inteira.", v("siberia village winter", 6)),
    ]),
    ("Final", [
        ("Da próxima vez que você reclamar do frio do ar-condicionado, lembre de Oymyakon, onde a física transforma água fervendo em neve.", v("snow falling night")),
        ("Se você gostou, se inscreva no Física Sem Mistério e me conta nos comentários: quanto tempo você aguentaria lá fora?", {"fim": True}),
    ]),
])

# ---------- o que aparece em cada cena (escolhido conferindo as imagens) ----------
# Sem entrada aqui: usa o clipe public/clipes_longo/ID_i.mp4 baixado pela "busca".
# foto = public/fotos/NOME.jpg (créditos em public/fotos/creditos.json); legenda = etiqueta "imagem real".
VIS = {
    "Vulcao": {
        18: dict(foto="Vulcao_grindavik", legenda="Grindavík, Islândia, 2023"),
        19: dict(foto="Vulcao_obsidiana", legenda="Obsidiana: lava que virou vidro"),
        20: dict(foto="Vulcao_forum", legenda="Pompeia, com o Vesúvio ao fundo"),
        24: dict(foto="Vulcao_mayon", legenda="Nuvem ardente descendo um vulcão"),
        25: dict(foto="Vulcao_pompeia", legenda="Ruínas de Pompeia e o Vesúvio"),
        26: dict(foto="Vulcao_fresco", legenda="Pintura em parede de Pompeia"),
        28: dict(foto="Vulcao_krakatoa", legenda="Krakatoa, 1883 (gravura da época)"),
        31: dict(foto="Vulcao_tonga", legenda="Hunga Tonga, 2022, visto da Estação Espacial"),
        33: dict(foto="Vulcao_cinzateto", legenda="Telhados esmagados por cinzas, Filipinas, 1991"),
        36: dict(foto="Vulcao_eyja", legenda="Cinzas do vulcão da Islândia vistas por satélite, 2010"),
        37: dict(foto="Vulcao_galunggung", legenda="Raios na erupção do Galunggung, Indonésia, 1982"),
        39: dict(foto="Vulcao_vesuvio1944", legenda="Raios na erupção do Vesúvio, 1944"),
        43: dict(foto="Vulcao_pocos", legenda="Poços de Caldas (MG)"),
        44: dict(foto="Vulcao_mar2", legenda="Lava chegando ao mar, Havaí"),
        45: dict(foto="Vulcao_mar1", legenda="Lava chegando ao mar, Havaí"),
    },
    "Oymyakon": {
        0: dict(clipe="Oymyakon_30"),
        1: dict(clipe="Oymyakon_1", desde=12.5),
        2: dict(foto="Oym_panorama", legenda="Oymyakon, Rússia"),
        4: dict(foto="Oym_floresta", legenda="Perto de Oymyakon, Iacútia"),
        16: dict(clipe="Oymyakon_16", desde=5),
        17: dict(clipe="Oymyakon_16", desde=9),
        20: dict(foto="Oym_yakutsk", legenda="Neblina de gelo em Iacutsk"),
        27: dict(foto="Oym_termometro", legenda="Geada na Iacútia"),
        30: dict(foto="Oym_pessoa", legenda="Morador de Oymyakon"),
        32: dict(foto="Oym_vila1", legenda="Oymyakon"),
        36: dict(foto="Oym_stroganina", legenda="Stroganina: peixe congelado raspado"),
        39: dict(foto="Oym_vostok", legenda="Estação Vostok, Antártida"),
        40: dict(foto="Oym_vila2", legenda="Casa em Oymyakon"),
    },
}

pasta = Path(__file__).resolve().parent / "roteiros"
for x in L:
    i = 0
    for cap in x["capitulos"]:
        for c in cap["cenas"]:
            if "busca" in c:
                c["clipe"] = f"{x['id']}_{i}"
            c.update(VIS.get(x["id"], {}).get(i, {}))
            if "foto" in c or "anim" in c:
                c.pop("clipe", None)
            if "foto" in c:
                c.pop("anim", None)
            i += 1
    x["frases"] = [c["frase"] for cap in x["capitulos"] for c in cap["cenas"]]
    (pasta / f"{x['id']}.json").write_text(json.dumps(x, ensure_ascii=False, indent=1), encoding="utf-8")
    print(x["id"], len(x["frases"]), "cenas,", sum(len(fr.split()) for fr in x["frases"]), "palavras")
