# LEVA 31 (25/11): formato novo "VOCE EM PERIGO" (animacao 2D por codigo, src/Perigo.tsx). Nao usar "matar/morte" (regra do Jansey).
# Fontes: Cemig e Bombeiros PR (20 m) via Gazeta SP; Defesa Civil SP (metade da roda, janela, teto, 199/193); NWS/NOAA (12 in = 30 cm; 18-24 in = 60 cm).
# 60 kg por cm: conta nossa, ~6 m2 de area (4 x 1,5 m) x 1 cm de agua = 60 kg. Tensoes do fio na tela = EXEMPLO.
import json
F = {
"FioCaido": ("FIO CAÍDO perto de você: o passo NORMAL é o erro ⚡", [
 "Se um fio de energia cair perto de você, não corra.",
 "Um passo normal pode te dar choque, mesmo sem encostar no fio.",
 "Quando o cabo toca o chão, a eletricidade se espalha em círculos, como uma pedra jogada na água.",
 "Perto do fio, a tensão é alta. Mais longe, ela vai caindo.",
 "Com as pernas abertas, cada pé pisa numa tensão diferente. Essa diferença empurra a corrente por uma perna e de volta pela outra.",
 "É a tensão de passo. Quanto maior o passo, maior o choque.",
 "Então faça assim. Um: junte os pés.",
 "Dois: afaste-se do fio arrastando os pés, em passinhos bem curtos, sem tirar do chão.",
 "Três: só pare a uns vinte metros, e ligue um nove três.",
 "Está dentro do carro e o fio caiu em cima? Fique dentro, e espere desligarem a rede.",
 "E nunca empurre o fio com um pau, nem puxe alguém pela mão.",
 "Manda pra quem sai na rua depois da chuva."],
 "Um fio caído pode energizar o chão em volta dele. Como a tensão diminui com a distância, cada pé pode pisar numa tensão diferente: é a tensão de passo, e quanto maior o passo, maior o choque. Por isso a orientação é não correr: pés juntos, passinhos curtos arrastando no chão, longe do fio, e ligar 193 e para a distribuidora de energia. Dentro do carro, fique dentro até desligarem a rede. Os valores de tensão do vídeo são um exemplo. Fontes: Cemig e Corpo de Bombeiros do Paraná. #fisica #seguranca #eletricidade #chuva #ciencia",
 "Você sabia que o passo era o problema? 👇"),
"CarroEnchente": ("CARRO na ENCHENTE: quanta água basta para ele BOIAR? 🚗🌊", [
 "Se a água cobrir a rua na sua frente, não tente passar.",
 "Parece raso, e é aí que muita gente erra.",
 "Seu carro pesa mais ou menos uma tonelada. Só que a água empurra ele pra cima.",
 "Cada centímetro que sobe na carroceria tira uns sessenta quilos do peso nos pneus.",
 "Com trinta centímetros de água correndo, um carro pequeno já pode ser levado.",
 "Com sessenta, vai até uma caminhonete.",
 "E você nem vê o buraco que está embaixo.",
 "Então dê meia-volta. Mas e se já ficou preso?",
 "Um: não ligue o motor de novo.",
 "Dois: a água passou da metade da roda? Saia já. Se a porta não abrir, saia pela janela.",
 "Três: suba no teto e ligue um nove três. Não pule na correnteza.",
 "Manda pra quem dirige na chuva."],
 "Um carro de uma tonelada parece pesado demais para boiar, mas a água empurra a carroceria para cima: cada centímetro tira uns 60 kg do peso que está nos pneus (conta aproximada para um carro pequeno). Com cerca de 30 cm de água corrente, um carro pequeno já pode ser levado; com uns 60 cm, até uma caminhonete. Viu água na pista, dê meia-volta. Ficou preso: não dê partida, saia quando passar da metade da roda (pela janela, se a porta não abrir), suba no teto e ligue 193 ou 199. Fontes: Defesa Civil de SP e NWS/NOAA. #fisica #chuva #enchente #carro #ciencia",
 "Você passaria nessa água? 👇"),
}
for i,(t,fr,leg,per) in F.items():
    json.dump({"id":i,"titulo":t,"frases":fr,"legenda":leg,"pergunta":per,"cenas":[{"gancho":""} for _ in fr[:-1]],"final":{"emoji":"","frase":""}},open(f"roteiros/{i}.json","w",encoding="utf-8"),ensure_ascii=False,indent=1)
