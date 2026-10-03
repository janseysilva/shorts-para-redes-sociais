"""Roteiros da leva 5 (02/10: WhatsApp e hábitos — o que mais teve visualização). Uso: python roteiros_leva5.py"""
import json
from pathlib import Path

FIM = "Salva esse vídeo e me segue para mais truques de celular."
R = {
    "MsgApagadas": ["Apagaram a mensagem antes de você ler? Dá para ver.",
                    "No Android, vai em Configurações, Notificações, e ativa o Histórico de notificações.",
                    "A partir daí, toda notificação que chega fica guardada ali.",
                    "Se a pessoa apagar a mensagem, o texto continua no histórico.",
                    "Só funciona para mensagens que chegarem depois de ativar, e o texto pode aparecer cortado."],
    "CelularRapido": ["Deixa o celular mais rápido em dez segundos, sem apagar nada.",
                      "Em Configurações, Sobre o telefone, toca sete vezes em Número da versão.",
                      "Pronto, apareceram as Opções do desenvolvedor.",
                      "Lá dentro, muda as três escalas de animação para meio x.",
                      "As telas abrem bem mais rápido. Para voltar ao normal, é só colocar um x de novo."],
    "Bloqueado": ["Será que alguém te bloqueou no WhatsApp? Repara em três sinais.",
                  "Um: a foto do perfil sumiu, e você não vê mais o visto por último nem o online.",
                  "Dois: sua mensagem fica com um tique só, cinza, e nunca chega.",
                  "Três: a ligação pelo WhatsApp não completa.",
                  "Se acontecerem os três juntos, é bem provável que você foi bloqueado. Um sinal sozinho pode ser só privacidade."],
    "Backup": ["Vai trocar de celular? Não perca as conversas do WhatsApp.",
               "Vai em Configurações, Conversas, e toca em Backup de conversas.",
               "Confere a conta do Google e toca em Fazer backup.",
               "No celular novo, entra com o mesmo número e a mesma conta, e toca em Restaurar.",
               "Pronto! Conversas, fotos e áudios voltam todos. Deixa o backup automático ligado."],
    "Enquete": ["Vai combinar o churrasco com a família? Faz uma enquete no WhatsApp.",
                "Abre a conversa ou o grupo, toca no clipe e escolhe Enquete.",
                "Escreve a pergunta e as opções de resposta.",
                "Pronto! Cada um vota com um toque, e você vê o resultado na hora.",
                "Dá até para deixar votar em mais de uma opção."],
}
pasta = Path(__file__).resolve().parent / "roteiros"
for k, fr in R.items():
    (pasta / f"{k}.json").write_text(json.dumps({"id": k, "frases": fr + [FIM]}, ensure_ascii=False), encoding="utf-8")
print(len(R), "roteiros")
