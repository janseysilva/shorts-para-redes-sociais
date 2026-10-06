"""Roteiros da leva 9 (06/10: buscas em alta — tirar vírus, celular desligando sozinho, senhas salvas, esconder apps, TalkBack). Uso: python roteiros_leva9.py"""
import json
from pathlib import Path

FIM = "Salva esse vídeo e me segue para mais truques de celular."
R = {
    "TirarVirus": ["Anúncio pulando do nada e celular estranho? Pode ser vírus. Dá para tirar.",
                   "Abre a Play Store, toca na sua foto e depois em Play Protect.",
                   "Toca em Verificar. Ele procura aplicativos perigosos no celular.",
                   "Achou algum? Toca em Desinstalar. E apaga também qualquer app que você não conhece.",
                   "Daqui para frente, só baixa aplicativo pela Play Store."],
    "DesligaSozinho": ["Celular desligando sozinho? Antes de levar no conserto, faz esses testes.",
                       "Primeiro, olha a bateria: em Configurações, Bateria, veja se ela está fraca ou esquentando.",
                       "Depois, atualiza o celular: Configurações, Sistema, Atualização de software.",
                       "Aplicativo com defeito também derruba o celular. Apaga o último que você baixou antes do problema.",
                       "Se continuar, é bateria gasta. Aí só a assistência troca."],
    "SenhasSalvas": ["Esqueceu uma senha? O seu celular pode ter guardado ela para você.",
                     "Vai em Configurações, Google, e toca em Gerenciador de senhas.",
                     "Aparecem todos os sites e aplicativos que você salvou. Toca no que você quer.",
                     "Confirma com a digital e toca no olhinho: a senha aparece.",
                     "No computador, dá para ver no site passwords ponto google ponto com."],
    "EsconderApps": ["Quer esconder um aplicativo no celular, sem apagar?",
                     "Segura o dedo na tela inicial e toca em Configurações.",
                     "Procura Ocultar aplicativos e marca os que você quer esconder.",
                     "Pronto: o ícone some da tela, mas o aplicativo continua no celular.",
                     "Para mostrar de novo, é só voltar ali e desmarcar. Em alguns celulares, chama Espaço privado."],
    "TalkBack": ["Celular falando tudo sozinho e o toque não funciona direito? Ligou o TalkBack sem querer.",
                 "Aperta e segura os dois botões de volume juntos, por três segundos.",
                 "Pronto. Na maioria dos celulares, ele desliga na hora.",
                 "Não funcionou? Com ele ligado, toca uma vez para escolher e duas vezes para abrir. Vai em Acessibilidade, TalkBack, e desliga.",
                 "E para rolar a tela enquanto ele está ligado, usa dois dedos."],
}
pasta = Path(__file__).resolve().parent / "roteiros"
for k, fr in R.items():
    alvo = pasta / f"{k}.json"
    assert not alvo.exists() or json.loads(alvo.read_text(encoding="utf-8"))["frases"][:-1] == fr, f"{k} já existe com outro texto!"
    alvo.write_text(json.dumps({"id": k, "frases": fr + [FIM]}, ensure_ascii=False), encoding="utf-8")
print(len(R), "roteiros")
