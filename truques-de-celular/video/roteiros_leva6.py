"""Roteiros da leva 6 (03/10: buscas em alta de WhatsApp e celular). Uso: python roteiros_leva6.py"""
import json
from pathlib import Path

FIM = "Salva esse vídeo e me segue para mais truques de celular."
R = {
    "EsconderOnline": ["Quer usar o WhatsApp sem ninguém saber que você está online? Dá.",
                       "Vai em Configurações, Privacidade, e toca em Visto por último e online.",
                       "No visto por último, escolhe Ninguém.",
                       "E em quem pode ver quando estou online, escolhe Mesmo que visto por último.",
                       "Pronto, ninguém vê mais. Só lembra: assim você também não vê o online dos outros."],
    "StatusEscondido": ["Quer ver o status de alguém sem a pessoa saber? É simples.",
                        "Vai em Configurações, Privacidade, e desliga Confirmações de leitura.",
                        "Agora você vê os status, e o seu nome não aparece na lista de quem viu.",
                        "O lado ruim: você também não vê quem viu os seus, e os tiques azuis somem.",
                        "Depois, é só ligar de novo quando quiser."],
    "Figurinha": ["Transforma qualquer foto sua em figurinha, direto no WhatsApp.",
                  "Na conversa, toca no ícone de figurinhas e depois no botão de mais.",
                  "Escolhe a foto da galeria. Dá para recortar, escrever e colocar emoji.",
                  "Toca em enviar, e a figurinha já vai para a conversa.",
                  "E ela fica salva nas suas figurinhas para usar de novo."],
    "QuemLeu": ["Mandou mensagem no grupo e quer saber quem leu? Tem como.",
                "Segura o dedo em cima da sua mensagem.",
                "Toca nos três pontinhos e escolhe Dados.",
                "Aparece a lista: quem leu, e para quem só foi entregue.",
                "Se alguém desligou a confirmação de leitura, o nome não aparece em lida."],
    "Teclado": ["Três truques escondidos no teclado do celular que pouca gente usa.",
                "Um: desliza o dedo na barra de espaço, e o cursor anda pelo texto.",
                "Dois: segura uma letra para aparecer o número e os acentos.",
                "Três: toca duas vezes na setinha, e tudo fica em maiúsculo.",
                "Funciona no teclado do Google e no da Samsung. Testa agora!"],
}
pasta = Path(__file__).resolve().parent / "roteiros"
for k, fr in R.items():
    (pasta / f"{k}.json").write_text(json.dumps({"id": k, "frases": fr + [FIM]}, ensure_ascii=False), encoding="utf-8")
print(len(R), "roteiros")
