"""Roteiros da leva 8 (05/10: buscas em alta — celular como webcam, fotos apagadas, número do chip, online no Instagram, câmera embaçada). Uso: python roteiros_leva8.py"""
import json
from pathlib import Path

FIM = "Salva esse vídeo e me segue para mais truques de celular."
R = {
    "CelularWebcam": ["Seu computador não tem câmera? Use a do seu celular.",
                      "Liga o celular no computador com o cabo USB.",
                      "Puxa a barra de notificações e toca na opção do USB.",
                      "Escolhe Webcam. Pronto: o computador já enxerga a câmera do celular.",
                      "Funciona no Meet, no Zoom e no Teams. Se o seu celular não tiver essa opção, usa o aplicativo DroidCam."],
    "FotosApagadas": ["Apagou uma foto sem querer? Ela ainda pode estar no celular.",
                      "Abre o Google Fotos, toca em Coleções e depois em Lixeira.",
                      "Segura a foto que você quer e toca em Restaurar.",
                      "Pronto: ela volta para a galeria, no mesmo lugar de antes.",
                      "Mas não demora: a foto fica na lixeira só por trinta a sessenta dias."],
    "NumeroChip": ["Chip novo e não sabe o número? Dá para ver no próprio celular.",
                   "Vai em Configurações e toca em Sobre o telefone.",
                   "Toca em Status, ou em Informações do SIM.",
                   "O seu número aparece ali, em Número de telefone.",
                   "Se aparecer desconhecido, liga para alguém de confiança: o número aparece na tela da pessoa."],
    "InstagramOnline": ["Não quer que vejam que você está online no Instagram? Dá para esconder.",
                        "Vai no seu perfil, toca nas três linhas e depois em Mensagens e respostas aos stories.",
                        "Toca em Mostrar status de atividade.",
                        "Desliga a chave. Pronto: ninguém mais vê o pontinho verde nem quando você esteve ativo.",
                        "Só que vale para os dois lados: você também deixa de ver o online dos outros."],
    "CameraEmbacada": ["Foto saindo embaçada? Às vezes a culpa é só uma marca de dedo na lente.",
                       "Pega um pano macio, desses de limpar óculos, e limpa a lente em círculos.",
                       "Nada de camiseta, papel ou álcool forte: eles riscam e estragam a lente.",
                       "Se ainda não focar, toca na tela em cima do que você quer. O celular foca ali.",
                       "E confere se a capinha ou a película não está cobrindo a câmera."],
}
pasta = Path(__file__).resolve().parent / "roteiros"
for k, fr in R.items():
    alvo = pasta / f"{k}.json"
    assert not alvo.exists() or json.loads(alvo.read_text(encoding="utf-8"))["frases"][:-1] == fr, f"{k} já existe com outro texto!"
    alvo.write_text(json.dumps({"id": k, "frases": fr + [FIM]}, ensure_ascii=False), encoding="utf-8")
print(len(R), "roteiros")
