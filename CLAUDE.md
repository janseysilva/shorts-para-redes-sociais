# Shorts diários — regras e andamento (leia antes de tudo)

Jansey publica Shorts todo dia em 3 canais da conta Google **janseysilva@gmail.com** (nunca usar o e-mail da SEMED):
- **Office Sem Mistério** — @OfficeSemMisterio, id UCHTp4sbrZY-hB7Y-Fk5vmnw → `office-sem-misterio/`
- **Truques de Celular** — @TruquesdeCelular, id UCSbkcTcpsPVAu7fJWCcXxBg → `truques-de-celular/`
- **Física Sem Mistério** — @FisicaSemMisterioBR, id UCT2vkKl3PRcdMrPiU_NLp7w → `fisica-sem-misterio/`
- Canal infantil (`canal-infantil/`): **parado — não mexer**.

Cada pasta tem um `CLAUDE.md` com o passo a passo completo de produção e publicação. Leia o do canal antes de mexer.

## Regras de Jansey (sempre)
1. Responder em **português (pt-BR)**.
2. **Mostrar os temas primeiro e esperar o OK** antes de produzir qualquer vídeo.
3. **Nunca publicar sem autorização** ("publique todos" = autorizado para aquela leva).
4. Só temas **em alta**: autocomplete do YouTube Brasil (`https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&hl=pt-BR&gl=BR&q=...`) + as visualizações dos próprios canais (páginas públicas `youtube.com/@CANAL/shorts`).
5. O tamanho do vídeo não é o problema, e sim o assunto.
6. Perguntar antes de dar push no GitHub.

## Fluxo de cada dia
1. `git pull`, ver as visualizações de ontem, propor 5 temas por canal → esperar OK.
2. Produzir (Física renderiza ~10 min por vídeo; Celular e Office mais rápido) e conferir quadros de cada vídeo.
3. Montar uma página de revisão (artifact) com vídeo, título e descrição → esperar "publique".
4. Publicar pelo Claude in Chrome (arquivos ≤ 10 MB numa pasta de upload; Física em 2 passadas a 1650k). Descrições sem `<` e `>`.
   - Conferir em `youtube.com/channel_switcher` que aparecem os 3 canais (em 04/10 o Chrome abriu primeiro num outro perfil, "JANSEY FELIX SILVA").
5. Atualizar os `CLAUDE.md` dos canais e dar push (com OK).

## O que está dando certo (04/10)
- **Física** é o canal que mais cresce (41 inscritos): "por que" de cozinha, casa e avião. Avião pousa de lado = 2 mil (recorde). Espaço e escala fracassam.
- **Office** (14 inscritos): PowerPoint visual, dinheiro/planilhas úteis, ABNT. Slide que parece filme (995), PDF vira Word (710).
- **Truques** (11 inscritos): WhatsApp, privacidade e vício no celular. Vício (715), letras (592), mensagem apagada (584).

## Totais publicados em 04/10
Office 45 · Truques 45 · Física 40.

## Próximo passo combinado
Levar os vídeos para **TikTok, Instagram e Facebook**, começando pelo Física:
- Jansey cria as contas (Claude não cria conta nem digita senha) e liga o Instagram a uma Página do Facebook.
- Aquecer 2 dias sem postar; depois 1 vídeo por dia em cada rede, começando pelos que mais deram certo no YouTube.
- No TikTok, ligar o rótulo de conteúdo gerado por IA (a voz é sintética). Usar sempre os arquivos originais, sem marca d'água.
- Instagram e Facebook pelo Meta Business Suite, que publica nos dois e deixa agendar.
- Na 2ª semana, se a média passar de 500 visualizações, subir para 2 por dia com 3 a 4 horas de intervalo.

## PC novo
Instalar Node, ffmpeg (winget) e Python com `edge-tts numpy soundfile sherpa-onnx playwright pillow` + `playwright install chromium`, depois `npm install` nas 3 pastas `video/`. Itens no .gitignore precisam ser gerados de novo: voz Faber (`office-sem-misterio/tts/`), clipes do Pexels (`fisica-sem-misterio/video/public/clipes/`, com `python baixar_clipes.py`).
