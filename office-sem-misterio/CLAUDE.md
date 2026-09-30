# Office Sem Mistério — canal de shorts "sem aparecer" (era "Excel Sem Mistério")

## Objetivo
Canal de YouTube Shorts (depois TikTok e Reels) com dicas rápidas de Excel, Word e PowerPoint para escola e escritório,
para gerar renda. A dona do projeto não grava nem fala: Claude faz roteiro, animação, narração e vídeo;
ela só aprova e posta.

## Decisões já tomadas
- Nome do canal: **Office Sem Mistério** (@officesemmisterio, se livre) — trocado em 28/09 a pedido de Jansey pra incluir Word e PowerPoint, não só Excel. Foto/banner refeitos com 3 ícones próprios (planilha verde, página azul, slide laranja), SEM logotipos da Microsoft (marca) — gerador em `scripts/canal_imagens.py`; versões antigas guardadas como `canal/*_excel_antigo.png`. Os 5 shorts não citam o nome, não precisaram ser refeitos. Conta Google pessoal
  (janseysilva@gmail.com), canal separado dos canais de jogos. NUNCA usar e-mail da SEMED.
- Estilo do vídeo: animação que simula a tela do Excel (HTML renderizado quadro a quadro),
  1080x1920, 30 fps, título grande em cima, legenda grande embaixo, cartão final "Salva esse vídeo".
- Voz: **Faber** (pt-BR, masculina) — modelo `vits-piper-pt_BR-faber-medium` via sherpa-onnx, speed 1.1.
- **PÚBLICO GERAL (pedido de Jansey em 29/09): a partir do short 16, NADA de tema/exemplo de escola** (alunos, frequência, declaração, reunião de pais, secretaria). Os 15 primeiros foram feitos com cara de escola e Jansey não quer mais isso — os próximos devem servir pra qualquer pessoa que pesquise a dica (exemplos: vendas, contas da casa, lista de clientes, estoque, orçamento, agenda, currículo, trabalho de faculdade etc.).
- Dados sempre FICTÍCIOS (30 alunos em `dados/`). Nunca usar dados reais de alunos/servidores (LGPD).
- Ela prefere ver os vídeos numa página (artifact), sem baixar arquivos.

## Status (28/09/2026)
- Shorts 1–5 prontos e aprovados (pasta `videos/`):
  1 PROCV · 2 % de presença · 3 vermelho abaixo de 75% · 4 lista suspensa · 5 Ctrl+E.
  Títulos e legendas de cada um em `pagina_shorts.html`.
- 28/09: + 10 shorts NOVOS gerados e APROVADOS por Jansey em 29/09: Word 6–10 (mala direta, sumário,
  timbre/cabeçalho, Shift+F3, repetir título da tabela) e PowerPoint 11–15 (SmartArt, Designer, salvar como
  vídeo, F5/Shift+F5, alinhar/distribuir). Animação única `animacoes/office.html` (__APP__ word|ppt, __MODE__ 1-5),
  narração `narracao/w1..w5.json`/`p1..p5.json`. Gerar no Windows: `python scripts/fazer_office.py word 1
  narracao/w1.json videos/X.mp4` (ou `--previa 1,5,9` pra prints em previa/). Página: `python scripts/montar_pagina.py`
  (títulos/legendas ficam lá). Ferramentas instaladas neste PC: sherpa-onnx, playwright+chromium, voz em tts/.
- **CANAL CRIADO em 29/09**: "Office Sem Mistério", @OfficeSemMisterio (sem acento, pedido de Jansey), id UCHTp4sbrZY-hB7Y-Fk5vmnw, Conta de marca ligada ao janseysilva@gmail.com. Foto, banner e descrição enviados pelo Studio (Personalização, em studio.youtube.com/channel/<id>/editing/profile — o formulário de criar canal não aceita upload automatizado, só o Studio). **29/09: 14 dos 15 shorts PUBLICADOS (públicos, "não é conteúdo para crianças")** a pedido de Jansey (pediu todos de uma vez, não 1/dia). O 15º (Alinhar/PowerPoint) foi barrado: "O limite diário de envios foi alcançado" — conta sem verificação avançada tem limite de uso diário; **publicar o Short15 no dia seguinte** (atenção: o limite é da CONTA toda, compartilhado com o canal Truques de Celular — ver CLAUDE.md de Documents\dicas-celular) (cópia pronta em `Desktop\trabalhos jansey\_upload_shorts\`, apagar essa pasta depois). Título: "Caixas tortas no slide? Alinhe tudo em 1 segundo no PowerPoint"; legenda em `scripts/montar_pagina.py`. Como subir pelo Studio: studio.youtube.com/channel/<id>/videos/upload?d=ud → file_upload no input de arquivo (arquivo precisa estar dentro de Desktop\trabalhos jansey) → preencher DESCRIÇÃO primeiro e depois o título (o título abre um painel de hashtags que empurra a descrição pra baixo) → rádio "Não é conteúdo para crianças" → Avançar x3 → Público → Publicar.
- **29/09 (depois): nova tentativa do Short15 BARRADA de novo** ("O limite diário de envios foi alcançado"), mesmo com o canal Truques de Celular já tendo publicado 15 no mesmo dia depois de verificar telefone. Ou seja, o limite é por canal: o Office precisa esperar 24 h ou fazer a própria verificação (link "Fazer verificação" no rodapé do upload — dados pessoais/telefone o Jansey digita). Pra trocar de canal no Chrome: youtube.com/channel_switcher → clicar "Office Sem Mistério" → studio.youtube.com.
- (histórico) Canal AINDA NÃO criado: YouTube pediu verificação de identidade (vídeo) em 28/09; análise em até 24 h.
  Checado de novo em 28/09 (Studio → Configurações → Canal → Qualificação para recursos): verificação
  ainda "Pendente/em análise". Recursos intermediários JÁ ativados (dá pra enviar Shorts). O canal que
  existe na conta hoje é o pessoal "jansey silva" — o "Office Sem Mistério" (separado) ainda não foi criado.
  IMPORTANTE: criar canal NOVO fica BLOQUEADO até a verificação sair — clicar em "Crie um canal"
  (youtube.com/channel_switcher?authuser=1) só mostra "Seu vídeo está sendo analisado". A conta também
  tem o canal "Carnizas Dota Games" (jogos). Jansey autorizou criar o canal (28/09) — fazer assim que aprovar.
  Próximo passo quando aprovar: criar o canal (nome, foto `canal/perfil.png`, banner `canal/banner.png`,
  descrição abaixo), pedir confirmação antes de clicar em "Criar", depois subir 1 short por dia, na ordem.
- Descrição do canal (trocada 29/09 pra público geral): "Dicas rápidas de Excel, Word e PowerPoint para o dia a dia. Fórmulas, atalhos, planilhas que se preenchem sozinhas, documentos prontos em minutos e apresentações sem sofrimento."

## Próximos temas da fila (ANTIGA, voltada pra escola — refazer com exemplos gerais antes de usar)
Excel: CONT.SE para contar conceitos · dias úteis de folga (DIATRABALHOTOTAL) · remover duplicadas ·
classificar sem bagunçar · imprimir em uma página.
Word: mala direta (várias declarações de uma vez a partir de uma planilha) · sumário automático ·
cabeçalho/timbre que se repete · tabela que não quebra entre páginas.
PowerPoint: slide de reunião de pais em 1 minuto (Designer) · transformar texto em SmartArt ·
salvar apresentação como vídeo/PDF.
(Os modelos de animação atuais só simulam o Excel — shorts de Word/PowerPoint vão precisar de modelos novos em `animacoes/`.)

## Como gerar um short
1. `bash scripts/setup.sh` (uma vez).
2. Animação: copiar o modelo mais parecido de `animacoes/` (short1 = aba Busca/PROCV; short23 = aba Alunos
   com % e formatação condicional; short45 = lista suspensa e Ctrl+E). Cada modelo tem `render(t)` com as cenas
   em segundos. Substituir os marcadores: `__DATA__` (dados/alunos.json ou alunos2.json), `__NAMES__`
   (nomes de alunos.json), `__MODE__` (2/3 ou 4/5).
3. Narração: `narracao/sN.json` = lista `[inicio, fim, "texto"]`, uma por cena da animação.
   `gen.py` gera a voz; se a fala for maior que a cena, a animação "segura" o último quadro até a fala acabar.
4. `bash scripts/fazer_short.sh animacao_pronta.html narracao/sN.json videos/ShortN.mp4`
5. Conferir quadros-chave antes de publicar (rend.py renderiza tempos avulsos para prévia).

## Links
- Página com os vídeos: https://claude.ai/artifact/DuCKs44qELpiUKvhqYtnKz
- Plano do canal (documento): https://claude.ai/code/artifact/260e83fc-6a26-45ec-9c89-1a9ae8ee2d20

## LEVA 2 — shorts 16 a 20 (TEMAS EM ALTA, aprovados por Jansey em 29/09 à noite; os antigos Ctrl+Enter/Ctrl+H/colar/duplicar/tela preta foram REJEITADOS e removidos)
`animacoes/office.html` ganhou o app **xl** (Excel; classe do body = `excel`, NÃO `xl` — `.xl` já é outro estilo) com `xgrid()` (planilha) e `cop()` (painel do Copilot). Modos: xl 1-4 e ppt 8. Narrações `narracao/x1..x4.json` e `p8.json`. Prévias conferidas (`previa/leva2_nova.jpg`), todas ok.
Gerar: `python scripts/fazer_office.py xl 1 narracao/x1.json videos/Short16_Excel_Copilot.mp4` (idem xl 2 → Short17_Excel_PROCX, xl 3 → Short18_Excel_Gastos, xl 4 → Short19_Excel_FotoPlanilha, ppt 8 → Short20_PPT_Copilot).
16 Copilot Excel — "Peça a fórmula do Excel em português (Copilot)" / "Página Inicial › Copilot: escreva o que quer e ele cria a fórmula. Para assinantes do Microsoft 365. #excel #copilot #ia #office #dicasdeexcel"
17 PROCX — "PROCX: o substituto do PROCV" / "=PROCX(o que procura; onde procura; o que trazer). Sem contar colunas! Excel 2021 e Microsoft 365. #excel #procx #procv #formulas #dicasdeexcel"
18 Gastos — "Planilha de gastos do mês em 1 minuto" / "Ctrl + T, Linha de Totais e Gráfico de Pizza: tudo se atualiza sozinho. #excel #financas #controledegastos #planilha #dicasdeexcel"
19 Foto — "Tire foto de uma tabela e ela vira planilha" / "No app do Excel no celular: Inserir › Dados da imagem. Grátis! #excel #celular #planilha #truques #dicasdeexcel"
20 Copilot PPT — "O PowerPoint cria a apresentação a partir do Word" / "Página Inicial › Copilot › criar a partir de um arquivo. Para assinantes do Microsoft 365. #powerpoint #copilot #ia #office #apresentacao"
**30/09: OS 5 DA LEVA 2 PUBLICADOS** (Jansey aprovou). Títulos usados: 16 'O Excel agora escreve a fórmula por você 🤯' · 17 'Esqueça o PROCV: essa função é muito melhor' · 18 'Planilha de gastos em 1 minuto, com gráfico automático' · 19 'Tire uma FOTO e ela vira planilha no Excel 📸' · 20 'O PowerPoint monta a apresentação SOZINHO a partir do Word'. Canal com 20 shorts no ar.
(histórico) STATUS: leva 2 renderizando pela fila Documents\shorts-para-redes-sociais\fila_leva2.ps1 (30/09). **Short15 PPT_Alinhar PUBLICADO em 30/09 ~08h45 → os 15 da leva 1 estão todos no ar.**
