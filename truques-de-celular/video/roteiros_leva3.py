"""Roteiros da leva 3 (01/10: temas em alta nas buscas — privacidade no WhatsApp, golpes e celular roubado). Uso: python roteiros_leva3.py"""
import json
from pathlib import Path

FIM = "Salva esse vídeo e me segue para mais truques de celular."
R = {
    "LerEscondido": ["Quer ler a mensagem sem a pessoa saber que você viu?",
                     "Vai em Configurações, Privacidade, e desliga Confirmações de leitura.",
                     "Pronto! Os risquinhos azuis não aparecem mais para ninguém.",
                     "E em Visto por último e online, dá para esconder quando você está online.",
                     "Só lembra: assim você também não vê quem leu as suas. E nos grupos, a confirmação continua."],
    "TrancarConversa": ["Tem conversa que ninguém pode ver? Tranca ela!",
                        "Abre a conversa e toca no nome da pessoa, lá em cima.",
                        "Desce até Bloqueio de conversa, liga e confirma com a sua digital.",
                        "Pronto! Ela some da lista e vai para a pasta Conversas trancadas.",
                        "Para abrir, puxa a lista para baixo e usa a digital."],
    "FotoPerfil": ["Qualquer pessoa pode ver a sua foto no WhatsApp? Resolve isso agora.",
                   "Vai em Configurações, Privacidade, e toca em Foto do perfil.",
                   "Escolhe Meus contatos. Assim, só quem você salvou vê a sua foto.",
                   "Dá para fazer o mesmo com o Visto por último e com o Recado.",
                   "Golpista usa a sua foto para se passar por você. Não facilita!"],
    "FalsaCentral": ["Ligaram dizendo que é do seu banco? Cuidado!",
                     "Sua conta foi invadida. Para cancelar a compra, preciso da sua senha e do código que chegou no seu celular.",
                     "Banco nunca pede senha, nem código, nem Pix de teste.",
                     "Desliga na hora e liga você mesmo para o número que está atrás do cartão.",
                     "E, se puder, liga de outro telefone, porque o golpista pode deixar a linha presa."],
    "CelularSeguro": ["Roubaram o seu celular? Tem um jeito de bloquear tudo de uma vez.",
                      "É o Celular Seguro, do governo federal. Baixa o app ou entra no site, com a sua conta gov.",
                      "Cadastra o seu celular e uma pessoa de confiança.",
                      "Se roubarem, você ou essa pessoa toca em Emitir alerta.",
                      "Na hora, os bancos e as operadoras parceiros bloqueiam o acesso. Faz isso hoje, antes de precisar!"],
}
pasta = Path(__file__).resolve().parent / "roteiros"
for k, fr in R.items():
    (pasta / f"{k}.json").write_text(json.dumps({"id": k, "frases": fr + [FIM]}, ensure_ascii=False), encoding="utf-8")
print(len(R), "roteiros")
