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

longo("Meteoro", "O METEORO que acabou com os dinossauros ☄️ (e se cair outro?)",
      "Como uma pedra de 10 km vinda do espaço mudou a vida na Terra há 66 milhões de anos: a energia do impacto, a cratera de 180 km, "
      "o inverno que veio depois, como os cientistas descobriram, os meteoros de Chelyabinsk e Tunguska, as crateras do Brasil "
      "e o que a NASA já faz para desviar asteroides.", [
    ("Abertura", [
        ("Há sessenta e seis milhões de anos, uma pedra do tamanho de uma cidade caiu do céu e mudou a história da vida na Terra.", v("asteroid space")),
        ("Neste vídeo você vai entender o que aconteceu no dia em que os dinossauros acabaram, como os cientistas descobriram isso e se poderia acontecer de novo.", v("dinosaur skeleton museum")),
        ("E vamos ver meteoros de verdade, que caíram nos nossos dias e foram filmados.", v("meteor night sky")),
    ]),
    ("O dia do impacto", [
        ("O asteroide tinha uns dez quilômetros de largura, mais alto que o Monte Everest.", v("asteroid")),
        ("Ele vinha a cerca de vinte quilômetros por segundo. Nessa velocidade, atravessaria o Brasil de norte a sul em menos de quatro minutos.", a("☄️", "20 km por segundo")),
        ("Ele caiu onde hoje é a Península de Iucatã, no México, num mar raso.", v("mexico coast aerial")),
        ("A energia da batida foi a de bilhões de bombas atômicas juntas, num instante.", a("💥", "Bilhões de bombas atômicas")),
    ]),
    ("A cratera e o tsunami", [
        ("A pancada abriu uma cratera de cento e oitenta quilômetros de largura: a cratera de Chicxulub.", v("crater aerial")),
        ("A rocha do local virou vapor, e uma montanha de material foi jogada para fora da atmosfera.", v("explosion smoke cloud")),
        ("O impacto criou um tsunami gigantesco, com ondas de mais de cem metros, que atravessaram o Golfo do México.", v("huge ocean waves")),
        ("E um terremoto mais forte que qualquer um já registrado sacudiu o planeta.", v("earthquake damage")),
        ("Os pedaços que voltaram do espaço entraram na atmosfera pegando fogo, como milhões de estrelas cadentes. O céu ficou tão quente que florestas inteiras pegaram fogo.", v("forest fire night")),
    ]),
    ("O inverno que veio depois", [
        ("Mas o pior veio depois. Fuligem e enxofre ficaram no ar e cobriram o céu do planeta inteiro.", v("dark smoke sky")),
        ("A luz do Sol quase não chegava ao chão. Por meses, foi como uma noite sem fim, e a temperatura despencou.", v("dark cloudy sky")),
        ("E foi muito azar: a pedra caiu numa região cheia de rochas com enxofre. Isso jogou ainda mais gases no ar e deixou o inverno pior.", a("🍀", "Azar: rochas cheias de enxofre")),
        ("Um estudo calculou que, se ela tivesse caído em quase qualquer outro lugar da Terra, talvez os dinossauros tivessem sobrevivido.", a("🌍", "Em quase qualquer outro lugar, talvez sobrevivessem")),
        ("Sem luz, as plantas pararam de fazer fotossíntese. Sem plantas, morreram os animais que comiam plantas, e depois os que comiam esses animais.", a("🌱", "Sem luz, sem plantas, sem comida")),
        ("Cerca de três quartos das espécies da Terra desapareceram, incluindo todos os dinossauros que não voavam.", v("dinosaur fossil")),
        ("Sobreviveram os pequenos: mamíferos do tamanho de ratos e um grupo de dinossauros com penas, que hoje a gente chama de aves.", v("bird flying slow motion")),
        ("Sim: a galinha e o pardal são parentes diretos dos dinossauros.", v("chicken")),
    ]),
    ("Como os cientistas descobriram", [
        ("Por muito tempo, ninguém sabia por que os dinossauros sumiram. A pista apareceu numa camada fina de argila, na Itália.", v("rock layers cliff")),
        ("Em mil novecentos e oitenta, o físico Luis Alvarez e o filho Walter, geólogo, analisaram essa argila e acharam muito irídio, um metal raríssimo na crosta da Terra, mas comum em asteroides.", a("🔬", "Irídio: raro na Terra, comum em asteroides")),
        ("A mesma camada, com o mesmo irídio, foi achada no mundo inteiro, exatamente na época em que os dinossauros desapareceram.", v("geology rock strata")),
        ("Faltava a cratera. Ela estava enterrada embaixo de sedimentos no México, e foi confirmada em mil novecentos e noventa e um.", v("yucatan aerial")),
    ]),
    ("Meteoro, meteorito ou asteroide?", [
        ("Um asteroide é a pedra viajando pelo espaço.", v("asteroid space")),
        ("Quando ela entra na atmosfera e brilha, o rastro de luz se chama meteoro: a famosa estrela cadente.", v("shooting star")),
        ("E se sobra um pedaço que chega ao chão, esse pedaço se chama meteorito.", v("meteorite rock")),
        ("Ela brilha porque espreme o ar na frente com tanta força que esse ar esquenta a milhares de graus, como a bomba de encher pneu, que esquenta quando a gente aperta.", a("🔥", "Ar espremido esquenta a milhares de graus")),
        ("A maioria dessas pedras é do tamanho de um grão de areia e some a dezenas de quilômetros de altura.", v("meteor shower")),
    ]),
    ("Estrelas cadentes que você pode ver", [
        ("E dá para ver estrelas cadentes de graça. Em algumas noites do ano, aparecem dezenas por hora: são as chuvas de meteoros.", v("meteor shower night")),
        ("Elas acontecem quando a Terra passa pelo rastro de poeira deixado por um cometa. Cada grãozinho que entra na atmosfera vira um risco de luz.", a("☄️", "A Terra atravessa a poeira de um cometa")),
        ("As Perseidas aparecem em agosto, e as Geminídeas em dezembro. No Brasil, as Geminídeas e as Eta Aquáridas, em maio, costumam ser as melhores.", a("📅", "Agosto, dezembro e maio")),
        ("A dica é ir para longe das luzes da cidade, deitar, olhar para o céu e esperar uns vinte minutos para os olhos se acostumarem com o escuro.", v("person looking at stars night")),
        ("E não precisa de telescópio: meteoro se vê a olho nu.", v("starry night sky")),
    ]),
    ("Os meteoros dos nossos dias", [
        ("Em quinze de fevereiro de dois mil e treze, uma pedra de uns vinte metros entrou na atmosfera sobre Chelyabinsk, na Rússia.", v("meteor sky")),
        ("Por alguns segundos, o clarão foi mais forte que o Sol. Centenas de câmeras de carro filmaram tudo.", v("dashcam road winter")),
        ("Ela explodiu a uns trinta quilômetros de altura. A onda de choque chegou depois e quebrou janelas em milhares de prédios. Cerca de mil e quinhentas pessoas se feriram, a maioria com cacos de vidro.", v("broken window glass")),
        ("Em mil novecentos e oito, algo parecido explodiu sobre Tunguska, na Sibéria, e derrubou cerca de oitenta milhões de árvores, numa área maior que a cidade de São Paulo.", v("fallen trees forest")),
    ]),
    ("Crateras no mundo e no Brasil", [
        ("No Arizona, nos Estados Unidos, um meteorito de ferro de uns cinquenta metros abriu esta cratera, há cerca de cinquenta mil anos. Ela tem mais de um quilômetro de largura.", v("crater desert")),
        ("E o Brasil tem a maior cratera de impacto da América do Sul: o Domo de Araguainha, entre Mato Grosso e Goiás, com uns quarenta quilômetros de largura e mais de duzentos e cinquenta milhões de anos.", v("brazil cerrado aerial")),
        ("No Museu Nacional, no Rio de Janeiro, fica o Bendegó, um meteorito de mais de cinco toneladas achado na Bahia. Ele sobreviveu até ao incêndio do museu, em dois mil e dezoito.", v("museum")),
    ]),
    ("E se cair outro?", [
        ("Pedras pequenas caem o tempo todo. Uma do tamanho de um carro entra na atmosfera mais ou menos uma vez por ano, e quase sempre se desfaz antes de chegar ao chão.", v("night sky stars timelapse")),
        ("As do tamanho da que acabou com os dinossauros são raríssimas: uma a cada dezenas de milhões de anos.", a("📅", "Uma a cada dezenas de milhões de anos")),
        ("Telescópios do mundo inteiro vigiam o céu. Hoje, nenhum asteroide grande conhecido tem chance real de bater na Terra nos próximos cem anos.", v("observatory telescope night")),
        ("E em dois mil e vinte e dois, a NASA fez um teste: jogou a nave DART contra o asteroide Dimorfo, de propósito.", v("spacecraft space")),
        ("A batida encurtou em trinta e dois minutos a volta que ele dá em torno de outro asteroide. Foi a primeira vez que a humanidade mudou o caminho de um corpo celeste.", a("🎯", "A primeira defesa planetária da história")),
    ]),
    ("Final", [
        ("Os dinossauros não tinham telescópios. Nós temos, e estamos aprendendo a desviar pedras do espaço.", v("milky way night sky")),
        ("Se você gostou, se inscreva no Física Sem Mistério e me conta nos comentários: você já viu uma estrela cadente?", {"fim": True}),
    ]),
])

longo("BuracoNegro", "BURACO NEGRO: o que acontece se você cair em um? 🕳️ (e a primeira foto de verdade)",
      "O que é um buraco negro, como ele nasce da morte de estrelas gigantes, o que aconteceria se você caísse em um, "
      "as primeiras fotos reais (M87 e o centro da Via Láctea), o gigante TON 618 e o que a física ainda não sabe sobre o que tem lá dentro.", [
    ("Abertura", [
        ("Existe um lugar no universo de onde nada consegue sair. Nem a luz.", v("black hole space")),
        ("Neste vídeo você vai entender o que é um buraco negro, como ele nasce, o que aconteceria se você caísse em um e como a gente conseguiu fotografar um deles.", v("galaxy space stars")),
        ("E no final, uma pergunta que nem a física sabe responder: o que tem lá dentro?", v("space nebula")),
    ]),
    ("A gravidade que prende a luz", [
        ("Jogue uma pedra para cima: ela volta. Quanto mais força, mais alto ela vai antes de cair.", v("throwing ball up")),
        ("Para escapar de vez da gravidade da Terra, um foguete precisa chegar a onze quilômetros por segundo. É a velocidade de escape.", v("rocket launch")),
        ("Quanto mais massa espremida num espaço pequeno, maior fica essa velocidade.", a("🪨", "Mais massa, mais apertada: gravidade mais forte")),
        ("Num buraco negro, a velocidade de escape passa da velocidade da luz, trezentos mil quilômetros por segundo. E nada é mais rápido que a luz. Por isso nada sai.", a("💡", "Nem a luz escapa")),
        ("Para a Terra virar um buraco negro, ela teria que ser espremida até o tamanho de uma bolinha de gude.", v("marbles")),
        ("E o Sol inteiro caberia numa bola de seis quilômetros, menor que muitos bairros.", v("sun surface")),
    ]),
    ("Como nasce um buraco negro", [
        ("A maioria nasce da morte de estrelas gigantes, com mais de vinte vezes a massa do Sol.", v("stars space")),
        ("Durante a vida, a estrela queima seu combustível, e a energia lá de dentro empurra para fora, segurando o próprio peso.", a("⭐", "A energia empurra para fora, a gravidade puxa para dentro")),
        ("Quando o combustível acaba, nada mais segura. O centro da estrela desaba sobre si mesmo em menos de um segundo.", a("💥", "O centro desaba em menos de um segundo")),
        ("As camadas de fora explodem numa supernova, que pode brilhar mais que uma galáxia inteira. E o que sobra no centro vira um buraco negro.", v("supernova explosion")),
    ]),
    ("O ponto sem volta", [
        ("A fronteira de um buraco negro se chama horizonte de eventos. Não é uma parede: é um ponto sem volta.", a("⭕", "Horizonte de eventos: o ponto sem volta")),
        ("Fora dele, ainda dá para escapar. Depois de cruzar, nem a luz volta.", v("whirlpool water")),
        ("E aqui vai um mito: buraco negro não é um aspirador que suga tudo pelo universo.", a("❌", "Não é um aspirador")),
        ("Se o Sol virasse um buraco negro com a mesma massa, a Terra continuaria girando na mesma órbita. Só ficaria escuro e muito frio.", v("earth space")),
    ]),
    ("Caindo num buraco negro", [
        ("Agora imagine que você cai num buraco negro, de pés para baixo.", v("astronaut space")),
        ("Seus pés estão mais perto dele que a cabeça, então são puxados com mais força. Essa diferença estica o seu corpo.", a("📏", "Os pés são puxados mais que a cabeça")),
        ("Os cientistas chamam isso, de verdade, de espaguetificação: você vira macarrão.", v("spaghetti")),
        ("Num buraco negro pequeno, você seria esticado antes mesmo de chegar ao horizonte. Num gigante, cruzaria o horizonte sem sentir nada de especial.", a("🕳️", "Pequeno: estica antes. Gigante: você nem percebe")),
        ("E quem estivesse olhando de longe veria uma coisa estranha: você ficando cada vez mais lento e mais vermelho, até parecer congelado na borda e sumir.", v("clock")),
        ("É a gravidade deixando o tempo mais lento, como no filme Interestelar, em que uma hora perto do buraco negro valia sete anos na Terra.", a("⏳", "1 hora lá = 7 anos aqui")),
    ]),
    ("A primeira foto de um buraco negro", [
        ("Se nem a luz sai, como tirar uma foto? O truque é fotografar o que está em volta.", v("radio telescope")),
        ("O gás que gira em volta do buraco negro fica tão quente que brilha. O buraco aparece como uma sombra no meio desse anel de luz.", a("💍", "Uma sombra num anel de luz")),
        ("Em dois mil e dezenove, oito radiotelescópios espalhados pelo mundo trabalharam juntos, como se fossem um único telescópio do tamanho da Terra.", v("radio telescope dish")),
        ("E saiu a primeira foto de um buraco negro: o da galáxia M87, a cinquenta e cinco milhões de anos-luz, com seis bilhões e meio de vezes a massa do Sol.", v("galaxy")),
        ("Em dois mil e vinte e dois veio a foto do buraco negro do centro da nossa própria galáxia, Sagitário A estrela, com quatro milhões de vezes a massa do Sol.", v("milky way")),
    ]),
    ("Como sabemos que eles existem", [
        ("Antes da foto, já havia provas. No centro da Via Láctea, estrelas dão voltas muito rápidas em torno de um ponto escuro e invisível.", v("milky way timelapse")),
        ("Uma delas passa a mais de sete mil quilômetros por segundo. Só um objeto muito pesado e muito pequeno segura uma estrela assim. Essa descoberta ganhou o Nobel de Física de dois mil e vinte.", a("🏆", "Nobel de Física 2020")),
        ("E em dois mil e quinze, um detector chamado LIGO sentiu o espaço tremer: eram ondas gravitacionais, vindas de dois buracos negros que se juntaram há mais de um bilhão de anos.", a("〰️", "Ondas gravitacionais: o espaço tremendo")),
    ]),
    ("O primeiro buraco negro encontrado", [
        ("O primeiro buraco negro descoberto se chama Cygnus X-1, na constelação do Cisne, a uns sete mil anos-luz daqui.", v("night sky constellation")),
        ("Ele chamou atenção nos anos sessenta porque soltava muitos raios X. Ali, uma estrela gigante dá voltas em torno de algo invisível, com umas vinte vezes a massa do Sol.", a("🔭", "Uma estrela girando em volta do nada")),
        ("O buraco negro puxa o gás da estrela vizinha. Esse gás forma um disco que gira muito rápido e esquenta a milhões de graus. Por isso brilha em raios X.", v("swirling gas space")),
        ("Stephen Hawking chegou a apostar que aquilo não era um buraco negro. Em mil novecentos e noventa, ele admitiu que tinha perdido a aposta.", a("🤝", "Hawking perdeu a aposta")),
    ]),
    ("Um buraco negro pode crescer?", [
        ("Pode. Buraco negro cresce comendo gás, estrelas e até outros buracos negros.", v("galaxy space")),
        ("Quando come muito, o gás em volta brilha tanto que vira um quasar, o tipo de objeto mais brilhante do universo, capaz de brilhar mais que mil galáxias juntas.", a("💡", "Quasar: mais brilhante que mil galáxias")),
        ("Alguns ainda disparam jatos de partículas quase na velocidade da luz, com milhares de anos-luz de comprimento. A galáxia M87 tem um jato assim, fotografado pelo Hubble.", v("space light beam")),
    ]),
    ("Os gigantes", [
        ("No centro de quase toda galáxia grande existe um buraco negro supermassivo.", v("spiral galaxy")),
        ("Um dos maiores já medidos se chama TON seiscentos e dezoito. Ele teria dezenas de bilhões de vezes a massa do Sol.", a("🕳️", "TON 618: dezenas de bilhões de sóis")),
        ("O horizonte dele é tão grande que caberia o nosso Sistema Solar inteiro lá dentro, com sobra.", v("solar system planets")),
        ("E às vezes um buraco negro engole uma estrela. Ela é esticada numa longa fita de gás, e o clarão aparece nos telescópios do outro lado do universo.", v("star space glow")),
    ]),
    ("O que tem lá dentro?", [
        ("E dentro do buraco negro? A teoria de Einstein diz que toda a massa vai parar num ponto infinitamente pequeno: a singularidade.", a("•", "A singularidade")),
        ("Mas a maioria dos físicos acha que isso é só sinal de que a teoria não funciona ali. Para entender, seria preciso juntar a relatividade com a física quântica, e ninguém conseguiu ainda.", a("❓", "Relatividade + quântica: ninguém juntou ainda")),
        ("Stephen Hawking mostrou que os buracos negros devem soltar um pouquinho de energia e um dia evaporar. Mas um do tamanho do Sol levaria muito mais tempo que a idade do universo.", v("space stars dark")),
        ("E o buraco branco, o contrário do buraco negro, de onde as coisas só sairiam? Ele aparece nas contas, mas ninguém nunca viu um.", a("⚪", "Buraco branco: só nas contas")),
    ]),
    ("Final", [
        ("E pode ficar tranquilo: o buraco negro conhecido mais perto da Terra está a mais de mil e quinhentos anos-luz. Nenhum vai engolir a gente.", v("night sky stars")),
        ("Se você gostou, se inscreva no Física Sem Mistério e me conta nos comentários: se pudesse, você chegaria perto de um buraco negro?", {"fim": True}),
    ]),
])

longo("Multigerador", "GERADOR de energia INFINITA? 🔋 O Multigerador Quântico e o que mudaria SE funcionasse",
      "O que foi anunciado no lançamento do Multigerador de Energia Quântica (Dakila, Corguinho-MS, 11/10/2026), como os organizadores dizem que "
      "ele funciona, o que mudaria no mundo se desse certo, o que a física diz sobre máquinas que se alimentam sozinhas e como um invento desses pode ser comprovado.", [
    ("Abertura", [
        ("Imagine uma máquina que gera a própria energia, sem tomada, sem combustível e sem sol. Uma conta de luz que nunca mais chega.", v("electric meter")),
        ("No dia onze de outubro, um grupo de Mato Grosso do Sul apresentou ao vivo um equipamento que promete exatamente isso: o Multigerador de Energia Quântica.", v("power lines sunset")),
        ("Neste vídeo você vai ver o que foi anunciado, como dizem que ele funciona, o que mudaria no mundo se desse certo, e o que a física diz sobre uma máquina assim.", v("electricity sparks")),
    ]),
    ("O que foi anunciado", [
        ("O lançamento foi feito pelo Ecossistema Dakila, um grupo de pesquisa fundado por Urandir Fernandes de Oliveira, na sede do grupo em Corguinho, perto de Campo Grande.", v("brazil countryside aerial")),
        ("Segundo os organizadores, mais de mil pessoas, de vários estados e de outros países, foram até lá ver a apresentação, que também foi transmitida ao vivo na internet.", v("crowd event night")),
        ("O projeto é coordenado por Elton Marques, tem a participação do engenheiro eletricista Severiano Castelo e foi feito em parceria com uma empresa chamada S e S Tecnologia.", v("engineer electrical panel")),
        ("O grupo diz que a ideia foi inspirada nos estudos de Nikola Tesla, o inventor que ajudou a criar a energia elétrica que usamos hoje nas tomadas.", v("tesla coil")),
        ("E a promessa é ambiciosa: um gerador que, um dia, poderia mover carros, aviões e até abastecer a rede elétrica. A previsão divulgada é começar a vender em março do ano que vem.", v("electric car charging")),
    ]),
    ("Como dizem que ele funciona", [
        ("Pelo que foi divulgado, tudo começa num banco de capacitores, peças que guardam energia elétrica, como uma bateria que carrega e descarrega muito rápido.", v("capacitors electronics")),
        ("Essa energia passa por circuitos de controle, com tensão de duzentos e vinte volts, a mesma da tomada de muitas casas.", v("electrical circuit board")),
        ("Ela liga um motor elétrico de cerca de dois quilowatts. O motor gira um volante, uma roda pesada de metal, que move polias e correias.", v("electric motor spinning")),
        ("As correias giram um alternador de sete vírgula cinco quilowatts, a mesma peça que gera eletricidade no motor do carro, só que maior.", v("car alternator")),
        ("A ideia central é a retroalimentação: parte da energia que o alternador gera volta para recarregar o sistema, e o resto sobraria para ser usado fora.", a("🔁", "Parte da energia volta para o próprio sistema")),
        ("O grupo também fala em uma entrada chamada energia solar artificial, que ajudaria a manter o giro, e num sistema de frequências programáveis. Esses detalhes ainda não foram explicados.", v("laboratory equipment")),
        ("No site oficial, os dados de desempenho aparecem como em breve. Até agora, nenhuma medição foi publicada.", a("📄", "Dados de desempenho: \"em breve\"")),
    ]),
    ("E se der certo?", [
        ("Agora vamos imaginar: e se funcionar exatamente como prometido? O mundo mudaria de um jeito que é difícil até de imaginar.", v("city lights night aerial")),
        ("A conta de luz das casas simplesmente acabaria. Cada família teria um gerador em casa, sem depender de usina nem de fio.", v("family home living room")),
        ("Os carros elétricos rodariam sem parar para recarregar. Caminhões, ônibus e navios deixariam de queimar diesel.", v("electric car driving")),
        ("Um avião poderia voar dias sem pousar para abastecer, e o preço das passagens despencaria.", v("airplane flying clouds")),
        ("Comunidades isoladas da Amazônia, que hoje dependem de geradores a diesel trazidos de barco, teriam energia de graça, todos os dias.", v("amazon river village")),
        ("O petróleo e o carvão perderiam o sentido. Seria a maior queda de poluição da história, e uma chance real contra o aquecimento global.", v("coal power plant smoke")),
        ("Com energia sem limite, daria até para transformar água do mar em água potável em qualquer lugar do planeta, acabando com a falta d'água.", v("desalination plant")),
        ("E os países que vivem de vender petróleo teriam que mudar toda a sua economia. Seria a maior revolução desde a invenção da eletricidade.", v("oil rig sea")),
    ]),
    ("O grande desafio: a lei da energia", [
        ("Mas aqui entra a lei mais testada de toda a física: a conservação da energia. Energia não se cria do nada nem desaparece. Ela só muda de forma.", a("⚖️", "Energia não se cria: só muda de forma")),
        ("O motor transforma eletricidade em movimento. O alternador transforma movimento de volta em eletricidade. E em cada etapa, uma parte vira calor, no atrito, nas correias e nos fios.", v("machine gears rotating")),
        ("Um bom motor aproveita uns noventa por cento. Um alternador, uns oitenta e cinco. As correias perdem mais um pouco.", a("🔥", "Cada etapa perde energia em calor")),
        ("Então um motor que consome dois quilowatts faz o alternador entregar, no máximo, uns um vírgula cinco. Os sete vírgula cinco da etiqueta são o limite que o alternador aguenta, não o que ele produz.", a("🔌", "2 kW entram → cerca de 1,5 kW saem")),
        ("Quanto mais voltas a energia dá dentro da máquina, mais ela perde. Sem uma fonte de fora, o sistema vai parando aos poucos.", v("spinning wheel slowing")),
    ]),
    ("Já tentaram antes", [
        ("A ideia de uma máquina que se move sozinha para sempre tem nome: moto-perpétuo. E ela é muito mais antiga do que parece.", v("old clock mechanism")),
        ("Por volta do ano mil cento e cinquenta, o matemático indiano Bhaskara descreveu uma roda que giraria para sempre. Ela nunca girou sozinha.", a("☸️", "Roda de Bhaskara, ano 1150")),
        ("Leonardo da Vinci desenhou várias dessas rodas. E foi ele mesmo que concluiu que nenhuma funcionaria.", a("📜", "Da Vinci: \"não funciona\"")),
        ("Em mil setecentos e setenta e cinco, a Academia de Ciências de Paris decidiu nem analisar mais pedidos de moto-perpétuo. Eram muitos, e nenhum funcionava.", a("🏛️", "Paris, 1775: pedidos recusados")),
        ("Até hoje, o escritório de patentes dos Estados Unidos pede um modelo funcionando para analisar esse tipo de invento. Em séculos, nenhum passou no teste.", a("📑", "Patente só com modelo funcionando")),
    ]),
    ("Como provar que funciona", [
        ("Se o Multigerador funcionar, existe um jeito simples de provar: medir a energia que entra e a que sai.", v("multimeter measuring")),
        ("Seria só desligar qualquer fonte de fora, ligar uma carga, como lâmpadas ou um chuveiro, e deixar a máquina trabalhando sozinha por dias, com medidores ligados o tempo todo.", v("light bulbs glowing")),
        ("O teste teria que ser repetido por laboratórios independentes, como os de universidades, que não têm ligação com o grupo.", v("university laboratory")),
        ("Se a energia que sai for maior que a que entra, sem nenhuma fonte escondida, seria a maior descoberta da história da ciência. Valeria um prêmio Nobel.", a("🏆", "Seria a maior descoberta da história")),
        ("Até que isso aconteça, a física pede o que pede para qualquer descoberta: provas que qualquer um possa repetir.", v("scientist microscope")),
    ]),
    ("Energias novas que já funcionam", [
        ("Enquanto isso, existem novidades reais em energia acontecendo agora. A fusão nuclear, a mesma energia do Sol, bateu recordes em reatores na China e na França.", v("plasma glowing")),
        ("Nos Estados Unidos, uma usina nova começou a gerar energia a partir do calor das rochas, a quilômetros de profundidade.", v("geothermal power plant")),
        ("E a energia solar fica mais barata a cada ano. Nenhuma delas cria energia do nada: todas tiram energia de algum lugar.", v("solar panels field")),
    ]),
    ("Final", [
        ("Se o Multigerador passar nos testes independentes, a gente volta aqui para contar. A física adora ser surpreendida, desde que com provas.", v("power lines sunset", 4)),
        ("Se você gostou, se inscreva no Física Sem Mistério e me conta nos comentários: você acredita que um gerador assim pode existir?", {"fim": True}),
    ]),
])

longo("Apagao", "E se o Brasil ficasse 3 dias SEM ENERGIA? ⚡ (e por que um apagão derruba o país inteiro)",
      "Por que uma falha em um único lugar pode apagar quase o Brasil inteiro em segundos? A física da rede elétrica, o equilíbrio dos 60 hertz, "
      "o efeito dominó, os apagões de 2009, 2023 e 2025, o que aconteceria hora a hora em três dias sem energia, o caso real do Amapá "
      "e como se religa um país inteiro.", [
    ("Abertura", [
        ("Imagine acordar e não ter luz. Nem no seu bairro, nem na sua cidade: em quase todo o Brasil.", v("city blackout night")),
        ("Neste vídeo você vai entender por que uma falha num único lugar consegue apagar o país inteiro em segundos, e o que aconteceria se a energia sumisse por três dias.", v("power lines sunset")),
        ("E vamos ver o lugar do Brasil onde isso aconteceu de verdade.", v("dark street night")),
    ]),
    ("O dia em que o Brasil apagou", [
        ("Em novembro de dois mil e nove, uma tempestade derrubou as linhas que trazem a energia de Itaipu. Dezoito estados ficaram no escuro.", v("lightning storm night")),
        ("Em agosto de dois mil e vinte e três, foi pior: numa manhã de terça-feira, vinte e cinco estados e o Distrito Federal perderam energia ao mesmo tempo.", v("traffic lights off city")),
        ("E em outubro de dois mil e vinte e cinco, um incêndio numa subestação no Paraná apagou cerca de vinte estados de madrugada.", v("electrical substation")),
        ("Em todos esses casos, a falha começou num único ponto. Para entender como ela se espalha, a gente precisa ver como a energia chega até a sua tomada.", v("electric outlet")),
    ]),
    ("Como a energia chega na sua tomada", [
        ("Quase todo o Brasil está ligado numa única rede gigante, o Sistema Interligado Nacional.", v("transmission towers aerial")),
        ("São quase cento e oitenta mil quilômetros de linhas de transmissão. Dá para dar mais de quatro voltas na Terra.", v("power lines landscape")),
        ("Boa parte da energia vem de usinas hidrelétricas, que ficam longe das grandes cidades.", v("hydroelectric dam")),
        ("A energia de Belo Monte, no Pará, viaja mais de dois mil quilômetros até o Sudeste, por linhas de altíssima tensão.", v("high voltage lines")),
        ("A vantagem de tudo estar ligado é que uma região ajuda a outra. A desvantagem é que um problema também pode viajar pela rede inteira.", a("🕸️", "Tudo ligado: uma região ajuda a outra")),
    ]),
    ("O equilíbrio dos 60 hertz", [
        ("A energia elétrica quase não é guardada. Ela precisa ser gerada no mesmo instante em que é usada.", v("light bulb turning on")),
        ("Cada vez que alguém liga um chuveiro, alguma usina precisa gerar um pouquinho mais, naquele mesmo segundo.", v("electric shower")),
        ("Os geradores das usinas giram todos sincronizados, como uma orquestra. É esse giro que faz a corrente ir e voltar sessenta vezes por segundo: os sessenta hertz.", v("power plant turbine")),
        ("Se o consumo fica maior que a geração, os geradores perdem um pouco de velocidade e a frequência cai.", a("⚖️", "Consumo maior que geração: a frequência cai")),
        ("E os aparelhos e as usinas só aguentam uma variação muito pequena. É aí que começa o perigo.", a("〰️", "60 Hz: quase sem margem")),
    ]),
    ("O efeito dominó", [
        ("Quando uma linha importante cai, a energia que passava por ela tenta seguir por outros caminhos, que ficam sobrecarregados.", v("power lines storm")),
        ("Para não queimar, os equipamentos de proteção desligam essas linhas também. E a sobrecarga pula para as próximas.", a("🧱", "Uma cai, sobrecarrega a outra, que também cai")),
        ("Para segurar o resto do país, o sistema desliga bairros e cidades inteiras de propósito, em segundos. É um sacrifício para não perder tudo.", v("city lights going off")),
        ("Foi assim em dois mil e vinte e três: uma falha no Ceará virou um apagão em quase todo o Brasil em menos de um minuto.", a("⏱️", "Do Ceará ao Brasil em menos de 1 minuto")),
    ]),
    ("E se faltasse energia por 3 dias: as primeiras horas", [
        ("Agora imagine que a energia não volta. Nos primeiros minutos, param os elevadores, os semáforos e o metrô.", v("subway train station")),
        ("As torres de celular têm baterias, mas elas duram só algumas horas. Depois disso, o sinal some e a internet cai.", v("cell tower")),
        ("Nos prédios, a água chega até a caixa por bombas elétricas. Quando a caixa esvazia, a torneira seca.", v("water tap dripping")),
        ("Sem energia, o pagamento com cartão e com Pix para de funcionar. Quem não tem dinheiro vivo não consegue comprar nada.", v("credit card payment")),
        ("E à noite, as cidades ficam escuras como no tempo em que não existia eletricidade.", v("dark city night")),
    ]),
    ("O segundo dia", [
        ("A geladeira fechada segura o frio por umas quatro horas. O congelador cheio aguenta uns dois dias, porque o gelo ajuda a manter a temperatura.", v("refrigerator food")),
        ("Os postos de combustível também precisam de energia: a gasolina é puxada dos tanques por bombas elétricas.", v("gas station")),
        ("Sem combustível, caminhões param, e começa a faltar comida fresca nos mercados.", v("supermarket shelves")),
        ("As estações que tratam e bombeiam a água das cidades também param. Muitos bairros ficam sem água na torneira.", v("water treatment plant")),
    ]),
    ("O terceiro dia", [
        ("Os hospitais têm geradores a diesel, mas eles funcionam só enquanto houver combustível para abastecê-los.", v("hospital corridor")),
        ("Remédios que precisam de geladeira, como a insulina, começam a estragar.", v("insulin pen")),
        ("Sem bombas, o esgoto também para de ser levado embora. Três dias sem energia viram um problema de saúde.", v("city street rain")),
        ("Por isso a energia elétrica é considerada um serviço essencial: quase tudo depende dela.", a("🔌", "Quase tudo depende da energia")),
    ]),
    ("Isso já aconteceu: o Amapá", [
        ("Em novembro de dois mil e vinte, um incêndio atingiu a principal subestação do Amapá.", v("fire night")),
        ("Treze dos dezesseis municípios do estado ficaram sem energia. A maior parte da população ficou totalmente no escuro por quatro dias.", v("candle light dark room")),
        ("Faltou água, as filas nos postos de gasolina viraram quilômetros e muita gente perdeu toda a comida.", v("queue people")),
        ("Depois disso, ainda foram cerca de três semanas de rodízio, com energia só algumas horas por dia.", a("🕯️", "4 dias no escuro + 3 semanas de rodízio")),
    ]),
    ("E na Europa?", [
        ("Isso não acontece só aqui. Em abril de dois mil e vinte e cinco, Espanha e Portugal apagaram quase inteiros, no meio do dia.", v("madrid street")),
        ("Trens pararam no meio do caminho, pessoas ficaram presas em elevadores, e o trânsito virou um caos sem semáforos.", v("train station people waiting")),
        ("Em poucos segundos, a rede perdeu o equilíbrio e as proteções foram desligando tudo, no mesmo efeito dominó.", a("🇪🇸", "Espanha e Portugal: apagão em segundos")),
    ]),
    ("Como se preparar", [
        ("Não precisa ter medo, mas vale ter algumas coisas em casa.", v("flashlight dark")),
        ("Uma lanterna com pilhas é melhor que vela: vela acesa em casa escura é uma das maiores causas de incêndio durante apagões.", v("flashlight batteries")),
        ("Água guardada, um pouco de dinheiro vivo e um carregador portátil com bateria cheia ajudam muito nos primeiros dias.", v("power bank charging phone")),
        ("E um rádio a pilha: quando o celular e a internet caem, é por ele que chegam as notícias.", v("old radio")),
    ]),
    ("Como religar um país inteiro", [
        ("Religar a rede não é só apertar um botão. Se todo mundo voltar ao mesmo tempo, a rede cai de novo.", v("control room screens")),
        ("Primeiro ligam as usinas que conseguem partir sozinhas, sem energia de fora. As hidrelétricas são ótimas nisso.", v("hydroelectric dam water")),
        ("Depois, os operadores religam as linhas aos poucos, cidade por cidade, sempre segurando o equilíbrio dos sessenta hertz.", a("🧩", "Religa aos poucos, cidade por cidade")),
        ("Em dois mil e vinte e três, quase todo o país já tinha energia de volta em algumas horas.", v("city lights night timelapse")),
    ]),
    ("Final", [
        ("Um apagão de três dias no Brasil inteiro é muito improvável. Mas entender a física da rede ajuda a ver por que ela é tão poderosa, e tão frágil.", v("power lines sunset", 5)),
        ("Se você gostou, se inscreva no Física Sem Mistério e me conta nos comentários: você já ficou muito tempo sem energia? Como foi?", {"fim": True}),
    ]),
])

longo("ElNino", "SUPER EL NIÑO: o monstro do Pacífico que já está chegando ao Brasil 🌊🔥",
      "O El Niño de 2026 é o mais forte já medido para esta época do ano. Como uma faixa do Oceano Pacífico só 3 graus mais quente, do outro lado do mundo, "
      "muda a chuva e o calor no Brasil inteiro: os ventos alísios, a água quente que atravessa o oceano, por que o Sul alaga e o Norte seca, "
      "as ondas de calor, os El Niños de 1982, 1997 e 2015 e quando ele vai embora.", [
    ("Abertura", [
        ("Do outro lado do mundo, no meio do Oceano Pacífico, uma mancha de água quente maior que o Brasil está crescendo.", v("pacific ocean aerial")),
        ("Ela é tão poderosa que consegue trazer enchentes para o Sul, secar os rios da Amazônia e esquentar o seu verão.", v("flood street rain")),
        ("Ela se chama El Niño. E o deste ano está quebrando recordes. Neste vídeo você vai entender a física desse monstro.", v("ocean waves storm")),
    ]),
    ("O monstro acordou", [
        ("Em junho de dois mil e vinte e seis, a Organização Meteorológica Mundial confirmou: o El Niño tinha começado.", v("weather satellite earth")),
        ("Em poucos meses, a água no centro do Pacífico ficou mais de três graus acima do normal. É o El Niño mais forte já medido para esta época do ano.", v("tropical ocean sun")),
        ("Os cientistas chamam isso de El Niño muito forte. O apelido é Super El Niño.", v("ocean surface sunlight")),
        ("E o pico ainda nem chegou: ele deve ficar ainda mais forte até dezembro e pode ser o maior desde mil novecentos e cinquenta, quando as medições começaram.", a("📈", "Pico em novembro e dezembro")),
    ]),
    ("Um nome que veio do Natal", [
        ("O nome é espanhol e quer dizer o menino. Quem batizou foram os pescadores do Peru, há mais de cem anos.", v("fishing boats harbor")),
        ("Eles percebiam que, em alguns anos, o mar perto da costa esquentava por volta do Natal, a época do Menino Jesus.", v("fisherman boat sea")),
        ("E quando o mar esquentava, os peixes sumiam. Os pescadores não sabiam, mas estavam vendo um fenômeno que mexe com o planeta inteiro.", v("empty fishing nets")),
    ]),
    ("O Pacífico num ano normal", [
        ("Para entender o El Niño, primeiro a gente precisa ver como o Pacífico funciona num ano normal.", v("pacific ocean waves")),
        ("Perto da linha do Equador, sopram os ventos alísios, sempre do leste para o oeste, da América do Sul em direção à Ásia.", v("palm trees wind beach")),
        ("Esses ventos empurram a água quente da superfície para o outro lado do oceano, perto da Indonésia e da Austrália.", a("🌬️", "Os alísios empurram a água quente para a Ásia")),
        ("A água se acumula tanto que o mar lá fica uns cinquenta centímetros mais alto do que aqui do lado da América.", v("indonesia beach")),
        ("E na costa do Peru, para ocupar o lugar da água que foi embora, sobe água fria do fundo do mar, cheia de nutrientes. É por isso que lá tem tanto peixe.", v("school of fish underwater")),
    ]),
    ("Quando o vento cansa", [
        ("Em alguns anos, os ventos alísios enfraquecem. E aí a água quente que estava presa do lado da Ásia começa a voltar.", v("calm ocean surface")),
        ("Ela atravessa o Pacífico como uma onda gigante e lenta, que quase não se vê na superfície. Os cientistas chamam de onda de Kelvin.", a("🌊", "A água quente volta para o leste")),
        ("Essa onda leva uns dois meses para cruzar o oceano, e quando chega, a água fria do Peru fica coberta por uma camada quente.", v("warm ocean water")),
        ("E tem um detalhe que deixa tudo pior: com o mar mais quente do lado da América, o vento enfraquece ainda mais. Um alimenta o outro.", a("🔁", "Mar quente enfraquece o vento, que esquenta o mar")),
    ]),
    ("Por que três graus é tanta coisa", [
        ("Três graus parece pouco. No seu copo de água, você nem sentiria. Mas no oceano é outra história.", v("glass of water")),
        ("A água guarda muito calor. Só os três primeiros metros do oceano guardam tanto calor quanto a atmosfera inteira da Terra.", v("ocean underwater sunlight")),
        ("Agora imagine milhões de quilômetros quadrados de mar, mais quentes que o normal, soltando esse calor para o ar.", v("ocean aerial view")),
        ("Mar mais quente evapora mais. O vapor sobe, vira nuvens gigantes de tempestade, e o lugar das chuvas no planeta muda.", v("storm clouds over ocean")),
    ]),
    ("Como o calor atravessa o mundo", [
        ("A atmosfera funciona como uma esteira gigante. Onde o ar quente sobe, formam-se nuvens e chove. Onde o ar desce, o céu fica limpo e seco.", v("cumulonimbus cloud timelapse")),
        ("Com o El Niño, a grande região de ar subindo se muda para o meio do Pacífico. E o ar que sobe lá tem que descer em algum lugar.", a("🔄", "O ar sobe no Pacífico e desce sobre a Amazônia")),
        ("Uma parte desce justamente sobre a Amazônia e o Nordeste. Ar descendo impede as nuvens de crescer, e a chuva diminui.", v("dry cracked earth")),
        ("Ao mesmo tempo, um rio de vento lá no alto, a corrente de jato, fica mais forte e segura as frentes frias em cima do Sul do Brasil.", v("clouds moving fast sky")),
    ]),
    ("O que muda no Brasil", [
        ("O resultado é um Brasil dividido. No Sul, as frentes frias ficam paradas e a chuva não para: o risco de enchente aumenta muito.", v("heavy rain flood")),
        ("No Norte e no Nordeste, falta chuva. Em dois mil e vinte e três, durante o último El Niño, o Rio Negro, em Manaus, chegou ao nível mais baixo em mais de cem anos.", v("dry river boats")),
        ("Barcos ficaram encalhados, comunidades ficaram isoladas e a água dos lagos esquentou tanto que botos morreram.", v("amazon river")),
        ("E no Sudeste e no Centro-Oeste, o que mais aparece é o calor: dias seguidos muito acima da média.", v("hot sun city")),
    ]),
    ("As ondas de calor", [
        ("Uma onda de calor é quando a temperatura fica bem acima do normal por vários dias seguidos.", v("thermometer heat")),
        ("O nosso corpo se resfria suando: o suor evapora e leva o calor da pele embora.", v("sweating man sun")),
        ("Mas quando o ar está quente e úmido ao mesmo tempo, o suor quase não evapora. O corpo perde o seu principal jeito de se resfriar.", a("💧", "Calor + umidade: o suor não evapora")),
        ("Por isso, nas ondas de calor, vale beber água antes de sentir sede, evitar o sol do meio do dia e cuidar dos idosos e das crianças.", v("drinking water bottle")),
    ]),
    ("O mundo inteiro sente", [
        ("O El Niño mexe com o planeta todo. Em setembro de dois mil e vinte e seis, não se formou nenhum furacão no Oceano Atlântico, algo que não acontecia desde mil novecentos e catorze.", v("hurricane satellite")),
        ("Enquanto isso, no Pacífico, os furacões se multiplicaram. No Peru e no Equador, chove forte até no deserto.", v("desert rain")),
        ("Já a Austrália e a Indonésia, que normalmente recebem a água quente, ficam com seca e incêndios florestais.", v("bushfire australia")),
        ("E como o oceano solta tanto calor, os anos de El Niño forte costumam bater recordes de temperatura no planeta inteiro.", v("sun heat haze")),
    ]),
    ("Os monstros do passado", [
        ("Esse não é o primeiro Super El Niño. Os de mil novecentos e oitenta e dois e de mil novecentos e noventa e sete foram gigantes.", v("old weather station")),
        ("No de noventa e sete, satélites mostraram pela primeira vez, com detalhes, a mancha quente se espalhando pelo Pacífico.", v("satellite orbit earth")),
        ("E o de dois mil e quinze ajudou a fazer de dois mil e dezesseis o ano mais quente que já tinha sido medido até então.", v("drought landscape")),
    ]),
    ("Energia e comida", [
        ("Lembra do nosso vídeo sobre o apagão? O El Niño também mexe com a energia.", v("hydroelectric dam")),
        ("Com menos chuva em algumas regiões, os reservatórios das hidrelétricas baixam. E com mais calor, todo mundo liga o ar-condicionado e o ventilador.", v("air conditioner")),
        ("Na agricultura, chuva demais no Sul e seca no Norte podem estragar safras e deixar a comida mais cara.", v("farm field drought")),
    ]),
    ("Quando ele vai embora", [
        ("Todo El Niño acaba. O deste ano deve chegar ao pico entre novembro e dezembro e enfraquecer no começo de dois mil e vinte e sete.", v("ocean sunset calm")),
        ("Quando os ventos alísios voltam com força, a água quente é empurrada de novo para a Ásia, e a água fria volta a subir no Peru.", a("🌬️", "Os alísios voltam e o Pacífico esfria")),
        ("Às vezes o Pacífico passa do ponto e esfria demais. Aí vem a irmã do El Niño, a La Niña, que traz quase o efeito contrário.", v("cold ocean waves")),
    ]),
    ("Final", [
        ("Uma mancha de água três graus mais quente, a milhares de quilômetros daqui, consegue mudar a chuva, o calor e até a conta de luz no Brasil. Isso é física.", v("pacific ocean aerial", 5)),
        ("Se você gostou, se inscreva no Física Sem Mistério e me conta nos comentários: como está o calor ou a chuva aí na sua cidade?", {"fim": True}),
    ]),
])

longo("SolExplodir", "O que aconteceria se o SOL EXPLODISSE? ☀️💥 (e o que vai acontecer de verdade)",
      "O que aconteceria com a Terra se o Sol explodisse agora: os 8 minutos de atraso da luz, a onda de choque hora a hora e o que aconteceria se ele simplesmente sumisse. "
      "Depois, a física de verdade: por que o Sol não tem massa para explodir, como ele vai virar uma gigante vermelha e uma anã branca, "
      "as supernovas reais de 1054 e 1987, a estrela Betelgeuse e por que o ferro do seu sangue veio de estrelas que explodiram.", [
    ("Abertura", [
        ("Se o Sol explodisse agora, neste exato segundo, você não ia perceber nada. O céu ia continuar azul, e o dia, normal.", v("sun sky clouds")),
        ("Por oito minutos e vinte segundos, tudo ia parecer tranquilo. Depois disso, a Terra teria poucas horas.", v("sunrise earth from space")),
        ("Neste vídeo você vai ver o que aconteceria, minuto a minuto, e o que a física diz que vai acontecer com o Sol de verdade.", v("solar flare sun surface")),
    ]),
    ("O que é o Sol", [
        ("O Sol é uma estrela comum, mas gigante para nós: dentro dele caberiam mais de um milhão de Terras.", v("sun close up")),
        ("Ele guarda quase toda a massa do Sistema Solar: noventa e nove vírgula oito por cento. Todos os planetas juntos são o resto.", a("☀️", "99,8% da massa do Sistema Solar")),
        ("No centro, a temperatura passa de quinze milhões de graus, e a pressão é tão grande que os átomos de hidrogênio se fundem e viram hélio.", v("plasma energy glow")),
        ("Essa fusão solta uma energia imensa. A cada segundo, o Sol transforma cerca de seiscentos milhões de toneladas de hidrogênio.", v("sun surface plasma")),
        ("E a energia que sai do centro leva milhares de anos para chegar à superfície. A luz que esquenta você hoje começou a viagem antes das pirâmides.", v("sunlight through trees")),
    ]),
    ("Os oito minutos de atraso", [
        ("A luz do Sol viaja a trezentos mil quilômetros por segundo. Mesmo assim, demora oito minutos e vinte segundos para chegar até aqui.", v("sunbeams clouds")),
        ("Isso quer dizer que você nunca vê o Sol como ele é agora, e sim como ele era oito minutos atrás.", v("sunset ocean horizon")),
        ("E não é só a luz. Até a gravidade do Sol, que segura a Terra em órbita, leva esses mesmos oito minutos para chegar.", a("🌍", "A gravidade também viaja na velocidade da luz")),
        ("Então, se o Sol explodisse, a Terra ia continuar girando em volta de um Sol que já não existe, sem saber de nada.", v("earth orbit space")),
    ]),
    ("O Sol pode explodir?", [
        ("Agora a boa notícia: o Sol não tem como explodir. Para uma estrela explodir, ela precisa de muita massa.", v("stars night sky timelapse")),
        ("Só as estrelas com mais de oito vezes a massa do Sol terminam numa explosão chamada supernova.", v("galaxy stars space")),
        ("No fim da vida, o centro dessas gigantes não aguenta o próprio peso e desaba em menos de um segundo. O resto da estrela é arremessado no espaço.", a("💥", "O centro desaba e a estrela é arremessada")),
        ("O Sol é pequeno demais para isso. Mas vamos imaginar que, por algum motivo, ele explodisse mesmo assim.", v("sun flare")),
    ]),
    ("Se ele explodisse mesmo", [
        ("Nos primeiros oito minutos, nada. Até que um clarão milhões de vezes mais forte que o Sol de sempre iluminaria metade do planeta.", v("bright light flash sky")),
        ("O lado da Terra virado para o Sol seria queimado no mesmo instante. Rios, florestas e a superfície do mar ferveriam.", v("forest fire")),
        ("Quem estivesse do lado da noite teria só algumas horas. A matéria da explosão viria a uns dez mil quilômetros por segundo.", v("night city lights")),
        ("Em umas quatro horas, essa onda chegaria aqui e arrancaria a atmosfera e os oceanos. A Terra, como a conhecemos, deixaria de existir.", v("earth atmosphere space")),
    ]),
    ("E se ele só sumisse?", [
        ("E se o Sol, em vez de explodir, simplesmente sumisse? Aí a história é mais lenta, e muito mais fria.", v("dark sky night")),
        ("Depois dos oito minutos, a Terra sairia em linha reta pelo espaço, como uma pedra que escapa de um estilingue.", a("🌍", "Sem a gravidade do Sol, a Terra segue em linha reta")),
        ("A temperatura despencaria: em cerca de uma semana, a média do planeta já estaria abaixo de zero.", v("frozen landscape snow")),
        ("Em um ano, passaria de setenta graus negativos. As plantas morreriam sem luz, e os oceanos congelariam por cima.", v("frozen lake ice")),
        ("Só ia sobrar vida perto das fontes quentes do fundo do mar, onde o calor vem de dentro da Terra, e não do Sol.", v("deep sea hydrothermal vent")),
    ]),
    ("O que vai acontecer de verdade", [
        ("Agora, o que vai acontecer de verdade. O Sol tem uns quatro bilhões e seiscentos milhões de anos. Ele está mais ou menos na metade da vida.", v("sun space")),
        ("Ele fica um pouquinho mais forte com o tempo. Daqui a um bilhão de anos, vai brilhar uns dez por cento mais, o suficiente para secar os oceanos da Terra.", v("dry cracked earth")),
        ("Daqui a uns cinco bilhões de anos, o hidrogênio do centro acaba. O Sol incha e vira uma gigante vermelha, centenas de vezes maior.", a("🔴", "O Sol vira uma gigante vermelha")),
        ("Ele vai engolir Mercúrio e Vênus. A Terra talvez escape por pouco, mas vai virar uma pedra torrada.", v("mercury planet")),
        ("Depois, ele solta as camadas de fora no espaço, formando uma nuvem colorida chamada nebulosa planetária.", v("nebula space")),
        ("O que sobra é o centro: uma anã branca, do tamanho da Terra e tão densa que uma colher de chá dela pesaria toneladas.", a("⚪", "Uma colher de anã branca pesaria toneladas")),
        ("Ela vai esfriar devagar por bilhões e bilhões de anos. Sem explosão nenhuma.", v("stars night sky")),
    ]),
    ("Explosões de verdade", [
        ("Mas supernovas de verdade acontecem, e a humanidade já viu algumas.", v("milky way night")),
        ("Em mil e cinquenta e quatro, astrônomos chineses anotaram uma estrela nova tão brilhante que dava para ver de dia, por vinte e três dias.", v("ancient chinese astronomy")),
        ("O que sobrou dela está lá até hoje: a Nebulosa do Caranguejo, ainda se espalhando pelo espaço.", v("nebula")),
        ("Em mil novecentos e oitenta e sete, uma estrela explodiu numa galáxia vizinha. Detectores no Japão captaram as partículas da explosão horas antes da luz chegar.", v("telescope observatory night")),
        ("E existe uma candidata famosa: Betelgeuse, a estrela avermelhada do ombro de Órion. Em dois mil e dezenove, o brilho dela caiu de repente, e muita gente achou que ia explodir.", v("orion constellation")),
        ("Era uma nuvem de poeira que ela mesma soltou. Mas um dia ela vai explodir, pode ser amanhã ou daqui a cem mil anos.", v("red star space")),
        ("Quando isso acontecer, ela vai brilhar quase como a Lua cheia e vai dar para ver até de dia. E nós estaremos seguros.", v("full moon night sky")),
    ]),
    ("Por que estamos seguros", [
        ("Para uma supernova fazer mal à Terra, ela teria que estar a menos de uns cinquenta anos-luz daqui.", a("🛡️", "Perigo só a menos de uns 50 anos-luz")),
        ("Betelgeuse fica a mais de quinhentos anos-luz. E não existe nenhuma estrela grande o bastante para explodir tão perto de nós.", v("stars space")),
        ("Além disso, a Terra tem um escudo: a atmosfera e o campo magnético, que barram boa parte da radiação que vem do espaço.", v("aurora borealis")),
    ]),
    ("Somos poeira de estrela", [
        ("E tem uma parte bonita nessa história. Os átomos do seu corpo vieram das estrelas.", v("starry sky person")),
        ("O cálcio dos seus ossos e o ferro do seu sangue foram feitos dentro de estrelas, há bilhões de anos, e espalhados pelo espaço quando elas morreram.", v("blood cells")),
        ("Sem estrelas explodindo, não existiria a Terra, nem você.", v("earth from space")),
    ]),
    ("Final", [
        ("Então pode ficar tranquilo: o Sol não vai explodir. Ele vai inchar, encolher e apagar devagar, daqui a bilhões de anos.", v("sunset sky", 3)),
        ("Se você gostou, se inscreva no Física Sem Mistério e me conta nos comentários: qual outro e se você quer ver aqui?", {"fim": True}),
    ]),
])

longo("AviaoPassageiro", "Por que o avião NÃO pode pousar cheio de combustível? ✈️ (e outras 6 dúvidas de PASSAGEIRO)",
      "As dúvidas de avião que mais se procuram, respondidas pela física: como uma máquina de centenas de toneladas voa, por que ela voa tão alto, "
      "o que é a turbulência (e por que ela não derruba o avião), por que ele pousa de lado, que risco branco é aquele no céu, "
      "por que não pode pousar cheio de combustível e se dá para abrir a porta em pleno voo.", [
    ("Abertura", [
        ("Esse avião pesa mais de trezentas toneladas e acabou de decolar. Mas, se precisar voltar agora, ele não pode pousar.", v("airplane takeoff runway")),
        ("Não é defeito: é física. E ela também explica a turbulência, o pouso de lado e aquele risco branco que fica no céu.", v("airplane window clouds")),
        ("Neste vídeo eu respondo as dúvidas de avião que mais se procuram no Brasil, uma por uma.", v("airport airplane taxiing")),
    ]),
    ("Como uma coisa tão pesada voa", [
        ("A primeira dúvida é a mais antiga: como uma máquina de centenas de toneladas fica no ar?", v("airplane flying sky")),
        ("O segredo está na asa. Ela é curvada e vai um pouco inclinada para cima, e assim empurra uma quantidade enorme de ar para baixo.", a("✈️", "A asa empurra o ar para baixo")),
        ("Pela terceira lei de Newton, se a asa empurra o ar para baixo, o ar empurra a asa para cima. Essa força se chama sustentação.", v("airplane wing flight")),
        ("Ao mesmo tempo, o ar passa mais rápido por cima da asa, e a pressão ali fica menor que embaixo. As duas coisas juntas seguram o avião.", v("condensation airplane wing")),
        ("Por isso o avião precisa de velocidade. Um jato grande só sai do chão perto de trezentos quilômetros por hora.", v("airplane takeoff speed")),
    ]),
    ("Por que ele voa tão alto", [
        ("Os aviões de passageiros voam a uns onze quilômetros de altura. Mais alto que o Monte Everest.", v("airplane above clouds")),
        ("Lá em cima, o ar é três vezes mais ralo. Tem menos ar para frear o avião, então ele gasta bem menos combustível.", a("🌬️", "Ar 3 vezes mais ralo: menos atrito")),
        ("E o voo fica acima da maior parte das nuvens e das tempestades, onde o ar costuma ser mais calmo.", v("cloudscape aerial")),
        ("Só que esse ar ralo não dá para respirar. Por isso a cabine é pressurizada: o avião bombeia ar para dentro e deixa a cabine como se estivesse no alto de uma serra.", v("airplane cabin passengers")),
    ]),
    ("Turbulência", [
        ("Agora, o momento que muita gente teme: a turbulência.", v("airplane turbulence cabin")),
        ("O ar não é parado. Ele forma correntes que sobem, descem e mudam de direção, como as ondas e os redemoinhos de um rio.", v("clouds timelapse")),
        ("Quando o avião passa por uma dessas correntes, ele sobe ou desce um pouco de repente. Não existe buraco no ar: é só o ar mudando de rumo.", a("🌀", "Não é buraco no ar: é corrente de ar")),
        ("A asa é feita para dobrar e aguentar muito mais força do que qualquer turbulência normal. Nos testes, ela entorta vários metros antes de quebrar.", v("airplane wing flex flight")),
        ("O perigo real é se soltar e bater a cabeça. Por isso a dica dos pilotos é simples: sentado, cinto sempre afivelado.", v("airplane seat belt")),
    ]),
    ("Por que ele pousa de lado", [
        ("Já viu um avião chegando torto na pista, quase de lado? Ele não está com problema.", v("airplane landing crosswind")),
        ("Quando o vento sopra de lado, ele empurra o avião para fora da pista. Então o piloto aponta o nariz um pouco contra o vento.", a("🧭", "O nariz aponta contra o vento")),
        ("O avião anda de lado, mas em linha reta sobre a pista. Pouco antes de tocar o chão, o piloto endireita tudo.", v("airplane landing")),
    ]),
    ("O risco branco no céu", [
        ("E aquele risco branco que fica no céu depois que o avião passa?", v("contrail sky")),
        ("Não é fumaça nem veneno. O motor solta vapor de água quente, e lá em cima faz uns quarenta graus negativos.", v("airplane contrail blue sky")),
        ("O vapor congela na hora e vira cristais de gelo: é uma nuvem fininha feita pelo próprio avião.", v("contrails sunset")),
    ]),
    ("Por que não pode pousar cheio", [
        ("Agora, a dúvida do título: por que o avião não pode pousar cheio de combustível?", v("airplane fuel truck")),
        ("Decolar é suave: o avião vai ganhando velocidade e sai do chão aos poucos. Pousar é um tranco: ele bate na pista a mais de duzentos quilômetros por hora.", v("airplane touchdown runway")),
        ("O trem de pouso e a estrutura são feitos para aguentar esse tranco só até um certo peso: o peso máximo de pouso.", a("⚖️", "Peso máximo de pouso")),
        ("Num Boeing 777, por exemplo, ele pode decolar com uns trezentos e cinquenta mil quilos, mas só pode pousar com uns duzentos e cinquenta mil. São cem toneladas de diferença.", a("⛽", "Decola com 350 t, pousa com 250 t")),
        ("Num voo normal, isso não é problema: o combustível vai sendo queimado durante a viagem e o avião chega leve.", v("airplane flying sunset")),
        ("O problema é quando ele precisa voltar logo depois de decolar, por um passageiro passando mal ou um aviso no painel.", v("airplane cockpit pilots")),
        ("Os aviões grandes têm uma solução: eles jogam combustível fora pelas pontas das asas, bem alto, e ele vira vapor antes de chegar ao chão.", v("airplane high altitude")),
        ("Os aviões menores não têm essa válvula. Eles ficam dando voltas no céu para gastar combustível, ou pousam pesados com muito cuidado e passam por uma inspeção depois.", v("airplane circling sky")),
    ]),
    ("Dá para abrir a porta em pleno voo?", [
        ("E a última: dá para abrir a porta do avião lá em cima? A resposta é não, nem com toda a força do mundo.", v("airplane door cabin")),
        ("Lembra da pressurização? O ar de dentro da cabine empurra a porta para fora com muito mais força que o ar ralo de fora.", a("🚪", "Pressão de dentro empurra a porta")),
        ("Essa diferença aperta a porta contra o batente com umas dez toneladas de força, como se houvesse um caminhão encostado nela.", a("🚚", "Umas 10 toneladas na porta")),
        ("E a porta é de encaixe: para abrir, ela primeiro tem que vir um pouco para dentro, justamente contra essa força. Só no chão, com a pressão igual, ela abre.", v("airplane door opening")),
    ]),
    ("Final", [
        ("Da asa empurrando o ar até a porta que ninguém consegue abrir, voar é física do começo ao fim. E é por isso que o avião é o meio de transporte mais seguro que existe.", v("airplane sunset sky", 2)),
        ("Se você gostou, se inscreva no Física Sem Mistério e me conta nos comentários: qual dúvida de avião você ainda tem?", {"fim": True}),
    ]),
])

longo("Quantica", "ENERGIA QUÂNTICA existe? ⚛️ O que é física quântica de verdade (e o que é só propaganda)",
      "Pulseira quântica, água quântica, terapia quântica, energia quântica: a palavra está em todo lugar. Neste vídeo, o que a física quântica é de verdade, "
      "de onde veio a palavra quântico, o salto quântico (que é minúsculo), as coisas estranhas do mundo dos átomos, a quântica que já está no seu celular, "
      "por que a pulseira não funciona, como reconhecer a propaganda e o que é um computador quântico de verdade.", [
    ("Abertura", [
        ("Pulseira quântica. Água quântica. Terapia quântica. Colchão quântico. Hoje parece que tudo é quântico.", v("bracelet wrist")),
        ("Mas a física quântica de verdade é uma das ideias mais estranhas e mais bem testadas da ciência. E ela não tem nada a ver com a maioria desses produtos.", v("atom animation")),
        ("Neste vídeo você vai entender o que é quântico de verdade, onde a quântica já está na sua mão, e como reconhecer quando a palavra é só propaganda.", v("smartphone hand")),
    ]),
    ("De onde veio a palavra", [
        ("Tudo começou em mil e novecentos, com um físico alemão chamado Max Planck, tentando explicar a cor da luz que sai de um metal muito quente.", v("hot metal glowing")),
        ("A única conta que funcionou foi esquisita: a energia da luz não sai de forma contínua, como água de uma torneira. Ela sai em pacotinhos.", a("📦", "A luz sai em pacotinhos de energia")),
        ("Em latim, quantidade se diz quantum. Por isso esses pacotinhos ganharam o nome de quanta, e a física deles virou física quântica.", a("⚛️", "Quantum = quantidade, pacote")),
        ("Cinco anos depois, Albert Einstein mostrou que a luz realmente chega em pacotes, que hoje chamamos de fótons. Foi por isso, e não pela relatividade, que ele ganhou o prêmio Nobel.", v("light rays sun")),
    ]),
    ("O salto quântico é minúsculo", [
        ("Você já ouviu alguém dizer que vai dar um salto quântico na vida, como se fosse um pulo gigante?", v("man jumping")),
        ("Na física, é o contrário. Dentro do átomo, o elétron só pode ficar em certos degraus de energia, nunca no meio do caminho.", a("🪜", "O elétron só fica em certos degraus")),
        ("Quando ele pula de um degrau para outro, ele solta ou absorve um fóton. Esse é o salto quântico: um dos menores pulos que existem no universo.", v("neon sign glowing")),
        ("E é por isso que cada gás brilha com uma cor só dele. O neon é vermelho alaranjado, o sódio dos postes antigos é amarelo.", v("neon lights night")),
    ]),
    ("O mundo estranho dos átomos", [
        ("No mundo dos átomos, as coisas não se comportam como bolinhas. Elas também se comportam como ondas.", v("water ripples")),
        ("Se você atira elétrons, um de cada vez, contra uma parede com duas fendas, eles formam do outro lado listras, como duas ondas se cruzando na água.", a("🌊", "Um elétron de cada vez forma listras")),
        ("Outra estranheza é o efeito túnel: uma partícula às vezes atravessa uma barreira que, pelas regras do dia a dia, ela não teria força para passar.", a("🚇", "Efeito túnel: atravessar a barreira")),
        ("É como uma bola que, de vez em quando, aparecesse do outro lado do muro sem pular. Com bolas, não acontece. Com elétrons, acontece o tempo todo.", v("ball wall")),
        ("E o efeito túnel é tão real que existe dentro do Sol: sem ele, o Sol nem conseguiria brilhar.", v("sun surface")),
    ]),
    ("A quântica que está no seu bolso", [
        ("Agora, a parte que pouca gente sabe: a física quântica de verdade está na sua mão neste momento.", v("smartphone hand")),
        ("O chip do celular tem bilhões de transistores, pecinhas que só funcionam porque os engenheiros entendem como os elétrons se comportam dentro do silício.", v("computer chip macro")),
        ("O laser, do leitor de código de barras do mercado à cirurgia de olho, nasceu direto da física quântica.", v("laser beam")),
        ("A lâmpada de LED e o painel solar também: os dois trocam eletricidade e luz, fóton por fóton.", v("solar panels")),
        ("A ressonância magnética, no hospital, enxerga dentro do corpo usando uma propriedade quântica dos núcleos dos átomos.", v("mri scanner hospital")),
        ("E o GPS do seu celular depende de relógios atômicos nos satélites, que medem o tempo pelos saltos quânticos dos átomos.", v("satellite orbit earth")),
        ("Então, sim, a quântica mudou o mundo. Só que ela mudou o mundo dentro de chips, lasers e hospitais, e não dentro de uma pulseira.", v("electronics circuit board")),
    ]),
    ("Onde a palavra virou propaganda", [
        ("Por que, então, tanta coisa usa a palavra quântico para vender?", v("shopping mall")),
        ("Porque quântico soa moderno, misterioso e científico. E quase ninguém sabe exatamente o que significa.", a("🏷️", "\"Quântico\" soa científico e vende")),
        ("Mas existe um motivo forte para a pulseira não fazer nada: os efeitos quânticos são muito frágeis.", v("bracelet wrist")),
        ("Eles aparecem com clareza em coisas muito pequenas, muito isoladas, e muitas vezes muito frias. No calor e no barulho de um corpo humano, eles se desfazem num piscar de olhos.", a("🌡️", "No calor do corpo, os efeitos quânticos somem")),
        ("Os físicos chamam isso de decoerência. É o motivo pelo qual você nunca vai ver uma pessoa atravessar uma parede por efeito túnel.", v("brick wall")),
        ("E tem um caso famoso. Em dois mil e dez, uma marca de pulseira muito vendida no mundo inteiro teve que admitir, na Austrália, que não tinha nenhuma prova científica do que prometia.", a("⚖️", "2010: a pulseira sem provas")),
        ("Quando a pulseira foi testada contra uma pulseira falsa, igualzinha, as pessoas se saíram do mesmo jeito com as duas. O efeito estava na cabeça, não no pulso.", v("people balance test")),
    ]),
    ("E energia quântica, existe?", [
        ("E energia quântica? Não existe um tipo de energia chamado energia quântica.", a("⚡", "Não existe uma \"energia quântica\" à parte")),
        ("Toda energia, a da tomada, a do Sol, a da comida, segue as regras da quântica no mundo dos átomos. Quântico descreve como a energia funciona, não é uma energia diferente.", v("power lines sunset")),
        ("E nenhuma regra da quântica permite criar energia do nada. A conservação da energia vale também no mundo dos átomos.", v("electricity sparks")),
    ]),
    ("Como reconhecer a propaganda", [
        ("Então, como saber se um produto quântico é ciência ou propaganda? Fique de olho em quatro sinais.", v("magnifying glass")),
        ("Primeiro: promete curar ou resolver quase tudo. Dor, ansiedade, cansaço, sono. Coisa de verdade costuma servir para uma coisa só.", a("1️⃣", "Promete resolver quase tudo")),
        ("Segundo: fala em frequência, vibração e energia, mas não diz qual número, nem como foi medido.", a("2️⃣", "Fala em frequência, mas sem números")),
        ("Terceiro: as provas são só depoimentos de clientes, e não testes comparando com um produto falso.", a("3️⃣", "Só depoimentos, sem teste comparando")),
        ("E quarto: diz que a ciência ainda não entende, mas usa o nome da ciência para vender.", a("4️⃣", "Usa o nome da ciência sem provas")),
    ]),
    ("A quântica de verdade hoje", [
        ("Enquanto isso, a quântica de verdade está vivendo um momento histórico.", v("quantum computer")),
        ("Em dois mil e vinte e cinco, o prêmio Nobel de Física foi para três cientistas que fizeram o efeito túnel aparecer num circuito elétrico do tamanho de um chip, e não só num átomo.", v("electronic chip close up")),
        ("Mas repare no detalhe: esse circuito precisa ficar perto do zero absoluto, uns duzentos e setenta e três graus negativos. Bem longe do calor de um pulso.", v("liquid nitrogen vapor")),
        ("É assim que funcionam os computadores quânticos. Em vez de bits que são zero ou um, eles usam qubits, que podem ficar numa mistura dos dois ao mesmo tempo.", a("💻", "Qubit: zero e um ao mesmo tempo")),
        ("Em dois mil e vinte e quatro, um chip quântico do Google resolveu em menos de cinco minutos um teste que o supercomputador mais rápido levaria mais tempo que a idade do universo para terminar.", v("server room data center")),
        ("No futuro, eles podem ajudar a criar remédios e materiais novos. Esse é o quântico de verdade: estranho, frio, difícil, e muito real.", v("laboratory scientist")),
    ]),
    ("Final", [
        ("Da luz em pacotinhos ao chip do seu celular, a física quântica é real e está em todo lugar. Só não está na pulseira.", v("smartphone hand", 3)),
        ("Se você gostou, se inscreva no Física Sem Mistério e me conta nos comentários: qual produto quântico você já viu por aí?", {"fim": True}),
    ]),
])

# ---------- o que aparece em cada cena (escolhido conferindo as imagens) ----------
# Sem entrada aqui: usa o clipe public/clipes_longo/ID_i.mp4 baixado pela "busca".
# foto = public/fotos/NOME.jpg (créditos em public/fotos/creditos.json); legenda = etiqueta "imagem real".
VIS = {
    "Quantica": {
        3: dict(foto="Qt_planck", legenda="Max Planck, que criou a ideia dos pacotes de energia em 1900"),
        6: dict(foto="Qt_einstein", legenda="Albert Einstein em 1921, ano do seu prêmio Nobel"),
        10: dict(foto="Qt_neon", legenda="Tubo de gás neon: cada salto quântico solta luz dessa cor"),
        15: dict(foto="Sol_sdo", legenda="O Sol: sem o efeito túnel, ele não brilharia (NASA/SDO)"),
        12: dict(foto="Qt_fendas", legenda="Experimento real: elétrons chegando um a um formam listras (Tonomura)"),
        20: dict(foto="Qt_ressonancia", legenda="Aparelho de ressonância magnética"),
        25: dict(foto="Qt_pbpulso", legenda="Pulseira de holograma vendida como \"equilíbrio de energia\""),
        28: dict(foto="Qt_pb", legenda="2010: a fabricante admitiu não ter prova científica"),
        38: dict(foto="Qt_ibm", legenda="Montagem de um computador quântico da IBM na Alemanha"),
        39: dict(foto="Qt_martinis", legenda="John Martinis, um dos vencedores do Nobel de Física de 2025"),
        40: dict(foto="Qt_fridge", legenda="Refrigerador que deixa os qubits perto do zero absoluto"),
    },
    "AviaoPassageiro": {
        0: dict(foto="Av_777", legenda="Boeing 777 decolando em Barcelona"),
        6: dict(foto="Av_cond", legenda="Condensação em cima da asa: ali a pressão do ar é menor"),
        20: dict(foto="Av_rastro", legenda="Rastro de condensação de um avião de passageiros"),
        24: dict(foto="Av_toque", legenda="Airbus A380 tocando a pista em San Francisco"),
        29: dict(foto="Av_jett", legenda="Boeing 747 da British Airways jogando combustível fora em voo"),
        31: dict(foto="Av_porta", legenda="Aviso na porta: não abra com a cabine pressurizada"),
    },
    "SolExplodir": {
        5: dict(foto="Sol_fil", legenda="O Sol visto pelo satélite SDO da NASA"),
        6: dict(foto="Sol_sdo", legenda="O Sol em luz ultravioleta (NASA/SDO)"),
        24: dict(foto="Sol_vent", legenda="Fonte hidrotermal no fundo do oceano (MARUM)"),
        28: dict(foto="Sol_merc", legenda="Mercúrio fotografado pela sonda MESSENGER (NASA)"),
        29: dict(foto="Sol_helix", legenda="Nebulosa da Hélice: o que sobra de uma estrela como o Sol (Hubble)"),
        33: dict(anim={"emoji": "📜", "texto": "1054: uma estrela visível de dia por 23 dias"}),
        34: dict(foto="Sol_crab", legenda="Nebulosa do Caranguejo, os restos da supernova de 1054 (Hubble)"),
        35: dict(foto="Sol_1987a", legenda="Supernova 1987A, na Grande Nuvem de Magalhães (Hubble)"),
        36: dict(foto="Sol_betel", legenda="Betelgeuse antes, durante e depois do Grande Escurecimento (ESO)"),
        43: dict(foto="Ri_sangue", legenda="Células do sangue vistas no microscópio eletrônico"),
    },
    "ElNino": {
        0: dict(foto="En_cop26", legenda="A mancha quente no Pacífico em agosto de 2026 (Copernicus)"),
        4: dict(foto="En_ssta26", legenda="Pacífico em outubro de 2026 (em cima) e 2025 (embaixo): vermelho é água mais quente que o normal (NASA)"),
        16: dict(foto="En_ssha26", legenda="Outubro de 2026: a água quente se acumulando do lado da América (NASA)"),
        25: dict(foto="En_amazon", legenda="Rio Amazonas na seca, visto por satélite em cores falsas (NASA)"),
        27: dict(foto="En_poa", legenda="Enchente em Porto Alegre, maio de 2024"),
        28: dict(foto="En_negro", legenda="Rio Negro em 2022 e na seca de 2023, visto por satélite (Copernicus)"),
        29: dict(foto="En_tefe", legenda="Seca de 2023 no lago Tefé (AM)"),
        31: dict(anim={"emoji": "🌡️", "texto": "Vários dias seguidos bem acima do normal"}),
        35: dict(foto="En_atl", legenda="Atlântico no pico da temporada, setembro de 2026: nenhum furacão (NOAA)"),
        36: dict(foto="En_lowell", legenda="Furacão Lowell no Pacífico, setembro de 2026"),
        37: dict(foto="En_aus", legenda="Fumaça de incêndios na Austrália vista do espaço, 2019 (ESA)"),
        39: dict(foto="En_1997b", legenda="A mancha quente crescendo no Pacífico, março a agosto de 1997 (NOAA)"),
        40: dict(foto="En_1997", legenda="O El Niño de 1997 visto pelo satélite TOPEX/Poseidon (NASA)"),
    },
    "Multigerador": {
        1: dict(foto="Mg_azul", legenda="O Multigerador no lançamento, 11/10 (transmissão TV Dakila)"),
        3: dict(foto="Mg_coberto", legenda="Equipamento coberto antes da revelação, Corguinho (MS)"),
        4: dict(foto="Mg_publico", legenda="Público no lançamento (transmissão TV Dakila)"),
        5: dict(foto="Mg_tecnico", legenda="Equipe técnica no lançamento (transmissão TV Dakila)"),
        6: dict(foto="Mg_bobina", legenda="Bobina dentro da pirâmide do equipamento"),
        7: dict(foto="Mg_palco1", legenda="O Multigerador no palco (transmissão TV Dakila)"),
        8: dict(foto="Mg_projeto", legenda="Imagem do projeto mostrada na transmissão"),
        11: dict(foto="Mg_alternador", legenda="O alternador do Multigerador (transmissão TV Dakila)"),
        13: dict(foto="Mg_piramide", legenda="A pirâmide iluminada do equipamento"),
        14: dict(foto="Mg_painel", legenda="Mostrador do equipamento durante a apresentação"),
        23: dict(foto="Mg_joule", legenda="Aparelho de James Joule, que mediu a energia no século 19"),
        28: dict(foto="Mg_redheffer", legenda="Máquina de moto-perpétuo de Redheffer (1812), Franklin Institute"),
        30: dict(foto="Mg_davinci", legenda="Desenho de Leonardo da Vinci (Códice Forster)"),
        31: dict(foto="Mg_bockler", legenda="Projeto de moto-perpétuo, gravura de 1661"),
        33: dict(foto="Mg_medidor", legenda="Mostrador do Multigerador no lançamento"),
        41: dict(foto="Mg_palco2", legenda="Equipe do Multigerador no palco (transmissão TV Dakila)"),
        21: dict(foto="Mg_dessal", legenda="Usina que transforma água do mar em água potável, Emirados Árabes"),
        38: dict(foto="Mg_east", legenda="Plasma dentro do EAST, o \"sol artificial\" da China"),
        39: dict(clipe="Vulcao_47"),
    },
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
    "Meteoro": {
        7: dict(foto="M_chicx", legenda="Relevo da cratera de Chicxulub, no México (NASA)"),
        20: dict(foto="M_gubbio", legenda="Geólogos na camada do fim dos dinossauros, em Gubbio, Itália"),
        21: dict(foto="M_alvarez", legenda="Luis e Walter Alvarez, pai e filho"),
        22: dict(foto="M_kt", legenda="A mesma camada nos Estados Unidos (Trinidad Lake, Colorado)"),
        23: dict(foto="M_grav", legenda="Mapa de gravidade mostra a cratera enterrada no México"),
        26: dict(foto="M_meteorito", legenda="Meteorito de Willamette, 15 toneladas (Museu de História Natural, Nova York)"),
        28: dict(foto="M_perseid", legenda="Meteoro riscando o céu à noite"),
        34: dict(foto="M_chel1", legenda="Rastro do meteoro de Chelyabinsk, 15/02/2013"),
        35: dict(foto="M_chel2", legenda="O rastro visto da cidade de Chelyabinsk, Rússia"),
        37: dict(foto="M_tung", legenda="Árvores derrubadas em Tunguska (expedição de 1927)"),
        38: dict(foto="M_crater", legenda="Cratera do Meteoro, Arizona, EUA"),
        39: dict(foto="M_aragua", legenda="Domo de Araguainha (MT/GO) visto por satélite"),
        40: dict(foto="M_bende", legenda="Meteorito do Bendegó no Museu Nacional (RJ)"),
        44: dict(foto="M_dimor", legenda="Asteroide Dimorfo, fotografado pela DART pouco antes da batida"),
    },
    "Apagao": {
        3: dict(foto="Ap_sp2009b", legenda="São Paulo durante o apagão de novembro de 2009"),
        9: dict(foto="Ap_itaipu", legenda="Usina de Itaipu (PR/Paraguai)"),
        10: dict(foto="Ap_belomonte", legenda="Sala das turbinas da usina de Belo Monte (PA)"),
        13: dict(anim={"emoji": "🚿", "texto": "Ligou o chuveiro: alguma usina gera mais na hora"}),
        14: dict(anim={"emoji": "⚙️", "texto": "Geradores girando juntos: 60 vezes por segundo"}),
        43: dict(anim={"emoji": "🔋", "texto": "Água, dinheiro vivo e bateria cheia"}),
        35: dict(foto="Ap_ama2", legenda="Macapá no escuro, novembro de 2020"),
        36: dict(foto="Ap_ama5", legenda="Fila em Macapá durante o apagão de 2020"),
        37: dict(foto="Ap_ama6", legenda="Moradores de Macapá sem energia, 2020"),
        38: dict(foto="Ap_sat", legenda="Espanha e Portugal vistos por satélite na noite do apagão, abril de 2025 (NOAA)"),
        39: dict(foto="Ap_chamartin", legenda="Estação de Chamartín, Madri, no apagão de 28/04/2025"),
        40: dict(foto="Ap_freq", legenda="Medição real: a frequência da rede caindo segundos antes do apagão (na Europa a rede é de 50 Hz)"),
    },
    "BuracoNegro": {
        9: dict(foto="B_eta", legenda="Eta Carinae: estrela com mais de 100 vezes a massa do Sol"),
        12: dict(foto="B_crab", legenda="Restos de uma supernova: Nebulosa do Caranguejo (Hubble)"),
        25: dict(foto="B_alma", legenda="Radiotelescópios ALMA, no Chile, parte do Event Horizon Telescope"),
        26: dict(foto="B_m87", legenda="Buraco negro da galáxia M87 (EHT, 2019)"),
        27: dict(foto="B_sgra", legenda="Sagitário A*, o buraco negro do centro da Via Láctea (EHT, 2022)"),
        28: dict(foto="B_s301", legenda="Estrela dando voltas em Sagitário A* (VLT/ESO)"),
        30: dict(foto="B_ligo", legenda="Detector de ondas gravitacionais LIGO, em Hanford, EUA"),
        32: dict(foto="B_cyg", legenda="Cygnus X-1 visto em raios X (Chandra/NASA)"),
        37: dict(foto="B_jato", legenda="Jato que sai do buraco negro da galáxia M87 (Hubble)"),
        38: dict(foto="B_galaxia", legenda="Galáxia espiral NGC 1300 (Hubble)"),
        44: dict(foto="B_hawking", legenda="Stephen Hawking"),
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
