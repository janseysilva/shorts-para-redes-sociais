"""Roteiros da leva 4 (01/10, noite: formato dos virais — segredos do WhatsApp, golpe para compartilhar, vício). Uso: python roteiros_leva4.py"""
import json
from pathlib import Path

FIM = "Salva esse vídeo e me segue para mais truques de celular."
R = {
    "FuncoesSecretas": ["Três funções secretas do WhatsApp que quase ninguém usa.",
                        "Um: toque em nova conversa e escolha o seu próprio nome. Vira um bloco de notas.",
                        "Dois: segure uma mensagem e toque em Fixar. Ela fica presa no topo da conversa.",
                        "Três: antes de mandar uma foto, toque no número um. Ela some depois de vista.",
                        "Qual delas você não conhecia? Testa agora!"],
    "GolpeAdvogado": ["Novo golpe! Manda esse vídeo para a sua mãe.",
                      "Parabéns, você ganhou o processo! Para liberar o dinheiro, pague a taxa por Pix.",
                      "É o golpe do falso advogado. Eles usam dados reais do seu processo para parecer verdade.",
                      "Advogado de verdade não cobra taxa por Pix para liberar dinheiro de processo.",
                      "Desconfiou? Liga para o escritório pelo número que você já conhece, ou confere no site da OAB."],
    "Clonado": ["Como saber se alguém está usando o seu WhatsApp?",
                "Vai em Configurações e toca em Dispositivos conectados.",
                "Ali aparece todo computador com o seu WhatsApp aberto.",
                "Não reconhece algum? Toca nele e em Desconectar.",
                "E se o WhatsApp sair sozinho do seu celular, alguém registrou o seu número. Ative a confirmação em duas etapas."],
    "LetrasWhatsApp": ["Quer escrever em negrito no WhatsApp? É só usar símbolos.",
                       "Asterisco antes e depois da palavra deixa em negrito.",
                       "Com o traço de baixo, fica em itálico.",
                       "Com o til, a palavra fica riscada.",
                       "E com três acentos graves, vira letra de máquina de escrever."],
    "ViciCelular": ["Não consegue largar o celular? Deixa ele em preto e branco.",
                    "Vai em Configurações, Bem-estar digital, e toca em Modo hora de dormir.",
                    "Liga a Escala de cinza, e a tela perde as cores.",
                    "Sem cor, os aplicativos ficam sem graça, e você usa bem menos.",
                    "Dá até para programar para ligar sozinho à noite."],
}
pasta = Path(__file__).resolve().parent / "roteiros"
for k, fr in R.items():
    (pasta / f"{k}.json").write_text(json.dumps({"id": k, "frases": fr + [FIM]}, ensure_ascii=False), encoding="utf-8")
print(len(R), "roteiros")
