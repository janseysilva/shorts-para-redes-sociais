"""Roteiros da leva 7 (04/10: buscas em alta — senha do Wi-Fi, anúncios, ligações desconhecidas, limite de apps, espaço). Uso: python roteiros_leva7.py"""
import json
from pathlib import Path

FIM = "Salva esse vídeo e me segue para mais truques de celular."
R = {
    "WifiVerSenha": ["Esqueceu a senha do Wi-Fi da sua casa? Dá para ver no celular.",
                  "Vai em Configurações, Wi-Fi, e toca na rede em que você está conectado.",
                  "Toca em Compartilhar e confirma com a sua digital.",
                  "Aparece um QR code, e em muitos celulares a senha aparece logo embaixo.",
                  "Se não aparecer, é só ler o QR code com a câmera de outro celular."],
    "BloquearAnuncios": ["Chega de anúncio pulando no celular. Dá para bloquear quase tudo.",
                         "Vai em Configurações, procura DNS privado e toca nele.",
                         "Escolhe nome do host e digita o endereço que está na tela.",
                         "Salva, e pronto: a maioria dos anúncios some dos aplicativos e dos sites.",
                         "Só não funciona nos anúncios do YouTube. Para voltar, é só desligar."],
    "LigacoesDesconhecidas": ["Cansado de ligação de número estranho no WhatsApp? Silencia todas.",
                              "Vai em Configurações, Privacidade, e toca em Ligações.",
                              "Liga a opção Silenciar números desconhecidos.",
                              "Pronto: o celular não toca mais. A ligação só aparece na lista, para você ver depois.",
                              "E os contatos que você salvou continuam tocando normal."],
    "LimiteApps": ["Passa horas no Instagram e no TikTok sem perceber? Coloca um limite.",
                   "Vai em Configurações, Bem-estar digital, e abre o painel.",
                   "Toca no aplicativo e escolhe o timer. Por exemplo, trinta minutos por dia.",
                   "Quando o tempo acaba, o ícone fica cinza e o aplicativo não abre mais até amanhã.",
                   "Funciona com qualquer aplicativo. O seu tempo agradece."],
    "ArquivosLimpar": ["Celular sem espaço? Tem um aplicativo que limpa em segundos.",
                      "Abre o aplicativo Arquivos, do Google. Em muitos Android ele já vem instalado.",
                      "Toca em Limpar. Ele mostra arquivos inúteis, fotos repetidas e vídeos grandes.",
                      "Confere o que vai sair e toca em Limpar de novo.",
                      "Pronto! Espaço livre, sem apagar o que importa."],
}
pasta = Path(__file__).resolve().parent / "roteiros"
for k, fr in R.items():
    (pasta / f"{k}.json").write_text(json.dumps({"id": k, "frases": fr + [FIM]}, ensure_ascii=False), encoding="utf-8")
print(len(R), "roteiros")
