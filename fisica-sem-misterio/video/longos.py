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

longo("Tornado", "TORNADO: como nasce um monstro de vento 🌪️ (e sim, o Brasil tem tornados)",
      "Como uma tempestade comum vira um funil girando a mais de 300 km/h, por que ele gira tão rápido, a escala que mede a força, "
      "o Beco dos Tornados dos Estados Unidos, os tornados que já atingiram o Brasil e o que a física diz sobre como se proteger.", [
    ("Abertura", [
        ("Um funil de vento girando a mais de trezentos quilômetros por hora, capaz de levantar carros e arrancar casas do chão.", v("tornado")),
        ("Neste vídeo você vai entender como uma tempestade comum se transforma num tornado, por que ele gira tão rápido e por que alguns lugares do mundo têm tantos.", v("storm clouds timelapse")),
        ("E vamos falar de uma coisa que muita gente não sabe: o Brasil também tem tornados, e alguns foram muito fortes.", v("dark storm clouds field")),
    ]),
    ("Tudo começa numa tempestade", [
        ("Quase todo tornado forte nasce dentro de um tipo especial de tempestade, chamada supercélula.", v("supercell storm")),
        ("Para ela se formar, é preciso uma receita: ar quente e úmido perto do chão, e ar frio e seco lá em cima.", a("🌡️", "Quente e úmido embaixo, frio e seco em cima")),
        ("Ar quente é mais leve. Ele sobe com força, como uma bolha numa panela, e forma nuvens enormes, que podem passar de quinze quilômetros de altura.", v("cumulonimbus cloud")),
        ("O segundo ingrediente é o vento mudando de direção e de velocidade conforme a altura: fraco e de um lado perto do chão, forte e de outro lado lá no alto.", a("💨", "O vento muda com a altura")),
        ("Essa diferença faz o ar perto do chão começar a rolar, como um rolo de massa deitado, girando na horizontal.", a("🌀", "Um rolo de ar deitado")),
        ("Quando a corrente de ar quente da tempestade sobe, ela levanta esse rolo e deixa ele em pé. Agora a nuvem inteira começa a girar.", v("rotating storm clouds")),
        ("Essa parte que gira dentro da tempestade se chama mesociclone. Ela pode ter vários quilômetros de largura.", v("supercell thunderstorm")),
    ]),
    ("O funil desce", [
        ("Nem todo mesociclone vira tornado. Os cientistas ainda estudam exatamente o que faz a rotação descer até o chão.", v("storm clouds dark")),
        ("Quando acontece, aparece primeiro uma nuvem baixa e escura, que gira devagar: a nuvem-parede.", v("wall cloud")),
        ("Dela desce o funil. Ele fica visível porque, dentro dele, a pressão cai muito, o ar esfria e o vapor de água vira gotinhas, formando a nuvem em forma de cone.", v("tornado funnel cloud")),
        ("No chão, o tornado levanta poeira e destroços, que formam uma nuvem em volta da base. Às vezes a gente só vê essa poeira girando.", v("dust devil")),
    ]),
    ("Por que ele gira tão rápido", [
        ("A rotação começa larga e lenta. Então por que o tornado gira tão rápido?", v("tornado storm")),
        ("Pense numa patinadora girando no gelo. Quando ela fecha os braços, gira muito mais rápido, sem fazer força nenhuma.", v("figure skater spinning")),
        ("Isso se chama conservação do momento angular. Quanto mais perto do centro a coisa gira, mais rápido ela precisa girar.", a("⛸️", "Fechou os braços, girou mais rápido")),
        ("No tornado é igual: o ar que girava num círculo de quilômetros é apertado num funil de algumas centenas de metros, e a velocidade dispara.", a("🌪️", "Círculo menor, vento mais rápido")),
        ("É o mesmo motivo de a água girar mais rápido quando se aproxima do ralo da pia.", v("water draining sink")),
    ]),
    ("Quanto um tornado pode ser forte", [
        ("Para medir a força de um tornado, os cientistas usam a escala Fujita melhorada, que vai de zero a cinco.", a("📏", "Escala Fujita: de EF0 a EF5")),
        ("Ela é calculada pelo estrago: um EF zero arranca telhas e galhos. Um EF cinco, com ventos acima de trezentos e vinte quilômetros por hora, varre casas inteiras do chão.", v("storm damage houses")),
        ("Em mil novecentos e noventa e nove, perto da cidade de Moore, nos Estados Unidos, um radar mediu ventos de cerca de quatrocentos e oitenta quilômetros por hora dentro de um tornado, um dos ventos mais rápidos já registrados na Terra.", v("tornado storm field")),
        ("E o tornado mais largo já medido, em El Reno, em dois mil e treze, chegou a quatro quilômetros de largura.", v("huge storm")),
        ("Mas a maioria dos tornados é bem menor: dura poucos minutos e anda alguns quilômetros.", v("thunderstorm plains")),
    ]),
    ("O Beco dos Tornados", [
        ("Os Estados Unidos têm mais de mil tornados por ano, mais do que qualquer outro país.", v("great plains storm")),
        ("Isso acontece por causa da geografia. Do Golfo do México vem ar quente e úmido. Do Canadá, ar frio. E das Montanhas Rochosas, ar seco por cima.", a("🗺️", "Quente do Golfo + frio do Canadá + seco das montanhas")),
        ("Essas massas de ar se encontram nas grandes planícies do centro do país, uma região plana chamada de Beco dos Tornados.", v("prairie storm")),
        ("Na primavera, a receita da supercélula aparece quase todo dia por lá.", v("storm road clouds")),
    ]),
    ("Sim, o Brasil tem tornados", [
        ("E aqui vem a surpresa: a segunda região com mais tornados no mundo fica na América do Sul.", a("🌎", "2ª região com mais tornados do mundo")),
        ("Ela pega o sul do Brasil, o Paraguai, o Uruguai e o norte da Argentina. O ar quente e úmido vem da Amazônia e encontra o ar frio que sobe do sul, com a Cordilheira dos Andes ajudando a montar a receita.", a("🌪️", "Amazônia + ar frio do sul + Andes")),
        ("Em dois mil e quinze, um tornado atingiu Xanxerê, em Santa Catarina, destelhou centenas de casas e deixou vítimas.", v("destroyed roof")),
        ("E em novembro de dois mil e vinte e cinco, um tornado muito forte passou por Rio Bonito do Iguaçu, no Paraná, destruiu grande parte da cidade e também deixou mortos e muitos feridos.", v("storm damage town")),
        ("Por isso a Defesa Civil emite alertas de tempestade severa no Sul. Entender o tornado ajuda a levar esses avisos a sério.", v("rain storm city")),
    ]),
    ("Como se proteger, segundo a física", [
        ("O que mais machuca num tornado nem é o vento em si. São as coisas que ele arremessa: telhas, vidros e tábuas, voando como projéteis.", v("strong wind debris")),
        ("Por isso o lugar mais seguro é o cômodo mais interno da casa, sem janelas, no andar mais baixo. Banheiro ou corredor, abaixado e protegendo a cabeça.", a("🏠", "Cômodo interno, sem janelas, andar mais baixo")),
        ("Um mito antigo dizia para abrir as janelas, para a casa não explodir com a diferença de pressão. Isso é falso: o que derruba a casa é o vento, e abrir janela só perde tempo e deixa os destroços entrarem.", a("❌", "Abrir as janelas: mito")),
        ("Debaixo de viaduto também não é abrigo. O vento passa espremido ali, fica ainda mais rápido e cheio de destroços.", v("highway overpass")),
        ("E carro não protege: o tornado consegue levantar e virar carros. Se não der para chegar a um abrigo, o melhor é deitar numa vala, longe dos carros e das árvores.", v("car driving storm")),
    ]),
    ("Como os cientistas caçam tornados", [
        ("Hoje, radares meteorológicos conseguem enxergar a rotação dentro da tempestade antes mesmo de o funil aparecer.", v("weather radar")),
        ("O radar Doppler mede se as gotas de chuva estão vindo na direção dele ou indo embora. Quando, lado a lado, umas vêm e outras vão, é sinal de que o ar está girando.", a("📡", "Radar Doppler: vê o ar girando")),
        ("E existem os caçadores de tempestades: cientistas que dirigem até perto das supercélulas com instrumentos, para entender melhor como o tornado nasce.", v("storm chaser")),
        ("Graças a esse trabalho, os alertas nos Estados Unidos saem, em média, uns dez minutos antes de o tornado chegar. Parece pouco, mas salva muitas vidas.", v("storm sky town")),
    ]),
    ("Final", [
        ("Um tornado é a física juntando calor, umidade e vento até virar uma das forças mais violentas da natureza.", v("storm clouds sunset")),
        ("Se você gostou, se inscreva no Física Sem Mistério e me conta nos comentários: você já viu uma tempestade dessas de perto?", {"fim": True}),
    ]),
])

longo("TerraParar", "E se a Terra PARASSE de girar? 🌍 O que a física diz que aconteceria",
      "A Terra gira a até 1.670 km/h no Equador. O que aconteceria se ela parasse de repente, e se ela parasse aos poucos: "
      "ventos mais fortes que qualquer tornado, oceanos fugindo para os polos, um dia de seis meses, o escudo magnético enfraquecendo "
      "e a Lua, que está mesmo freando o nosso planeta.", [
    ("Abertura", [
        ("Agora mesmo, você está girando junto com a Terra a mais de mil quilômetros por hora. E não sente nada.", v("earth rotation space")),
        ("Mas o que aconteceria se, de uma hora para outra, a Terra parasse de girar?", v("earth from space")),
        ("Neste vídeo, a física responde: o que acontece se ela parar de repente, o que acontece se ela parar devagar, e uma notícia curiosa: a Terra está mesmo freando.", v("earth night city lights space")),
    ]),
    ("A velocidade que você não sente", [
        ("A Terra dá uma volta em si mesma a cada vinte e quatro horas. Na linha do Equador, isso dá mil seiscentos e setenta quilômetros por hora.", a("🌍", "1.670 km/h no Equador")),
        ("Aqui em Manaus, pertinho do Equador, é quase isso. Em Porto Alegre, mais ao sul, uns mil e quatrocentos e cinquenta. E nos polos, quase zero.", a("📍", "Manaus ≈ 1.665 km/h · Porto Alegre ≈ 1.450 km/h")),
        ("A gente não sente porque tudo gira junto: o chão, o ar, os prédios e você. É como estar num avião em velocidade de cruzeiro: se ele não balança, parece parado.", v("airplane cabin")),
        ("O que o corpo sente é mudança de velocidade. E é exatamente isso que tornaria uma parada tão perigosa.", v("car braking")),
    ]),
    ("Se parasse de repente", [
        ("Imagine que a rocha do planeta parasse num instante. Tudo que está solto em cima dela continuaria indo para o leste, a mais de mil e seiscentos quilômetros por hora.", a("➡️", "Tudo continua indo para o leste")),
        ("É a inércia, a mesma coisa que te joga para frente quando o ônibus freia. Só que muito, mas muito mais forte.", v("bus interior passengers")),
        ("Pessoas, carros, árvores e prédios seriam arrancados e arremessados. O ar também: viriam ventos de mais de mil quilômetros por hora, mais fortes que qualquer tornado.", v("hurricane wind trees")),
        ("Os oceanos sairiam do lugar e invadiriam os continentes em ondas gigantes.", v("huge waves storm")),
        ("A boa notícia: isso é impossível. Não existe nada perto de nós capaz de frear um planeta inteiro de uma vez. É só um experimento de pensamento.", v("earth sunrise space")),
    ]),
    ("Se parasse devagar", [
        ("E se a Terra fosse parando bem devagar, ao longo de milhares de anos? Aí ninguém seria arremessado. Mas o planeta mudaria completamente.", v("earth globe rotating")),
        ("Por causa do giro, a Terra não é uma bola perfeita. Ela é um pouco achatada nos polos e mais larga no Equador: uns quarenta e três quilômetros a mais de diâmetro.", a("🌐", "43 km mais larga no Equador")),
        ("Os oceanos também ficam empurrados para o Equador, como uma barriga de água em volta do planeta.", a("🌊", "Os oceanos se acumulam no Equador")),
        ("Sem o giro, essa água escorreria para os polos. Surgiriam dois oceanos gigantes, um no norte e outro no sul.", a("🧭", "Dois oceanos: um em cada polo")),
        ("E no meio, ao longo do Equador, apareceria um continente enorme, dando a volta no planeta inteiro.", a("🗺️", "Um supercontinente no Equador")),
        ("Esse cálculo foi feito por cientistas, usando mapas do relevo e da profundidade do fundo do mar.", v("world map globe")),
    ]),
    ("Um dia de seis meses", [
        ("Mesmo parada, a Terra continuaria dando a volta em torno do Sol, uma vez por ano.", v("sun space")),
        ("Então o Sol passaria a nascer e se pôr só uma vez por ano. Seriam seis meses de dia e seis meses de noite.", a("☀️", "6 meses de dia, 6 meses de noite")),
        ("Do lado de dia, o Sol esquentaria o chão sem parar, por meses. Do lado de noite, o frio seria de inverno polar, também por meses.", v("desert heat sun")),
        ("O ar quente do lado iluminado correria para o lado escuro, criando ventos constantes ao redor do planeta.", v("clouds timelapse")),
        ("Plantas e animais que dependem do ciclo de dia e noite teriam que se adaptar, ou desapareceriam.", v("sunflower field")),
    ]),
    ("Sem furacões e sem escudo", [
        ("O giro da Terra é o que faz os furacões girarem. Sem ele, as grandes tempestades não teriam aquele formato de redemoinho.", v("hurricane satellite")),
        ("E tem um problema mais sério. O campo magnético da Terra nasce do ferro derretido que se move lá no núcleo, e o giro do planeta ajuda a organizar esse movimento.", a("🧲", "O giro ajuda a manter o campo magnético")),
        ("Muitos cientistas acham que, sem rotação, esse campo ficaria bem mais fraco.", v("aurora borealis")),
        ("Ele é o nosso escudo contra as partículas que saem do Sol. Sem ele, mais radiação chegaria aqui, e as auroras poderiam aparecer em lugares onde hoje nunca aparecem.", v("northern lights")),
        ("Marte é um exemplo de planeta que perdeu o campo magnético: ao longo de bilhões de anos, o vento solar foi levando boa parte do ar dele.", v("mars planet")),
    ]),
    ("Você ficaria mais pesado", [
        ("E um detalhe curioso: hoje, no Equador, o giro da Terra deixa você um pouquinho mais leve.", v("bathroom scale")),
        ("É o mesmo efeito de um brinquedo de parque que gira: parece que algo te empurra para fora. Esse efeito diminui o seu peso em cerca de três décimos por cento.", v("carousel spinning")),
        ("Se a Terra parasse, uma pessoa de setenta quilos no Equador ia pesar uns duzentos e cinquenta gramas a mais.", a("⚖️", "70 kg → cerca de 70,25 kg")),
    ]),
    ("E se ela girasse mais rápido?", [
        ("E o contrário? Se a Terra girasse mais rápido, os dias ficariam mais curtos, e aquele efeito que empurra para fora ficaria mais forte.", v("earth rotating fast")),
        ("Se ela desse uma volta completa em pouco menos de uma hora e meia, quem estivesse no Equador ficaria praticamente sem peso, quase flutuando.", a("🪶", "1 volta a cada ~1h25 = sem peso no Equador")),
        ("Não é coincidência: a Estação Espacial Internacional dá uma volta na Terra em cerca de noventa minutos, e é justamente por isso que os astronautas flutuam lá dentro.", v("international space station")),
        ("E os oceanos se acumulariam ainda mais no Equador, invadindo as cidades da faixa do meio do planeta, enquanto os polos ficariam quase sem mar.", v("flooded city")),
    ]),
    ("A Terra está mesmo freando", [
        ("Agora a parte real: a Terra está, sim, girando cada vez mais devagar. E quem freia ela é a Lua.", v("full moon night")),
        ("A gravidade da Lua puxa os oceanos e forma as marés. O atrito dessas marés com o fundo do mar funciona como um freio bem fraquinho.", v("ocean tide beach")),
        ("Por causa disso, o dia fica cerca de dois milésimos de segundo mais longo a cada século.", a("⏱️", "+2 milésimos de segundo por século")),
        ("Parece nada, mas em milhões de anos faz diferença. No tempo dos dinossauros, um dia tinha cerca de vinte e três horas e meia.", v("dinosaur")),
        ("Mesmo assim, a Terra não vai parar. Muito antes disso, daqui a bilhões de anos, o Sol vai mudar, e a história do nosso planeta será outra.", v("sun surface")),
    ]),
    ("Final", [
        ("Então pode ficar tranquilo: a Terra continua girando, e a física garante que ela não vai parar de repente.", v("earth rotating")),
        ("Se você gostou, se inscreva no Física Sem Mistério e me conta nos comentários: o que você faria num dia de seis meses?", {"fim": True}),
    ]),
])

# ---------- o que aparece em cada cena (escolhido conferindo as imagens) ----------
# Sem entrada aqui: usa o clipe public/clipes_longo/ID_i.mp4 baixado pela "busca".
# foto = public/fotos/NOME.jpg (créditos em public/fotos/creditos.json); legenda = etiqueta "imagem real".
VIS = {
    "Tornado": {
        10: dict(foto="Tor_backlit", legenda="Funil começando a se formar, Estados Unidos"),
        11: dict(foto="Tor_parede", legenda="Nuvem-parede girando"),
        12: dict(foto="Tor_funil", legenda="Funil descendo até o chão"),
        13: dict(foto="Tor_cordell", legenda="Tornado em Cordell, Oklahoma, 1981"),
        14: dict(foto="Tor_enid", legenda="Tornado em Enid, Oklahoma"),
        21: dict(foto="Tor_moore", legenda="Tornado de Moore, Oklahoma, 3 de maio de 1999"),
        30: dict(foto="Tor_estrago", legenda="Casa destruída por um tornado (Estados Unidos, 2013)"),
        31: dict(foto="Tor_rb2", legenda="Rio Bonito do Iguaçu (PR), novembro de 2025"),
        32: dict(foto="Tor_rb1", legenda="Rio Bonito do Iguaçu (PR), depois do tornado"),
        40: dict(foto="Tor_vortex", legenda="Radar móvel de caçadores de tempestade"),
    },
    "TerraParar": {
        11: dict(foto="Ter_nascer", legenda="Nascer do Sol visto da Estação Espacial"),
        23: dict(foto="Ter_catarina", legenda="Furacão Catarina (2004), no sul do Brasil, visto do espaço"),
        25: dict(foto="Ter_aurora", legenda="Aurora vista da Estação Espacial"),
        27: dict(foto="Ter_marte", legenda="Marte"),
        31: dict(foto="Ter_bluemarble", legenda="A Terra vista pela Apollo 17"),
        33: dict(foto="Ter_iss", legenda="Estação Espacial Internacional"),
        38: dict(foto="Ter_trex", legenda="Esqueleto de Tyrannosaurus rex"),
    },
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
