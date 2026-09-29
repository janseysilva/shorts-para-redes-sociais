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

pasta = Path(__file__).resolve().parent / "roteiros"
for s in S:
    (pasta / f"{s['id']}.json").write_text(json.dumps(s, ensure_ascii=False, indent=1), encoding="utf-8")
print(len(S), "roteiros")
