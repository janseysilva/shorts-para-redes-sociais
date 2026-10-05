"""Cria os roteiros (roteiros/ID.json) dos shorts no formato "misto".

Cada short tem 7 frases: 6 de conteúdo + convite final.
Cada cena é:
  - um vídeo real ("busca" = termo no Pexels), ou
  - uma animação simples ("anim" = emoji + texto).
"""
import json
from pathlib import Path

FIM = "Segue o Física Sem Mistério para mais curiosidades."
S = []


def short(id_, titulo, legenda, final_emoji, final_frase, cenas):
    S.append(dict(id=id_, titulo=titulo, legenda=legenda, final={"emoji": final_emoji, "frase": final_frase},
                  frases=[c[0] for c in cenas] + [FIM],
                  cenas=[dict(gancho=c[1], destaque=c[2], **c[3]) for c in cenas]))


def v(busca):
    return {"busca": busca}


def a(emoji, texto):
    return {"anim": {"emoji": emoji, "texto": texto}}


short("Trovao", "Por que vemos o raio antes de ouvir o trovão?",
      "A luz é quase um milhão de vezes mais rápida que o som. Conte os segundos e divida por 3! #fisica #curiosidades #ciencia #raio #trovao",
      "⚡", "A luz chega primeiro.", [
    ("Por que você vê o raio antes de ouvir o trovão?", "Raio primeiro, trovão depois?", ["Raio", "trovão"], v("lightning storm night")),
    ("O raio e o trovão acontecem ao mesmo tempo, lá na nuvem.", "Acontecem juntos", ["juntos"], v("lightning strike")),
    ("Mas a luz viaja a trezentos mil quilômetros por segundo.", "A luz é rapidíssima", ["rapidíssima"], a("⚡", "300.000 km por segundo")),
    ("Já o som anda só uns trezentos e quarenta metros por segundo, quase um milhão de vezes mais devagar.", "O som é lento", ["lento"], a("🔊", "340 metros por segundo")),
    ("Dica: conte os segundos entre o clarão e o trovão, e divida por três.", "Conte os segundos ÷ 3", ["÷", "3"], v("storm clouds rain")),
    ("O resultado é a distância da tempestade, em quilômetros. Três segundos? Ela está a um quilômetro de você.", "3 segundos = 1 km", ["1", "km"], v("dark storm clouds")),
])

short("Gelo", "Por que o gelo boia na água?",
      "Quando a água congela, as moléculas formam hexágonos cheios de espaço vazio, e o gelo fica mais leve. #fisica #curiosidades #ciencia #gelo #agua",
      "🧊", "O gelo é mais leve que a água.", [
    ("Por que o gelo boia na água, se ele também é água?", "Por que o gelo BOIA?", ["BOIA?"], v("ice cubes water glass")),
    ("Quase tudo encolhe quando esfria e fica mais compacto.", "No frio, quase tudo encolhe", ["encolhe"], a("🧱", "No frio, quase tudo encolhe")),
    ("Mas a água é diferente: quando vira gelo, as moléculas se organizam em hexágonos, com espaços vazios no meio.", "Gelo tem espaço vazio", ["vazio"], a("❄️", "Hexágonos com espaço vazio")),
    ("Por isso o gelo ocupa mais espaço e fica cerca de dez por cento mais leve que a água.", "10% mais leve", ["10%"], v("iceberg")),
    ("É por isso que só a pontinha do iceberg aparece. Uns noventa por cento ficam escondidos embaixo d'água.", "90% escondido", ["90%"], v("iceberg ocean")),
    ("E é por isso também que os lagos congelam só por cima, e os peixes sobrevivem embaixo.", "Peixes vivos embaixo", ["vivos"], v("frozen lake")),
])

short("Astronautas", "Por que os astronautas flutuam?",
      "A gravidade lá em cima ainda é quase 90% da nossa. A estação está caindo o tempo todo em volta da Terra! #fisica #espaco #astronauta #curiosidades #ciencia",
      "🧑‍🚀", "Astronauta não flutua. Ele cai!", [
    ("Você acha que os astronautas flutuam porque no espaço não tem gravidade?", "Não tem gravidade?", ["gravidade?"], v("astronaut space station")),
    ("Errado! Lá em cima, a gravidade ainda é quase noventa por cento da que sentimos aqui.", "Gravidade: 90%!", ["90%!"], a("🌍", "Gravidade quase 90%")),
    ("O segredo é que a estação espacial está caindo o tempo todo em volta da Terra.", "Caindo o tempo todo", ["Caindo"], v("earth from space")),
    ("Ela anda tão rápido, uns vinte e oito mil quilômetros por hora, que nunca chega no chão. Ela cai e erra a Terra.", "Cai e erra a Terra", ["erra"], a("🛰️", "28.000 km por hora")),
    ("Como tudo lá dentro cai junto, os astronautas parecem flutuar.", "Tudo cai junto", ["junto"], v("astronaut floating")),
    ("É a mesma sensação da descida da montanha-russa, só que sem parar.", "Queda sem fim", ["sem", "fim"], v("roller coaster")),
])

short("ArcoIris", "Por que o arco-íris é curvo?",
      "Cada gota devolve a luz num ângulo de 42°. Todas juntas formam um círculo em volta de você! #fisica #arcoiris #curiosidades #ciencia #luz",
      "🌈", "O arco-íris é um círculo.", [
    ("Por que o arco-íris é curvo?", "Por que é CURVO?", ["CURVO?"], v("rainbow sky")),
    ("Cada gota de chuva funciona como um pequeno prisma e separa a luz do Sol em cores.", "Cada gota é um prisma", ["prisma"], v("rain drops sunlight")),
    ("Mas a luz só volta para os seus olhos num ângulo certinho, de quarenta e dois graus.", "Sempre 42 graus", ["42"], a("📐", "Ângulo de 42 graus")),
    ("Todas as gotas nesse ângulo formam um círculo em volta da sombra da sua cabeça.", "É um círculo!", ["círculo!"], a("⭕", "Um círculo em volta de você")),
    ("O chão esconde a parte de baixo, e por isso vemos só um arco.", "O chão esconde metade", ["metade"], v("rainbow landscape")),
    ("De avião, dá para ver o arco-íris inteiro, redondinho.", "Do avião: inteiro", ["inteiro"], v("airplane window clouds")),
])

short("Lua", "Por que a Lua mostra sempre o mesmo lado?",
      "Ela gira em volta de si no mesmo tempo em que dá a volta na Terra: uns 27 dias. #fisica #lua #espaco #curiosidades #astronomia",
      "🌙", "A Lua gira no ritmo certinho.", [
    ("Por que a Lua mostra sempre o mesmo lado para a gente?", "Sempre o mesmo lado?", ["mesmo", "lado?"], v("full moon")),
    ("Ela gira em volta de si mesma, sim. Mas leva o mesmo tempo que leva para dar a volta na Terra, uns vinte e sete dias.", "Gira no mesmo ritmo", ["ritmo"], a("🌕", "27 dias e 27 dias")),
    ("Por isso, o mesmo lado fica sempre virado para nós.", "Mesmo lado pra nós", ["nós"], v("moon night sky")),
    ("Quem fez isso foi a gravidade da Terra, que foi freando a rotação da Lua durante milhões de anos.", "A Terra freou a Lua", ["freou"], a("🌍", "A Terra freou a Lua")),
    ("O lado que nunca vemos só foi fotografado em mil novecentos e cinquenta e nove, por uma sonda espacial.", "Lado oculto: 1959", ["1959"], v("moon surface")),
    ("E ele não é escuro: recebe tanta luz do Sol quanto o lado que a gente vê.", "Não é escuro!", ["escuro!"], v("moon craters")),
])

short("MicroOndas", "Como o micro-ondas esquenta a comida?",
      "As ondas fazem a água da comida se agitar bilhões de vezes por segundo, e esse movimento vira calor. #fisica #microondas #curiosidades #ciencia #cozinha",
      "🍲", "Micro-ondas agita a água.", [
    ("Como o micro-ondas esquenta a comida sem fogo?", "Esquenta sem fogo?", ["fogo?"], v("microwave oven")),
    ("Ele solta ondas invisíveis, parecidas com as do rádio, que entram na comida.", "Ondas invisíveis", ["invisíveis"], a("📡", "Ondas invisíveis")),
    ("Essas ondas fazem as moléculas de água da comida se agitarem bilhões de vezes por segundo.", "A água se agita", ["agita"], a("💧", "Bilhões de vezes por segundo")),
    ("Toda essa agitação vira calor, e a comida esquenta.", "Agitação vira calor", ["calor"], v("hot food steam")),
    ("Por isso comida seca, como pão, esquenta pior, e prato vazio quase não esquenta.", "Sem água, esquenta pouco", ["pouco"], v("bread")),
    ("E a gradinha na porta segura as ondas lá dentro, mas deixa a luz passar para você olhar.", "A grade segura as ondas", ["grade"], v("microwave")),
])

short("MetalGelado", "Por que o metal parece mais gelado que a madeira?",
      "Os dois estão na mesma temperatura! O metal só puxa o calor da sua mão muito mais rápido. #fisica #calor #curiosidades #ciencia #temperatura",
      "🥶", "Não é frio. É condução!", [
    ("Por que o metal parece mais gelado que a madeira, se os dois estão no mesmo lugar?", "Metal mais gelado?", ["gelado?"], v("metal railing")),
    ("A verdade é que os dois estão na mesma temperatura.", "Mesma temperatura!", ["Mesma"], a("🌡️", "Mesma temperatura!")),
    ("O que muda é a velocidade com que eles puxam o calor da sua mão.", "Puxa o calor da mão", ["calor"], v("hand touching")),
    ("O metal é um ótimo condutor: tira o calor da pele muito rápido, e você sente frio.", "Metal conduz rápido", ["rápido"], a("🥄", "Metal: conduz rápido")),
    ("Já a madeira conduz mal o calor, então sua mão continua quentinha.", "Madeira conduz mal", ["mal"], v("wood texture")),
    ("É por isso que o cabo da panela costuma ser de madeira ou de plástico.", "Cabo de panela", ["panela"], v("cooking pan")),
])

short("Aviao", "Como um avião consegue voar?",
      "A asa empurra o ar para baixo, e o ar empurra a asa para cima: é a sustentação. #fisica #aviao #curiosidades #ciencia #voo",
      "✈️", "A asa empurra o ar.", [
    ("Como um avião de centenas de toneladas consegue voar?", "Como o avião voa?", ["voa?"], v("airplane takeoff")),
    ("O segredo está no formato e na inclinação da asa.", "O segredo é a asa", ["asa"], v("airplane wing")),
    ("Quando o avião corre, a asa empurra o ar para baixo.", "Empurra o ar pra baixo", ["baixo"], a("⬇️", "A asa empurra o ar pra baixo")),
    ("E pela lei da ação e reação, o ar empurra a asa para cima. Essa força se chama sustentação.", "Ar empurra pra cima", ["cima"], a("⬆️", "Sustentação")),
    ("Quanto mais rápido, maior a sustentação. Por isso ele precisa de uma pista comprida para decolar.", "Precisa de velocidade", ["velocidade"], v("airplane runway")),
    ("Um avião grande decola a quase trezentos quilômetros por hora.", "Quase 300 km/h", ["300"], v("airplane flying clouds")),
])

short("PanelaPressao", "Por que a panela de pressão cozinha mais rápido?",
      "Com o vapor preso, a água só ferve perto de 120 °C em vez de 100 °C. #fisica #cozinha #curiosidades #ciencia #panela",
      "🍲", "Mais pressão, mais calor.", [
    ("Por que a panela de pressão cozinha tão mais rápido?", "Por que é mais rápida?", ["rápida?"], v("pressure cooker")),
    ("Numa panela comum, a água ferve a cem graus e não passa disso.", "Água ferve a 100 °C", ["100"], v("boiling water pot")),
    ("Na panela de pressão, o vapor fica preso e a pressão lá dentro aumenta.", "Vapor preso", ["preso"], v("steam kitchen")),
    ("Com mais pressão, a água só ferve perto de cento e vinte graus.", "Ferve a 120 °C", ["120"], a("🌡️", "Ferve a 120 °C")),
    ("Vinte graus a mais fazem o feijão cozinhar em bem menos tempo.", "Feijão mais rápido", ["rápido"], v("beans cooking")),
    ("No alto de uma montanha é o contrário: a pressão é menor, a água ferve antes, e a comida demora mais.", "Na montanha, demora", ["demora"], v("mountain peak")),
])

short("SomEspaco", "Existe som no espaço?",
      "O som precisa de ar para andar. No espaço quase não tem ar, então é silêncio total. #fisica #espaco #som #curiosidades #ciencia",
      "🚀", "No espaço, silêncio total.", [
    ("Se uma estrela explodir no espaço, você não vai ouvir nada.", "Silêncio no espaço", ["Silêncio"], v("space nebula")),
    ("O som é uma vibração que precisa de algo para andar: ar, água, ou até uma parede.", "Som precisa de ar", ["ar"], a("🔊", "O som precisa de ar")),
    ("Aqui na Terra, as moléculas do ar vão empurrando umas às outras até chegar no seu ouvido.", "O ar leva o som", ["leva"], a("👂", "Ar empurrando ar")),
    ("No espaço quase não tem ar, então não tem nada para carregar o som.", "Sem ar, sem som", ["sem", "som"], v("astronaut space")),
    ("Por isso os astronautas conversam por rádio, que usa ondas que andam até no vácuo.", "Conversa por rádio", ["rádio"], v("astronaut")),
    ("As explosões barulhentas dos filmes de ficção científica são pura invenção.", "Filme inventa o barulho", ["inventa"], v("galaxy stars")),
])

short("Estrelas", "Por que as estrelas piscam e os planetas não?",
      "O ar em movimento entorta a luz. A estrela é só um pontinho e pisca; o planeta, não. #fisica #estrelas #astronomia #curiosidades #ceu",
      "🔭", "Estrela pisca, planeta não.", [
    ("Por que as estrelas piscam e os planetas não?", "Por que piscam?", ["piscam?"], v("starry night sky")),
    ("Quem faz a estrela piscar é o nosso próprio ar.", "A culpa é do ar", ["ar"], v("night sky stars timelapse")),
    ("A atmosfera tem camadas de ar quente e frio se mexendo, que entortam a luz um pouquinho.", "O ar entorta a luz", ["entorta"], a("🌬️", "Ar se mexendo entorta a luz")),
    ("Como a estrela está muito longe, ela é só um pontinho, e qualquer desvio faz ela piscar.", "Pontinho pisca", ["pisca"], a("✨", "Pontinho = pisca")),
    ("Os planetas estão mais perto e aparecem como um disquinho, e os desvios se compensam.", "Planeta brilha firme", ["firme"], v("night sky moon")),
    ("Dica: se o ponto brilhante não pisca, provavelmente é um planeta.", "Não pisca? Planeta!", ["Planeta!"], v("milky way")),
])

short("Colher", "Por que a colher parece quebrada no copo d'água?",
      "A luz muda de velocidade e de direção quando passa do ar para a água: é a refração. #fisica #luz #refracao #curiosidades #ciencia",
      "🥄", "A luz dobra na água.", [
    ("Por que a colher parece quebrada dentro do copo d'água?", "Colher quebrada?", ["quebrada?"], v("spoon glass water")),
    ("A luz muda de velocidade quando passa do ar para a água.", "Luz muda de velocidade", ["velocidade"], a("💡", "A luz muda de velocidade")),
    ("Na água ela anda uns vinte e cinco por cento mais devagar, e isso faz ela mudar de direção.", "Muda de direção", ["direção"], a("↩️", "25% mais devagar")),
    ("Esse desvio da luz se chama refração.", "Refração", ["Refração"], v("glass of water")),
    ("Seu cérebro acha que a luz veio em linha reta, então vê a colher num lugar diferente.", "O cérebro se engana", ["engana"], v("water glass light")),
    ("É por isso também que a piscina parece mais rasa do que é de verdade.", "Piscina parece rasa", ["rasa"], v("swimming pool")),
])

short("Inercia", "Por que somos jogados para frente quando o ônibus freia?",
      "Ninguém te empurra: seu corpo só quer continuar andando. Isso é inércia, e é por isso que o cinto salva vidas. #fisica #inercia #curiosidades #ciencia #transito",
      "🚌", "Inércia: o corpo quer seguir.", [
    ("Por que, quando o ônibus freia, você é jogado para frente?", "Jogado pra frente?", ["frente?"], v("bus interior")),
    ("Na verdade, ninguém te empurrou.", "Ninguém te empurrou", ["Ninguém"], a("🤚", "Ninguém te empurrou")),
    ("Seu corpo estava andando junto com o ônibus e quer continuar andando.", "O corpo quer seguir", ["seguir"], v("bus driving city")),
    ("Isso se chama inércia: tudo tende a continuar do jeito que está, parado ou em movimento.", "Inércia", ["Inércia"], a("🎳", "Inércia")),
    ("O ônibus para, mas o seu corpo continua indo, até alguma coisa segurar.", "O ônibus para, você não", ["não"], v("car braking")),
    ("É exatamente por isso que o cinto de segurança salva vidas.", "Use o cinto!", ["cinto!"], v("seat belt car")),
])

short("MarSalgado", "Por que o mar é salgado e a chuva não?",
      "A chuva lava os minerais das rochas, os rios levam para o mar, e a água evapora deixando o sal. #fisica #mar #curiosidades #ciencia #natureza",
      "🌊", "O sal vem das rochas.", [
    ("Por que o mar é salgado, se a chuva é doce?", "Mar salgado, chuva doce?", ["salgado,", "doce?"], v("ocean waves")),
    ("A chuva cai nas montanhas e vai dissolvendo um pouquinho dos minerais das rochas.", "A chuva lava as rochas", ["rochas"], v("rain mountains")),
    ("Os rios levam esses sais até o mar.", "Os rios levam o sal", ["sal"], v("river")),
    ("No mar, o Sol evapora a água, mas o sal fica para trás.", "O sal fica", ["fica"], a("☀️", "A água sobe, o sal fica")),
    ("O vapor vira nuvem e chuva doce de novo, e esse ciclo se repete há bilhões de anos.", "Bilhões de anos", ["Bilhões"], v("clouds timelapse")),
    ("Hoje, cada litro de água do mar tem uns trinta e cinco gramas de sal.", "35 g por litro", ["35"], a("🧂", "35 gramas por litro")),
])

# ---------- LEVA 2 (01/10): shorts 16 a 20 ----------
short("NavioAco", "Por que um navio de aço NÃO afunda?",
      "Um bloco de aço afunda, mas o casco cheio de ar empurra muita água para o lado, e a água empurra o navio para cima. #fisica #navio #curiosidades #ciencia #arquimedes",
      "🚢", "O ar no casco segura o navio.", [
    ("Uma bolinha de aço afunda na hora. Então por que um navio de aço gigante não afunda?", "Por que o navio boia?", ["boia?"], v("cargo ship ocean")),
    ("O segredo é o empuxo. Tudo que entra na água empurra um pouco de água para o lado.", "O segredo: empuxo", ["empuxo"], a("💧", "A água empurra de volta")),
    ("E a água empurra de volta para cima, com a mesma força do peso da água que saiu do lugar.", "A água empurra para cima", ["cima"], v("boat floating water")),
    ("O casco do navio é oco, cheio de ar. Ele afasta tanta água que esse empurrão aguenta o peso todo.", "Casco oco, cheio de ar", ["oco,"], v("ship hull")),
    ("Se você amassar o mesmo aço num bloco, ele afasta pouca água e afunda.", "Em bloco, afunda", ["afunda"], a("🧱", "Aço em bloco afunda")),
    ("Por isso, quando entra água no casco, o navio fica mais pesado que o empurrão, e aí sim ele afunda.", "Entrou água? Afunda", ["água?"], v("ship sea storm")),
])

short("TerraGira", "A Terra gira a 1.600 km/h. Por que não sentimos?",
      "Só sentimos quando a velocidade muda. A Terra gira sempre igual e leva tudo junto: chão, ar e você. #fisica #terra #espaco #curiosidades #ciencia",
      "🌍", "Sentimos a mudança, não a velocidade.", [
    ("A Terra gira a mais de mil e seiscentos quilômetros por hora. Por que a gente não sente nada?", "1.600 km/h e você nem sente", ["1.600"], v("earth rotating space")),
    ("Primeiro: tudo gira junto. O chão, o ar, os prédios e você vão na mesma velocidade.", "Tudo gira junto", ["junto"], v("city timelapse")),
    ("Segundo: o corpo não sente velocidade. Ele sente só quando a velocidade muda.", "O corpo sente a mudança", ["mudança"], a("🎢", "Sentimos só a mudança")),
    ("É como num avião a novecentos quilômetros por hora: dá para tomar café tranquilo, sem derramar.", "Café a 900 km/h", ["900"], v("airplane cabin passengers")),
    ("Você só sente na decolagem, na freada ou na turbulência.", "Só na decolagem e freada", ["decolagem"], v("airplane takeoff")),
    ("E a Terra gira sempre igual, sem acelerar nem frear. Por isso, para você, parece que está tudo parado.", "Por isso parece parado", ["parado"], a("🌍", "Sempre na mesma velocidade")),
])

# temas em alta nas buscas do YouTube (01/10): pôr do sol, mar nunca enche, água e óleo
short("PorDoSol", "Por que o pôr do sol é LARANJA?",
      "No fim da tarde, a luz atravessa muito mais ar. O azul se espalha pelo caminho e só o laranja e o vermelho chegam até você. #fisica #pordosol #ceu #curiosidades #ciencia",
      "🌅", "Sobram o laranja e o vermelho.", [
    ("Se o céu é azul durante o dia, por que ele fica laranja no fim da tarde?", "Por que o pôr do sol é LARANJA?", ["LARANJA?"], v("sunset sky")),
    ("A luz do Sol é branca, uma mistura de todas as cores.", "Luz branca = todas as cores", ["todas"], a("🌈", "Todas as cores juntas")),
    ("No caminho, o ar espalha mais a luz azul. Por isso, de dia, o céu fica azul.", "O ar espalha o azul", ["azul"], v("blue sky clouds")),
    ("No fim da tarde, o Sol está baixinho, e a luz atravessa muito mais ar até chegar em você.", "Muito mais ar no caminho", ["mais", "ar"], a("☀️", "Muito mais ar no caminho")),
    ("Nesse caminho comprido, quase todo o azul se espalha antes e fica para trás.", "O azul fica para trás", ["trás"], v("sun setting horizon")),
    ("Sobram o laranja e o vermelho. E com poeira ou fumaça no ar, o céu fica ainda mais vermelho.", "Sobra o laranja", ["laranja"], v("red sunset clouds")),
])

short("MarNuncaEnche", "Os rios não param de encher o mar. Por que ele NUNCA transborda?",
      "O Sol evapora do mar quase a mesma quantidade de água que os rios e a chuva colocam. É o ciclo da água! #fisica #mar #cicloagua #curiosidades #ciencia",
      "🌊", "Entra e sai a mesma quantidade.", [
    ("Os rios despejam água no mar sem parar, todos os dias. Por que ele nunca transborda?", "Por que o mar nunca enche?", ["nunca"], v("river flowing into sea")),
    ("Só o rio Amazonas joga mais de duzentos milhões de litros de água no mar por segundo.", "200 milhões de litros por segundo", ["200"], a("🌊", "200 milhões de litros por segundo")),
    ("Mas o mar também perde água o tempo todo: o calor do Sol faz a água evaporar.", "O Sol evapora o mar", ["evapora"], v("ocean sunlight waves")),
    ("Esse vapor sobe, vira nuvem e cai como chuva, em cima do mar e em cima da terra.", "Vira nuvem e chuva", ["chuva"], v("rain clouds timelapse")),
    ("A chuva que cai na terra enche os rios, que levam a água de volta para o mar.", "Os rios devolvem a água", ["devolvem"], a("🔄", "O ciclo da água")),
    ("Entra e sai quase a mesma quantidade. Por isso, o nível do mar fica praticamente igual.", "Entra e sai igual", ["igual"], v("ocean aerial view")),
])

short("AguaOleo", "Por que água e óleo NÃO se misturam?",
      "A água gruda nela mesma como um ímã e empurra o óleo para fora. O detergente junta os dois! #fisica #quimica #curiosidades #ciencia #cozinha",
      "💧", "A água só gruda em água.", [
    ("Você pode mexer o quanto quiser: água e óleo sempre se separam. Por quê?", "Água e óleo não se misturam?", ["não"], v("oil and water")),
    ("A molécula da água tem um lado mais positivo e outro mais negativo, como um ímã.", "A água é como um ímã", ["ímã"], a("🧲", "Um lado + e outro −")),
    ("Por isso, as moléculas de água se agarram umas nas outras.", "Água gruda em água", ["gruda"], a("💧", "Água gruda em água")),
    ("O óleo não tem esses lados. A água não se agarra nele e acaba empurrando o óleo para fora.", "O óleo é empurrado", ["empurrado"], v("oil drops in water")),
    ("E como o óleo é mais leve que a água, ele fica boiando em cima.", "O óleo boia", ["boia"], v("pouring cooking oil")),
    ("É por isso que o detergente funciona: ele tem uma ponta que gruda na água e outra que gruda na gordura.", "O detergente junta os dois", ["detergente"], v("washing dishes")),
])

# ---------- LEVA 3 (01/10, noite): formato dos virais — escala, espaço e demonstração ----------
short("SolTerra", "O Sol NÃO é do tamanho que você imagina ☀️",
      "Cabem mais de um milhão de Terras dentro do Sol. E ele ainda é uma estrela comum! #fisica #sol #espaco #curiosidades #astronomia",
      "☀️", "Cabe um milhão de Terras.", [
    ("Você acha que sabe o tamanho do Sol? Ele é muito maior do que parece.", "O Sol é MUITO maior", ["MUITO"], v("sun surface")),
    ("Se a Terra fosse uma bolinha de gude, o Sol seria uma bola de mais de um metro.", "Bolinha de gude × 1 metro", ["1", "metro"], a("⚪", "Terra: bolinha de gude")),
    ("Dá para enfileirar cento e nove Terras de um lado a outro do Sol.", "109 Terras lado a lado", ["109"], a("🌍", "109 Terras de largura")),
    ("E dentro dele caberiam mais de um milhão e trezentas mil Terras.", "1,3 milhão de Terras", ["1,3", "milhão"], v("earth from space")),
    ("A luz dele leva oito minutos para chegar aqui. Você sempre vê o Sol de oito minutos atrás.", "8 minutos atrasado", ["8"], v("sunrise clouds")),
    ("E mesmo assim, o Sol é só uma estrela média. Tem estrelas milhares de vezes maiores.", "Uma estrela comum", ["comum"], v("stars galaxy")),
])

short("PesoMarte", "Quanto você pesaria em Marte? 🔴",
      "A gravidade de Marte é 38% da nossa: 70 kg aqui viram uns 27 kg lá. Na Lua, menos de 12 kg! #fisica #marte #espaco #curiosidades #gravidade",
      "🔴", "Em Marte você seria um peso-pena.", [
    ("Quanto você pesaria em Marte? A resposta é surpreendente.", "Seu peso em Marte?", ["Marte?"], v("mars planet")),
    ("A gravidade lá é só trinta e oito por cento da gravidade da Terra.", "Gravidade: só 38%", ["38%"], a("🔴", "Gravidade: 38%")),
    ("Quem pesa setenta quilos aqui, em Marte sentiria só uns vinte e sete.", "70 kg viram 27 kg", ["27"], a("⚖️", "70 kg → 27 kg")),
    ("Daria para pular quase três vezes mais alto e carregar peso como um super-herói.", "Pulo 3 vezes mais alto", ["3"], v("astronaut jumping")),
    ("Na Lua é ainda mais leve: os mesmos setenta quilos virariam menos de doze.", "Na Lua: 12 kg", ["12"], v("moon surface")),
    ("Seu corpo continua o mesmo. O que muda é a força com que o planeta te puxa.", "O planeta te puxa", ["puxa"], v("mars landscape")),
])

short("Alavanca", "Não é força. É FÍSICA 💪",
      "Quanto mais longe do apoio você empurra, menos força precisa. É a alavanca! #fisica #alavanca #curiosidades #ciencia #arquimedes",
      "💪", "Não é força, é física.", [
    ("Já reparou que uma porta empurrada perto da dobradiça quase não abre?", "Por que a porta não abre?", ["não"], v("opening door")),
    ("Não é falta de força. É física: a alavanca.", "Não é força, é física", ["física"], a("💪", "Não é força, é física")),
    ("Quanto mais longe do ponto de apoio você empurra, menos força você precisa.", "Mais longe, menos força", ["menos"], a("📏", "Mais longe = menos força")),
    ("Por isso a maçaneta fica longe da dobradiça. E por isso a chave de roda é comprida.", "Por isso a chave é comprida", ["comprida"], v("car wheel wrench")),
    ("Com uma alavanca longa, até uma criança levanta um adulto na gangorra.", "Criança levanta adulto", ["levanta"], a("⚖️", "Gangorra: alavanca longa")),
    ("Arquimedes dizia: me dê uma alavanca e um ponto de apoio, e eu moverei o mundo.", "Eu moverei o mundo", ["mundo"], v("earth rotating space")),
])

short("BigBang", "O Big Bang explicado em 30 segundos 💥",
      "Há 13,8 bilhões de anos, tudo estava num ponto quente e denso. O espaço se esticou, e continua esticando! #fisica #bigbang #universo #espaco #curiosidades",
      "🌌", "O universo ainda está crescendo.", [
    ("O Big Bang explicado em trinta segundos.", "Big Bang em 30 segundos", ["30"], v("galaxy space")),
    ("Há treze vírgula oito bilhões de anos, tudo o que existe estava num ponto pequeno, quente e denso.", "Tudo num ponto só", ["ponto"], a("✨", "13,8 bilhões de anos atrás")),
    ("Não foi uma explosão no espaço. Foi o próprio espaço que começou a se esticar.", "O espaço se esticou", ["esticou"], a("🎈", "O espaço esticando")),
    ("Com o tempo, tudo esfriou e surgiram os primeiros átomos, depois as estrelas e as galáxias.", "Nascem estrelas e galáxias", ["galáxias"], v("nebula stars")),
    ("O nosso Sol e a Terra só apareceram uns nove bilhões de anos depois.", "A Terra chegou bem depois", ["depois"], v("earth from space")),
    ("E o universo continua se esticando até hoje: as galáxias estão se afastando umas das outras.", "Ainda está crescendo", ["crescendo"], v("galaxy rotating")),
])

short("TamanhoLua", "A Lua é MENOR que o Brasil? 🌙",
      "A Lua tem 3.474 km de diâmetro, menos que a largura do Brasil. E todos os planetas cabem entre a Terra e a Lua! #fisica #lua #espaco #curiosidades #astronomia",
      "🌙", "A Lua é menor que o Brasil.", [
    ("Você sabia que a Lua é menor que a largura do Brasil?", "A Lua é menor que o Brasil?", ["menor"], v("full moon night")),
    ("Ela tem uns três mil e quinhentos quilômetros de diâmetro. O Brasil tem mais de quatro mil de largura.", "3.500 km × 4.300 km", ["3.500"], a("🌙", "Lua: 3.474 km")),
    ("Mas ela está bem longe: a uns trezentos e oitenta e quatro mil quilômetros daqui.", "384 mil km de distância", ["384"], v("moon surface")),
    ("É tão longe que todos os planetas do Sistema Solar caberiam enfileirados entre a Terra e a Lua.", "Todos os planetas cabem", ["planetas"], a("🪐", "Todos os planetas no meio")),
    ("E aquela Lua enorme no horizonte? É ilusão. Ela tem o mesmo tamanho lá no alto.", "Lua gigante é ilusão", ["ilusão"], v("moonrise horizon")),
    ("Ela também se afasta da Terra uns quatro centímetros por ano.", "Ela está indo embora", ["embora"], v("moon clouds night")),
])

# ---------- LEVA 4 (02/10): "por que" de coisas do dia a dia (o que mais teve visualização: gelo, navio, raio, água e óleo) ----------
short("VidroEmbaca", "Por que o vidro do carro EMBAÇA? 🚗",
      "A respiração solta vapor, que vira gotinhas no vidro frio. O ar-condicionado seca o ar e desembaça rapidinho! #fisica #carro #curiosidades #ciencia #diaadia",
      "🚗", "Vapor + vidro frio = embaçado.", [
    ("Por que o vidro do carro embaça quando chove ou quando tem muita gente dentro?", "Por que o vidro EMBAÇA?", ["EMBAÇA?"], v("foggy car window")),
    ("A respiração das pessoas solta vapor de água, que é invisível.", "Vapor que você não vê", ["vapor"], a("💨", "Vapor de água invisível")),
    ("Quando esse vapor encosta no vidro gelado, ele esfria e vira gotinhas.", "Vidro frio = gotinhas", ["gotinhas"], a("💧", "Vapor + vidro frio = gotas")),
    ("São milhões de gotinhas minúsculas, e elas espalham a luz. Por isso você não enxerga nada.", "Milhões de gotinhas", ["Milhões"], v("rain car window")),
    ("Para tirar rápido, liga o ar-condicionado no vidro: ele seca o ar.", "Ar-condicionado seca o ar", ["seca"], v("car air conditioning")),
    ("E abrir um pouquinho a janela também ajuda, porque iguala a temperatura de dentro e de fora.", "Abra um pouco a janela", ["janela"], v("driving car rain")),
])

short("OvoMicro", "Por que o ovo EXPLODE no micro-ondas? 🥚",
      "O micro-ondas transforma a água do ovo em vapor, e a casca não deixa sair. A pressão sobe até estourar! #fisica #ovo #microondas #curiosidades #cozinha",
      "🥚", "Vapor preso estoura o ovo.", [
    ("Já viu ovo explodir no micro-ondas? Tem explicação.", "Por que o ovo EXPLODE?", ["EXPLODE?"], v("egg cracking")),
    ("O micro-ondas esquenta a água que está dentro da comida.", "Ele esquenta a água", ["água"], a("📡", "Ele esquenta a água")),
    ("Dentro do ovo, essa água vira vapor, mas a casca e a película não deixam o vapor sair.", "Vapor preso na casca", ["preso"], a("🥚", "Vapor preso na casca")),
    ("A pressão vai subindo, subindo, até o ovo estourar. Às vezes só quando você mexe nele.", "A pressão sobe até estourar", ["estourar"], v("boiled egg")),
    ("É a mesma ideia da pipoca: a água vira vapor e estoura o grão.", "Igual à pipoca", ["pipoca"], v("popcorn popping")),
    ("Para não ter susto, faz furinhos na gema e na clara, ou cozinha o ovo na panela.", "Fure antes ou use a panela", ["Fure"], v("frying egg pan")),
])

short("FogoAzul", "Por que o fogo do fogão é AZUL? 🔥",
      "Com bastante ar, o gás queima por completo e a chama fica azul. Chama amarela no fogão é queima ruim: limpe a boca! #fisica #fogo #fogao #curiosidades #ciencia",
      "🔥", "Azul é queima completa.", [
    ("Por que o fogo do fogão é azul, e a fogueira é amarela?", "Por que o fogo é AZUL?", ["AZUL?"], v("gas stove flame")),
    ("No fogão, o gás se mistura bem com o ar antes de queimar.", "Gás + muito ar", ["ar"], a("💨", "Gás + muito ar")),
    ("Com bastante oxigênio, a queima é completa: a chama fica azul e muito quente.", "Queima completa = azul", ["azul"], v("blue flame")),
    ("Na vela e na fogueira, falta ar na mistura. Sobram pedacinhos de carvão que brilham amarelo.", "Falta ar = amarelo", ["amarelo"], v("campfire flames")),
    ("Por isso, se o fogo do seu fogão ficar amarelo, ele está queimando mal.", "Fogão amarelo? Atenção", ["Atenção"], a("⚠️", "Chama amarela = queima ruim")),
    ("Pode ser boca suja ou entupida. Limpar resolve e ainda economiza gás.", "Limpe e economize gás", ["economize"], v("cleaning stove")),
])

short("OvoBoia", "O teste do ovo: por que o ovo velho BOIA? 🥚",
      "A casca tem milhares de furinhos. Com o tempo sai água, entra ar, e o ovo fica mais leve. Boiou? Melhor não usar! #fisica #ovo #cozinha #curiosidades #dicas",
      "🥚", "Boiou? Melhor não usar.", [
    ("Coloca o ovo num copo de água. Se ele boiar, cuidado!", "O teste do ovo", ["ovo"], v("egg in water glass")),
    ("A casca do ovo tem milhares de furinhos que você não vê.", "Milhares de furinhos", ["furinhos"], a("🔍", "Milhares de furinhos")),
    ("Com o tempo, a água de dentro evapora por esses furinhos e entra ar no lugar.", "Sai água, entra ar", ["ar"], a("💨", "Sai água, entra ar")),
    ("A bolsa de ar dentro do ovo vai crescendo, e o ovo fica mais leve.", "A bolha de ar cresce", ["cresce"], a("🎈", "A bolha de ar cresce")),
    ("Ovo fresco afunda e deita. Ovo mais velho fica em pé. E se boiar, é melhor não usar.", "Boiou? Não use", ["Boiou?"], v("fresh eggs")),
    ("É o mesmo motivo do navio: quanto mais ar dentro, mais fácil boiar.", "Mais ar, mais boia", ["boia"], v("eggs kitchen")),
])

short("RastroAviao", "Que FUMAÇA é essa que o avião deixa no céu? ✈️",
      "Não é fumaça: é uma nuvem! O vapor do motor congela a 50 graus abaixo de zero e vira cristais de gelo. #fisica #aviao #ceu #curiosidades #ciencia",
      "✈️", "É uma nuvem feita pelo avião.", [
    ("Aquela linha branca que o avião deixa no céu não é fumaça.", "Não é fumaça!", ["fumaça!"], v("airplane contrail sky")),
    ("Lá em cima, a uns dez quilômetros de altura, faz uns cinquenta graus abaixo de zero.", "−50 °C lá em cima", ["−50"], a("🥶", "−50 °C lá em cima")),
    ("O motor solta gás quente cheio de vapor de água.", "O motor solta vapor", ["vapor"], a("✈️", "Motor solta vapor quente")),
    ("Esse vapor congela na hora e vira cristaizinhos de gelo. É uma nuvem feita pelo avião!", "Uma nuvem de gelo", ["nuvem"], v("contrail")),
    ("Se o ar estiver seco, o rastro some rápido. Se estiver úmido, ele dura e se espalha.", "Ar úmido, rastro longo", ["úmido,"], v("blue sky airplane")),
    ("Por isso tem dia que o céu fica cheio de riscos, e tem dia que não aparece nenhum.", "Céu cheio de riscos", ["riscos"], v("airplane flying sky")),
])

# ---------- LEVA 5 (03/10): "por que" de casa, cozinha e avião (buscas em alta do YouTube BR + a leva 4 bombou) ----------
short("CelularEsquenta", "Por que o celular ESQUENTA? 📱",
      "Carregar e jogar transformam parte da energia em calor. Tire a capinha ao carregar e evite usar na tomada para proteger a bateria! #fisica #celular #bateria #curiosidades #tecnologia",
      "📱", "Energia que vira calor.", [
    ("Por que o celular esquenta tanto, principalmente quando está carregando?", "Por que ele ESQUENTA?", ["ESQUENTA?"], v("smartphone charging")),
    ("Todo aparelho elétrico perde um pouco da energia em forma de calor.", "Parte da energia vira calor", ["calor"], a("⚡", "Parte da energia vira calor")),
    ("Quando carrega, a bateria recebe energia muito rápido, e uma parte vira calor.", "Carregar esquenta", ["Carregar"], a("🔋", "Carregar gera calor")),
    ("O processador também esquenta quando você joga ou grava vídeo, porque trabalha no máximo.", "Jogo pesado esquenta", ["Jogo"], v("mobile gaming")),
    ("Jogar com o celular na tomada é esquentar dos dois lados ao mesmo tempo.", "Jogar + carregar = quente", ["quente"], a("🥵", "Jogar + carregar = muito calor")),
    ("Para proteger a bateria, tira a capinha ao carregar e não deixa o celular no sol.", "Proteja a bateria", ["bateria"], v("phone on table")),
])

short("GeloQueima", "Por que o gelo QUEIMA a pele? 🧊",
      "O frio não entra: é o calor que sai da pele rápido demais. Use gelo sempre enrolado num pano! #fisica #gelo #corpohumano #curiosidades #saude",
      "🧊", "É o calor saindo da pele.", [
    ("Já segurou gelo por muito tempo e sentiu queimar?", "O gelo QUEIMA?", ["QUEIMA?"], v("ice cubes hand")),
    ("O frio não entra na pele. O que acontece é o calor sair da sua mão para o gelo.", "O calor SAI da pele", ["SAI"], a("🔥", "O calor sai da mão para o gelo")),
    ("Quando a pele perde calor rápido demais, as células começam a sofrer, como numa queimadura.", "Frio demais machuca", ["machuca"], a("⚠️", "Perder calor rápido machuca")),
    ("O corpo usa o mesmo alarme de dor para o calor e para o frio forte. Por isso parece queimar.", "O mesmo alarme de dor", ["alarme"], a("🧠", "O mesmo alarme de dor")),
    ("O gelo seco é ainda pior: ele fica a setenta e oito graus abaixo de zero.", "Gelo seco: −78 °C", ["−78"], v("dry ice smoke")),
    ("Por isso, para aliviar uma pancada, enrola o gelo num pano e não passa de vinte minutos.", "Sempre com um pano", ["pano"], v("ice pack")),
])

short("PaoMurcha", "Por que o pão MURCHA depois de assado? 🍞",
      "No forno o vapor estufa o pão; ao esfriar, o gás encolhe. Se o miolo não firmou, ele murcha. Asse mais um pouco e esfrie devagar! #fisica #pao #cozinha #curiosidades #receita",
      "🍞", "Esfriou, o gás encolheu.", [
    ("Saiu lindo do forno e murchou na bancada? Tem explicação.", "Por que o pão MURCHA?", ["MURCHA?"], v("fresh bread oven")),
    ("No forno, a água da massa vira vapor e o gás das bolhinhas se expande. O pão estufa.", "No forno, o vapor estufa", ["estufa"], a("💨", "Vapor e gás estufam a massa")),
    ("Quando sai, ele esfria rápido. O vapor vira água de novo e o gás encolhe.", "Esfriou, encolheu", ["encolheu"], a("❄️", "Esfriou: o gás encolhe")),
    ("Se o miolo ainda não ficou firme, as paredes das bolhinhas não aguentam e o pão murcha.", "Miolo mole não aguenta", ["Miolo"], v("bread loaf cutting")),
    ("É o mesmo motivo do bolo que abaixa quando você abre o forno antes da hora.", "Igual ao bolo", ["bolo"], v("cake oven")),
    ("A dica é assar mais um pouquinho e deixar esfriar devagar, com o forno entreaberto.", "Asse mais, esfrie devagar", ["devagar"], v("baking bread")),
])

short("GeladeiraEstala", "Por que a geladeira fica ESTALANDO? ❄️",
      "O plástico e o metal dilatam e encolhem quando a geladeira esquenta e esfria. Estalo de vez em quando é normal! #fisica #geladeira #casa #curiosidades #dilatacao",
      "❄️", "Esquenta, dilata. Esfria, encolhe.", [
    ("Aquele estalo da geladeira no meio da noite não é defeito.", "Por que ela ESTALA?", ["ESTALA?"], v("refrigerator kitchen")),
    ("Os materiais aumentam um pouquinho quando esquentam e encolhem quando esfriam.", "Esquenta, dilata", ["dilata"], a("🌡️", "Esquenta dilata, esfria encolhe")),
    ("A geladeira liga e desliga o tempo todo, e o plástico e o metal mudam de tamanho.", "Plástico e metal mexem", ["mexem"], a("🔊", "Plástico e metal mudam de tamanho")),
    ("Nas frost free, ela ainda esquenta de propósito para derreter o gelo, e depois esfria de novo.", "Degelo automático", ["Degelo"], v("open refrigerator")),
    ("Cada mudança faz as peças se ajeitarem com um estalo, igual ao telhado de madeira à noite.", "Igual ao telhado", ["telhado"], v("house roof night")),
    ("Agora, se o barulho for alto e sem parar, ou se ela parar de gelar, chama o técnico.", "Barulho sem parar? Técnico", ["Técnico"], a("🛠️", "Barulho alto e contínuo: técnico")),
])

short("AviaoDeLado", "Por que o avião pousa DE LADO? ✈️",
      "Com vento lateral, o piloto aponta o nariz contra o vento para seguir reto na pista e alinha antes de tocar o chão! #fisica #aviao #piloto #curiosidades #ciencia",
      "✈️", "Nariz contra o vento.", [
    ("Já viu avião chegando de lado na pista? Parece errado, mas é de propósito.", "Pousando DE LADO?", ["LADO?"], v("airplane landing")),
    ("Quando o vento sopra de lado, ele empurra o avião para fora da pista.", "O vento empurra", ["empurra"], a("💨", "O vento empurra para o lado")),
    ("Então o piloto aponta o nariz um pouco contra o vento, e o avião anda reto, mesmo torto.", "Nariz contra o vento", ["vento"], a("✈️", "Nariz contra o vento, anda reto")),
    ("É igual atravessar um rio nadando: você mira um pouco acima para chegar no ponto certo.", "Igual nadar no rio", ["rio"], v("river current")),
    ("Pouco antes de tocar o chão, o piloto alinha o avião com a pista.", "Alinha antes de tocar", ["Alinha"], v("plane runway")),
    ("Por isso, em dia de vento, o pouso parece de lado. Mas está tudo sob controle.", "Tudo sob controle", ["controle"], v("airplane sky clouds")),
])

# ---------- LEVA 6 (04/10): avião, cozinha e casa (avião pousa de lado = 2 mil, o melhor do canal) ----------
short("OuvidoAviao", "Por que o ouvido ENTOPE no avião? ✈️",
      "A pressão da cabine muda na subida e na descida, e o ar atrás do tímpano fica diferente do de fora. Engolir, bocejar ou mascar chiclete iguala tudo! #fisica #aviao #ouvido #curiosidades #viagem",
      "👂", "Engole, e a pressão iguala.", [
    ("Por que o ouvido entope quando o avião sobe ou desce?", "Por que o ouvido ENTOPE?", ["ENTOPE?"], v("airplane window view")),
    ("Lá em cima, a pressão do ar dentro da cabine muda bastante.", "A pressão muda", ["pressão"], a("✈️", "A pressão da cabine muda")),
    ("Atrás do tímpano tem um pouquinho de ar, que fica com a pressão antiga.", "Ar preso atrás do tímpano", ["tímpano"], a("👂", "Ar preso atrás do tímpano")),
    ("A diferença empurra o tímpano para um lado. É isso que dá a sensação de entupido.", "O tímpano é empurrado", ["empurrado"], a("⚠️", "Diferença de pressão empurra o tímpano")),
    ("Quando você engole ou boceja, um canal se abre e a pressão se iguala.", "Engolir abre o canal", ["Engolir"], v("woman yawning")),
    ("Por isso, mascar chiclete na descida ajuda. E para bebê, dar mamadeira ou mamar.", "Chiclete na descida", ["Chiclete"], v("chewing gum")),
])

short("CebolaChorar", "Por que a cebola faz CHORAR? 🧅",
      "Ao cortar, a cebola solta um gás que irrita os olhos, e as lágrimas lavam. Faca afiada e cebola gelada fazem chorar bem menos! #fisica #ciencia #cebola #cozinha #curiosidades",
      "🧅", "É um gás que irrita os olhos.", [
    ("Por que a gente chora quando corta cebola?", "Por que CHORAMOS?", ["CHORAMOS?"], v("cutting onion")),
    ("Quando a faca corta, ela rompe as células da cebola.", "A faca rompe as células", ["rompe"], a("🔪", "A faca rompe as células")),
    ("Duas substâncias que estavam separadas se misturam e formam um gás.", "Forma um gás", ["gás"], a("💨", "Duas substâncias viram um gás")),
    ("Esse gás sobe, chega nos olhos e irrita. Os olhos soltam lágrimas para lavar.", "As lágrimas lavam", ["lavam"], v("crying eyes")),
    ("Faca afiada esmaga menos as células, e solta menos gás.", "Faca afiada ajuda", ["afiada"], v("sharp knife chopping")),
    ("E cebola gelada também ajuda: no frio, o gás demora mais para subir.", "Cebola gelada", ["gelada"], v("onions kitchen")),
])

short("LeiteSobe", "Por que o leite SOBE quando ferve? 🥛",
      "No leite, as proteínas e a gordura formam uma película que prende as bolhas de vapor, e a espuma sobe. Baixe o fogo e mexa! #fisica #leite #cozinha #curiosidades #ciencia",
      "🥛", "A película prende o vapor.", [
    ("Por que o leite derrama quando ferve, e a água não?", "Por que o leite SOBE?", ["SOBE?"], v("boiling milk")),
    ("Quando ferve, a água vira vapor e forma bolhas que sobem.", "Bolhas de vapor", ["vapor"], a("💨", "A água vira bolhas de vapor")),
    ("Na água, as bolhas chegam em cima e estouram. Simples.", "Na água, elas estouram", ["estouram"], v("boiling water pot")),
    ("No leite, as proteínas e a gordura formam uma película na superfície.", "Uma película em cima", ["película"], a("🥛", "Proteína e gordura fazem uma película")),
    ("Essa película prende as bolhas, a espuma cresce e o leite sobe de uma vez.", "A espuma sobe", ["sobe"], v("milk pot stove")),
    ("Para não derramar, baixa o fogo quando começar a esquentar e vai mexendo.", "Baixe o fogo e mexa", ["mexa"], v("stirring pot")),
])

short("ChuveiroChoque", "Por que o chuveiro dá CHOQUE? ⚡",
      "A água conduz eletricidade. Sem fio terra ou com resistência danificada, a corrente passa pelo seu corpo. Chame um eletricista e use fio terra! #fisica #chuveiro #eletricidade #casa #seguranca",
      "⚡", "Fio terra salva.", [
    ("Já levou choque no chuveiro? Isso é sinal de perigo.", "Choque no CHUVEIRO?", ["CHUVEIRO?"], v("shower water")),
    ("O chuveiro elétrico esquenta a água com uma resistência ligada na energia.", "Resistência esquenta a água", ["Resistência"], a("🔥", "A resistência esquenta a água")),
    ("A água da torneira conduz eletricidade, por causa dos sais dissolvidos nela.", "A água conduz", ["conduz"], a("💧", "Água com sais conduz eletricidade")),
    ("Se falta o fio terra, ou a resistência estragou, a corrente escapa pela água e pelo metal.", "A corrente escapa", ["escapa"], a("⚡", "Sem fio terra, a corrente escapa")),
    ("E ela passa pelo seu corpo até o chão. É o choque.", "Passa pelo seu corpo", ["corpo"], v("bathroom shower")),
    ("A solução é fio terra e um disjuntor DR. Nunca mexe no chuveiro ligado: chama um eletricista.", "Chame um eletricista", ["eletricista"], v("electrician working")),
])

short("AviaoCurva", "Como o avião faz CURVA no ar? ✈️",
      "O piloto inclina as asas. A força que segura o avião fica inclinada e puxa ele para o lado da curva, igual a bicicleta deitando! #fisica #aviao #piloto #curiosidades #ciencia",
      "✈️", "Inclina a asa, faz a curva.", [
    ("No ar não tem estrada nem volante. Então, como o avião faz curva?", "Como ele faz CURVA?", ["CURVA?"], v("airplane banking turn")),
    ("As asas criam uma força para cima, que segura o avião no ar.", "Força para cima", ["cima"], a("⬆️", "As asas empurram para cima")),
    ("Para virar, o piloto inclina o avião, abaixando uma asa e levantando a outra.", "O piloto inclina", ["inclina"], a("✈️", "Uma asa desce, a outra sobe")),
    ("Agora essa força fica inclinada, e uma parte dela puxa o avião para o lado.", "A força puxa de lado", ["lado"], a("↗️", "A força inclinada puxa de lado")),
    ("É igual andar de bicicleta: para fazer curva, você deita a bicicleta.", "Igual a bicicleta", ["bicicleta"], v("cyclist turning")),
    ("Por isso, numa curva, a janela de um lado mostra o céu e a do outro mostra o chão.", "Céu de um lado, chão do outro", ["chão"], v("airplane wing sky")),
])

pasta = Path(__file__).resolve().parent / "roteiros"
for s in S:
    (pasta / f"{s['id']}.json").write_text(json.dumps(s, ensure_ascii=False, indent=1), encoding="utf-8")
print(len(S), "roteiros")
