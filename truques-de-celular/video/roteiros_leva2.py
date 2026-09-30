"""Roteiros da leva 2 (temas em alta: segurança, golpes, novidades do WhatsApp e do Pix). Uso: python roteiros_leva2.py"""
import json
from pathlib import Path

FIM = "Salva esse vídeo e me segue para mais truques de celular."
R = {
    "DuasEtapas": ["Não deixa ninguém clonar o seu WhatsApp.", "Vai em Configurações, Conta, e Confirmação em duas etapas.",
                   "Toca em Ativar e cria um PIN de seis números.",
                   "Pronto! Mesmo que alguém consiga o código do SMS, sem o PIN não entra.",
                   "E nunca passa esse código para ninguém, nem para quem diz ser do WhatsApp."],
    "PinChip": ["Roubaram o celular? Protege o seu número.", "Vai em Configurações, Segurança, e procura Bloqueio do chip.",
                "Liga o bloqueio e digita o PIN do chip. O primeiro vem no cartãozinho da operadora.",
                "Pronto! Se colocarem o seu chip em outro celular, ele pede a senha.",
                "Cuidado: errar três vezes bloqueia o chip. Guarda o PIN num lugar seguro."],
    "Transcrever": ["Não dá para ouvir o áudio agora? Lê ele!",
                    "No WhatsApp, vai em Configurações, Conversas, e liga a Transcrição de mensagens de voz.",
                    "Depois, é só tocar em Transcrever, embaixo do áudio.", "Pronto! O áudio vira texto na hora.",
                    "Ótimo para áudio comprido, ou quando você está num lugar barulhento."],
    "PixAproximacao": ["Já dá para pagar com Pix só encostando o celular.", "No app do banco, procura Pix por aproximação e ativa.",
                       "Na hora de pagar, avisa que é Pix e encosta o celular na maquininha.",
                       "Confirma com a digital ou com o rosto, e pronto!",
                       "Por enquanto, funciona em celular Android, com o NFC ligado."],
    "GolpePix": ["Número novo pedindo Pix? Cuidado!", "Oi, mãe! Troquei de número. Me faz um Pix urgente?",
                 "Número desconhecido, pressa, e pedido de dinheiro: é golpe.",
                 "Antes de qualquer coisa, liga para o número antigo da pessoa.",
                 "E nunca faz Pix com pressa. Golpista sempre diz que é urgente."],
}
pasta = Path(__file__).resolve().parent / "roteiros"
for k, fr in R.items():
    (pasta / f"{k}.json").write_text(json.dumps({"id": k, "frases": fr + [FIM]}, ensure_ascii=False), encoding="utf-8")
print(len(R), "roteiros")
