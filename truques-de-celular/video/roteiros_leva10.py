"""Roteiros da leva 10 (07/10: buscas em alta — celular sem som, não carrega, Gmail cheio, modo de segurança, Wi-Fi sem internet). Uso: python roteiros_leva10.py"""
import json
from pathlib import Path

FIM = "Salva esse vídeo e me segue para mais truques de celular."
R = {
    "CelularSemSom": ["Celular sem som, mesmo com o volume no máximo? Pode ser que ele ache que tem um fone conectado.",
                      "Puxa a barra de notificações. Se aparecer o desenho de um fone, é isso.",
                      "Coloca e tira o fone algumas vezes, e limpa a entrada com uma escova seca, sem molhar.",
                      "Confere também se o Não perturbe está desligado, e se não tem fone bluetooth conectado.",
                      "Se nada disso resolver, reinicia o celular."],
    "NaoCarrega": ["Celular não carrega, ou fica só no raio? Calma, nem sempre é a bateria.",
                   "Primeiro, troca o cabo e a tomada. Cabo quebrado por dentro é o motivo mais comum.",
                   "Depois, olha a entrada: poeira do bolso se acumula lá dentro. Limpa com cuidado, com uma escova seca.",
                   "Apareceu aviso de umidade? Tira o cabo e deixa o celular secar por algumas horas. Nada de secador.",
                   "Se ainda não carregar, pode ser a bateria ou a entrada. Aí leva na assistência."],
    "GmailCheio": ["Gmail cheio e sem espaço para receber e-mail? Dá para liberar em minutos.",
                   "Os quinze gigas grátis do Google são divididos entre o Gmail, o Fotos e o Drive.",
                   "No Gmail, abre Promoções, seleciona tudo e apaga. São milhares de e-mails inúteis.",
                   "Na busca, digita larger, dois pontos, 10M. Aparecem os e-mails com anexos grandes. Apaga os que não precisa.",
                   "No fim, esvazia a lixeira. Senão, o espaço não volta."],
    "ModoSeguranca": ["Apareceu Modo de segurança no canto da tela e os seus aplicativos sumiram? Calma, é fácil sair.",
                      "Esse modo liga quando o celular acha que algum aplicativo está com problema, ou quando você segura o botão errado ao ligar.",
                      "Para sair, segura o botão de ligar e toca em Reiniciar.",
                      "Em alguns celulares, dá para sair pelas notificações: toca no aviso Modo de segurança ativado.",
                      "Se ele voltar, desinstala o último aplicativo que você baixou."],
    "WifiSemInternet": ["Wi-Fi conectado, mas sem internet? Antes de ligar para a operadora, faz isso.",
                        "Tira o roteador da tomada, espera trinta segundos e liga de novo.",
                        "No celular, segura o nome da rede e toca em Esquecer. Depois conecta de novo, com a senha.",
                        "Ainda não? Liga e desliga o modo avião. Isso reinicia a conexão do celular.",
                        "Se os outros aparelhos também estão sem internet, o problema é da operadora. Aí sim, liga para eles."],
}
pasta = Path(__file__).resolve().parent / "roteiros"
for k, fr in R.items():
    alvo = pasta / f"{k}.json"
    assert not alvo.exists() or json.loads(alvo.read_text(encoding="utf-8"))["frases"][:-1] == fr, f"{k} já existe com outro texto!"
    alvo.write_text(json.dumps({"id": k, "frases": fr + [FIM]}, ensure_ascii=False), encoding="utf-8")
print(len(R), "roteiros")
