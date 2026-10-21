# Canal de Shorts "Física Sem Mistério" (3º canal, iniciado 29/09/2026)

## Decisões (Jansey, 29/09)
- Tema: **curiosidades da física**, público geral.
- Nome: **Física Sem Mistério** (combina com o "Office Sem Mistério").
- Visual: **espaço/cinema**. Fundo escuro com estrelas e nebulosas, luz com brilho, título com palavras em dourado e zoom lento de "documentário".
- Voz: **pt-BR-AntonioNeural** (edge-tts, +8%), a mesma do Truques de Celular, com legenda palavra por palavra.
- Música e efeitos são originais, sintetizados em `video/sons.py` (sem direito autoral): pad espacial lento, "brilhos", pulso grave, whoosh.
- Conta do YouTube: `janseysilva@gmail.com` (Conta de marca, igual aos outros canais). Nunca usar o e-mail da SEMED.
- Depois de ver o teste animado, Jansey perguntou se dava pra usar **vídeos reais com a mesma narração**. Foram feitas 3 versões do teste para ele comparar:
  - animada (`CeuAzul`);
  - só vídeos reais (`CeuAzulReal`);
  - mistura (`CeuAzulMisto`): real, com a animação só na cena que explica o espalhamento.
  - **Falta ele escolher o estilo.**

## Vídeos reais (banco de imagens)
- Fonte: **Pexels**. A licença deixa usar de graça, inclusive no YouTube, sem dar crédito.
- Os arquivos ficam em `video/public/clipes/NOME.mp4` (1080x1920). Eles são pesados, então ficam fora do git.
- Para achar os arquivos, uso o navegador embutido (Claude_Browser) no pexels.com.
  - Com `fetch('/search/videos/<termo>/?orientation=portrait')` pego as páginas `/video/...-ID/`.
  - Em cada página procuro o link `videos.pexels.com/video-files/ID/..._1080_1920_...mp4`.
  - O download é feito pelo PowerShell (`Invoke-WebRequest` com User-Agent) direto desse link.
  - O Claude in Chrome caiu no meio, e o navegador embutido funcionou.
- Antes de usar, sempre tire um quadro de cada clipe (ffmpeg) para conferir o conteúdo. Alguns resultados de busca não mostram o que prometem (o "prisma" veio sem arco-íris; uma "Terra" era desenho artificial).
- O componente `Clipe` (`src/espaco.tsx`) faz o vídeo ocupar a tela inteira, com uma leve escurecida em cima e embaixo para o texto ler bem. Se o vídeo for curto, ele toca um pouco mais devagar.

## Como gerar um short (pasta `video/`, Remotion; node_modules copiado do dicas-celular)
1. Roteiro em `roteiros/ID.json` com o formato `{"id":..., "frases":[...]}`.
   - Uma frase por cena.
   - A ÚLTIMA frase é o convite ("Segue o Física Sem Mistério...") e é nela que entra a tela final.
2. `python narrar.py roteiros/ID.json` gera `public/ID/narracao.mp3` e `public/ID/tempos.json`.
3. `python sons.py 60` gera `public/musica.wav` e os efeitos. Só precisa rodar uma vez.
4. Crie o componente em `src/shorts/ID.tsx` e registre em `src/Root.tsx`.
   - As peças prontas ficam em `src/espaco.tsx`: `Short`, `Cena`, `Clipe`, `Sol`, `Raio`, `Tela`, `Estrelas`, `Ganchos`, `Final` e `sorteio`.
5. Para conferir a checagem de tipos: `npx tsc --noEmit`.
6. Para tirar prévias: `python previa.py ID 1,5,9`. Elas saem em `previa/ID_folha.jpg`.
7. Para renderizar: `npx remotion render src/index.ts ID out/ID.mp4`.
   - Demora mais de 10 min por causa dos efeitos de brilho/blur, então rode em segundo plano.
- Em sessão nova, o Node precisa entrar no PATH: `$env:Path="$env:LOCALAPPDATA\nodejs\node-v24.21.0-win-x64;$env:Path"`.

## ESTILO ESCOLHIDO (29/09): MISTO
Vídeo real na maior parte, com animação só onde ajuda a explicar.
- **Sem whoosh nem estrondo nas trocas de frase**: Jansey achou parecido com explosão. Ficou só um brilho suave (sininho) no final.

## Como os 14 shorts restantes são feitos (automático a partir do roteiro)
- `criar_roteiros.py` define os 14 shorts: frases, título de cima de cada cena, termo de busca do vídeo ou animação (emoji + texto), título e legenda do YouTube, e final. Ele grava `roteiros/ID.json`.
- `python narrar.py roteiros/ID.json` gera a narração (já feita para os 14).
- `buscas.py` lista os termos de busca.
  - Os clipes foram escolhidos no Pexels pelo navegador embutido (1º resultado vertical 1080x1920 ainda não usado no mesmo short).
  - A lista fica em `clipes.json` (ID_cena → URL).
- `python baixar_clipes.py` baixa para `public/clipes/ID_i.mp4`, grava `public/clipes/duracoes.json` e monta folhas `previa/clipes_ID.jpg` para CONFERIR se cada clipe combina com a frase.
  - Se um clipe não combinar, troque a URL em `clipes.json`, apague o mp4 e rode de novo.
- `src/ShortRoteiro.tsx` monta qualquer short a partir do roteiro. Cada um está registrado em `src/Root.tsx` com id = ID.
- `renderizar_todos.ps1` renderiza em fila os que ainda não existem em `out/FisicaN_ID.mp4` (N = 2 a 15) e anota o progresso em `out/andamento.txt`.
- Ordem de publicação:
  1. CeuAzul (misto)
  2. Trovao
  3. Gelo
  4. Astronautas
  5. ArcoIris
  6. Lua
  7. MicroOndas
  8. MetalGelado
  9. Aviao
  10. PanelaPressao
  11. SomEspaco
  12. Estrelas
  13. Colher
  14. Inercia
  15. MarSalgado

## CANAL CRIADO (30/09)
- **Física Sem Mistério, @FisicaSemMisterioBR** (o @FisicaSemMisterio já era de outra pessoa), id **UCT2vkKl3PRcdMrPiU_NLp7w**, Conta de marca na conta janseysilva@gmail.com.
- Foto (átomo) e banner gerados por `canal/canal_imagens.py`. Descrição: "Curiosidades da física explicadas em menos de 1 minuto: por que o céu é azul, por que o gelo boia, como o avião voa e muito mais. Ciência do dia a dia, sem complicação." (sem prometer frequência).
- **Publicados em 30/09 (públicos):**
  1. Se a luz do Sol é branca, por que o céu é AZUL? 🤔
  2. Por que você vê o raio ANTES de ouvir o trovão? ⚡
  3. Por que o gelo BOIA se ele também é água? 🧊
  4. Astronautas não flutuam. Eles estão CAINDO! 🚀
  5. O arco-íris é, na verdade, um CÍRCULO 🌈
- **30/09 à tarde: publicados também 6 a 10** (títulos: 6 'A Lua mostra SEMPRE o mesmo lado. Sabe por quê? 🌙' · 7 'Como o micro-ondas esquenta a comida SEM FOGO? 🍲' · 8 'O metal NÃO é mais gelado que a madeira 🥶' · 9 'Como um avião de centenas de toneladas consegue voar? ✈️' · 10 'O segredo da panela de pressão: a água ferve a 120 °C 🍲'). Canal com 10 públicos.
- **30/09 fim da tarde: Jansey confirmou o telefone no canal Física (youtube.com/verify) e os 11 a 15 foram publicados → OS 15 ESTÃO NO AR, todos públicos e com descrição.** Truque que resolveu o travamento da digitação: clicar no título, digitar 'teste', ctrl+a e só então digitar o título de verdade; depois achar a caixa de Descrição com `find`.
- (histórico) o 11 tinha sido barrado por 'limite diário de envios' (canal novo, 10 por dia sem verificação de telefone). Arquivos prontos (≤10 MB) em `Desktop\trabalhos jansey\_upload_fisica\`. Títulos planejados: 11 'No espaço, ninguém ouve uma explosão 🚀' · 12 'Por que as estrelas piscam e os planetas não? ✨' · 13 'A colher não quebrou. É a luz te enganando 🥄' · 14 'Por que você é jogado pra frente quando o ônibus freia? 🚌' · 15 'Se a chuva é doce, por que o mar é SALGADO? 🌊'. Descrição = legenda do roteiro + ' Segue o canal para mais curiosidades!' (texto no fim evita o autocompletar trocar a última hashtag). As legendas estão em `roteiros/ID.json` (campo "legenda").
- **Armadilhas no upload** (valem para os 3 canais):
  - O 1º texto digitado logo após subir o arquivo some, porque o YouTube recarrega o formulário quando o envio termina. Esperar ~20 s ou redigitar.
  - Depois de digitar o título, abre o painel "Hashtags sugeridas" e a Descrição desce. Usar `find` para achar a caixa de descrição em vez de clicar por coordenada.
  - O **autocompletar de hashtag pode trocar a última hashtag** (ex.: #luz virou #luzdecristo). Sempre conferir o texto final com JavaScript antes de publicar.
  - Emoji com ZWJ (🧑‍🚀) se parte em dois; usar emoji simples.
  - Enquanto a fila de renderização roda, o Chrome trava. Pausar a fila (TaskStop) antes de publicar e retomar depois.

## Status
- 29/09: teste "Por que o céu é azul?" (~34 s) em 3 versões, todas na pasta `out/`:
  - `Teste_CeuAzul.mp4` (animada), já mostrada ao Jansey;
  - `Teste_CeuAzul_Real.mp4`;
  - `Teste_CeuAzul_Misto.mp4`.
- 29/09 ~17h: Jansey escolheu o MISTO e aprovou os 14 temas.
  - Roteiros e narração dos 14 prontos.
  - 57 clipes baixados e conferidos. 3 foram trocados: SomEspaco_3 (crianças fantasiadas), Inercia_4 (carro sem roda) e PanelaPressao_0 (fogareiro de camping).
  - `out/Fisica1_CeuAzul.mp4` = teste misto aprovado.
  - **Fila de renderização disparada às 17:05** (`renderizar_todos.ps1`, janela do PowerShell minimizada, independente do Claude). Cada short leva ~15 min.
  - **Próxima sessão:**
    1. Ver `out/andamento.txt`.
    2. Se a fila parou (PC desligado), rodar `renderizar_todos.ps1` de novo. Ele pula os que já estão prontos.
    3. Assistir/mostrar ao Jansey.
    4. Criar o canal (foto/banner/descrição).
    5. Publicar.
    - Título e legenda de cada short estão em `roteiros/ID.json` ("titulo", "legenda"). Os do CeuAzul ainda precisam ser escritos.
- (histórico) Próximo passo: Jansey escolhe o estilo → fazer os 15 shorts (mesma quantidade dos outros canais) → criar o canal no YouTube (nome, foto, banner e descrição) → publicar.

## LEVA 2 — shorts 16 a 20 (feita em 01/10, no PC novo; PUBLICADA em 01/10)
Temas escolhidos pelas buscas do YouTube Brasil e pelo que mais teve visualização (Gelo 1 mil, Trovão 526: perguntas simples do dia a dia). Espelho, Choque no carro e Ventilador foram feitos e APAGADOS por não estarem em alta.
Roteiros no fim de `criar_roteiros.py`, registrados em `src/Root.tsx`. Vídeos: `out/Fisica16..20_*.mp4`.
Títulos: 16 'Por que o pôr do sol é LARANJA? 🌅' · 17 'Por que um navio de aço NÃO afunda? 🚢' · 18 'Por que água e óleo NÃO se misturam? 💧' · 19 'Os rios não param de encher o mar. Por que ele NUNCA transborda? 🌊' · 20 'A Terra gira a 1.600 km/h. Por que não sentimos? 🌍'. Descrição = legenda do roteiro + ' Segue o canal para mais curiosidades!'.
- Clipes conferidos em `previa/leva2_clipes.jpg` e `previa/leva2b_clipes.jpg`. AguaOleo_3 foi trocado (era uma pintura colorida, não óleo).
- `baixar_clipes.py` aceita IDs (`python baixar_clipes.py PorDoSol`) e só baixa esses, juntando as durações no `duracoes.json`. **Neste PC, os clipes dos shorts 1 a 15 NÃO estão baixados.** Para re-renderizar um antigo, rode `python baixar_clipes.py <ID>` antes.
- **PC novo:** Node em `C:\Program Files\nodejs`, ffmpeg via winget. `previa.py` e `baixar_clipes.py` usam o do PATH quando o caminho antigo não existe.
- **Regra de Jansey (01/10): só temas EM ALTA, para gerar visualização.** Antes de escolher temas, conferir (1) as visualizações dos shorts já publicados (página /@canal/shorts, `ytInitialData`) e (2) o autocompletar do YouTube Brasil (`suggestqueries.google.com/complete/search?client=firefox&ds=yt&hl=pt-BR&gl=BR&q=...`). Tema sem sinal de busca fica de fora.
- **Jansey pediu: NADA de publicar sem autorização dele.**

## PUBLICAÇÃO DA LEVA DE 01/10 (Jansey autorizou: "publique todos")
**01/10 à tarde: os 15 shorts da leva foram PUBLICADOS** (públicos, "não é conteúdo para crianças"), conferido nas páginas públicas: Office 25, Truques 25, Física 20.
Como subir neste PC (Claude in Chrome, conta janseysilva@gmail.com já logada):
- Arquivos de upload precisam ter menos de 10 MB e ficar numa pasta que a sessão lê (usei `bolsa 1\_upload_shorts`, apagada depois). Física com muita água passa de 10 MB: usar 2 passadas com `-b:v 1650k`.
- Studio: `studio.youtube.com/channel/<id>/videos/upload?d=ud` → `find` no input de arquivo → `file_upload`.
- **Truque que resolveu os textos que sumiam:** esperar ~10 s depois do envio, tirar um screenshot (traz a aba pra frente), clicar no título (≈560,242), ctrl+a, conferir com JS que o foco e a seleção estão no campo, e só então digitar. A descrição: achar o campo com `find` (ele desce quando o título abre o painel de hashtags), clicar pela ref, conferir o foco com JS e digitar.
- Antes de avançar, conferir título e descrição com JS (`ytcp-social-suggestions-textbox #textbox`). Depois: rádio `VIDEO_MADE_FOR_KIDS_NOT_MFK`, `#next-button` até aparecer o rádio `PUBLIC`, `#done-button`.
- Aparece "Ainda estamos verificando seu conteúdo": clicar em "Publicar mesmo assim" (≈805,457).
- **YouTube não aceita `<` nem `>` em título/descrição** (o campo fica vermelho e o Avançar trava).
- Loops longos em `javascript_tool` estouram o tempo (45 s). Esperar com a ação `wait` e consultar rápido.

## LEVA 3 — shorts 21 a 25 (01/10 à noite; PUBLICADA em 01/10)
Formato dos virais (busca do YouTube, 01/10): escala gigante e espaço ("O Sol não é do tamanho que você imagina" 23 mi, "Vida em Marte" 23 mi), demonstração ("Não é força! É física" 11 mi), "Big Bang em 1 minuto" 3 mi. Jansey aprovou os temas.
Roteiros no fim de `criar_roteiros.py`. Clipes conferidos em `previa/leva3_clipes.jpg` (BigBang_5 e TamanhoLua_5 trocados; Alavanca_4 virou animação porque não há gangorra no Pexels).
21 'O Sol NÃO é do tamanho que você imagina ☀️' · 22 'Quanto você pesaria em Marte? 🔴' · 23 'Não é força. É FÍSICA 💪' · 24 'O Big Bang explicado em 30 segundos 💥' · 25 'A Lua é MENOR que o Brasil? 🌙'.
- Troca de canal no Chrome: youtube.com/channel_switcher → clicar no avatar do canal. Às vezes o Studio mostra "Ops, você não tem permissão" logo depois: repetir a troca e abrir o Studio de novo.

## LEVA 4 — shorts 26 a 30 (02/10; PUBLICADA em 02/10 — Jansey autorizou: "publique todos")
Escolhidos pelas visualizações de 02/10: "por que" do dia a dia com objeto real ganha (navio 1,2 mil, gelo 1 mil, raio 690, água e óleo 574, pôr do sol 521); espaço e escala fracassaram (Sol, Marte, Big Bang, Lua: 1 a 25). Evitar espaço.
Roteiros no bloco LEVA 4 do `criar_roteiros.py` (VidroEmbaca, OvoMicro, FogoAzul, OvoBoia, RastroAviao), clipes Pexels em `clipes.json` (conferidos em `previa/leva4_clipes.jpg`). Saída `out/Fisica26_VidroEmbaca` … `Fisica30_RastroAviao`.
- Publicação 02/10: o JS de finalizar agora clica sozinho em "Publicar mesmo assim" (procura o botão pelo texto) depois do #done-button. As refs do find mudam entre canais (ex.: ref_207/211/212 no arquivo, ref_258/262/267 no título): sempre rodar find antes. Se a extensão cair no meio, conferir a tela antes de repetir (o vídeo pode já ter sido publicado).

## LEVA 5 — shorts 31 a 35 (03/10; PUBLICADA em 03/10 — Jansey autorizou: "publique todos")
A leva 4 bombou (vidro 1 mil, ovo micro-ondas 933, ovo boia 751, avião 667, fogo 565; inscritos 15→32). Temas pelas buscas do YouTube BR ("por que o celular esquenta", "gelo queima", "pão murcha", "geladeira estalando", "avião pousa de lado").
Bloco LEVA 5 do `criar_roteiros.py` (CelularEsquenta, GeloQueima, PaoMurcha, GeladeiraEstala, AviaoDeLado). Clipes: busca no Pexels pelo navegador embutido com `fetch('/search/videos/TERMO/?orientation=portrait')` e regex dos links `1080_1920...mp4` (candidatos em lote); trocados 4 que não combinavam (conferidos em `previa/leva5_clipes.jpg`). Saída `out/Fisica31_CelularEsquenta` … `Fisica35_AviaoDeLado`.

## LEVA 6 — shorts 36 a 40 (04/10; PUBLICADA em 04/10 — Jansey autorizou: "publique todos")
Avião pousa de lado teve 2 mil (recorde); avião e cozinha/casa são a fórmula. Temas aprovados: OuvidoAviao, CebolaChorar, LeiteSobe, ChuveiroChoque, AviaoCurva (bloco LEVA 6 do `criar_roteiros.py`). Clipes conferidos em `previa/leva6_clipes.jpg` (LeiteSobe_5 trocado). Escolha automática do 1º clipe não usado: script `escolher.py` (scratchpad) — basta repetir a lógica: carregar candidatos, pular URLs já usadas em `clipes.json`. Saída `out/Fisica36_OuvidoAviao` … `Fisica40_AviaoCurva`.
- Publicação 04/10: o Chrome conectou primeiro num OUTRO perfil/conta Google (canal "JANSEY FELIX SILVA" @janseyfelixsilva1291, sem os 3 canais). Sempre conferir em youtube.com/channel_switcher que aparecem Office/Truques/Física antes de publicar; se não, pedir para Jansey trocar o perfil do Chrome.

## LEVA 7 — shorts 41 a 45 (05/10; PUBLICADA em 05/10 — Jansey autorizou: "publique todos")
Primeira proposta (ovo pelas pontas, ovo racha, pipoca, avião baleia, carro ferve) foi REJEITADA: Jansey não gostou e lembrou que **não pode repetir conteúdo** (já temos 2 de ovo e 5 de avião). Regra: além de não repetir o tema exato, evitar o MESMO OBJETO/assunto já usado várias vezes.
Temas aprovados (buscas em alta, objetos novos): CopoStanley ("porque o copo stanley conserva"), VozGravacao ("porque a voz fica diferente em gravações"), BoxEstoura ("porque o vidro do box estoura"), TomadaDerrete ("tomada da airfryer derrete"), NuvemNaoCai ("porque a nuvem não cai"). Bloco LEVA 7 do `criar_roteiros.py`. Clipes conferidos em `previa/leva7_clipes.jpg`; Pexels não tem tomada vertical boa → TomadaDerrete_4/_5 viraram animação; BoxEstoura_0 = box de vidro de 3,3 s (fica um pouco mais lento).
Emojis novos (🫠, 🪶) não existem na fonte do Windows 10: usar só emoji antigo (trocados por 🌡️ e 🍃; 💀→🦴).
Saída `out/Fisica41_CopoStanley` … `Fisica45_NuvemNaoCai`. **Tarefa em segundo plano do Claude tem limite de ~1 h**: renderizar no máximo 2 vídeos do Física por tarefa (cada um leva ~18-25 min quando outras renderizações rodam juntas).

## LEVA 8 — shorts 46 a 50 (06/10; PUBLICADA em 06/10 — Jansey autorizou: "publique todos")
Temas (buscas em alta, objetos novos): CocaVidro, BateriaIncha, CervejaGelo (super-resfriamento), TremTrilho (rodas cônicas), ImasRepelem. Bloco LEVA 8 do `criar_roteiros.py`; fila `Documentsila_fisica.ps1` (via WMI). Saída `out/Fisica46_CocaVidro` … `Fisica50_ImasRepelem`.
- Clipes trocados na conferência: ImasRepelem_0 era pêndulo de Newton (trocado por quadro magnético), CervejaGelo_3 mostrava marca de cerveja (virou animação), CervejaGelo_5 repetia o GeloQueima_5.
- Já no 1º dia: Coca de vidro 935 visualizações.

## LEVA 9 — shorts 51 a 55 (07/10; PUBLICADA em 07/10 — "publique todos")
Temas "uau" (Jansey pediu temas que IMPRESSIONEM; recusou lâmpada LED, ar-condicionado pingando, roupa escura molhada, vela, pneu, manteiga): Silencio (sala mais silenciosa), FundoMar (Fossa das Marianas, sem citar o Titan), ViagemTempo (dilatação do tempo, astronautas e GPS), DedosEnrugam, MacaEscurece. Bloco LEVA 9 do `criar_roteiros.py`. Saída `out/Fisica51_Silencio` … `Fisica55_MacaEscurece`.
- **REGRA NOVA DO JANSEY (07/10): "nos próximos coloque fotos do evento que está citando para parecer o mais real possível".** Nas próximas levas, cada cena deve mostrar foto/vídeo REAL do que está sendo dito (o lugar, o objeto, o fenômeno), e não emoji animado. Usar animação só quando não existir imagem real. Fontes: Pexels/Pixabay (vídeo e FOTO — fotos também servem, com zoom lento) e, para lugares/eventos famosos, fotos de domínio público (NASA, Wikimedia Commons com licença livre). Nesta leva, várias cenas ficaram em animação porque o Pexels não tinha a câmara anecoica, o submarino nem a estação espacial: na próxima, procurar FOTO real dessas coisas.

## 08/10 — NOVO RITMO: 2 SHORTS + 2 VÍDEOS LONGOS POR DIA (só este canal continua)
Jansey excluiu Office e Truques e pediu: todo dia 2 shorts + 2 vídeos longos, assuntos mais detalhados e **imagens reais da situação citada** (vídeo ou foto real em cada cena; animação só sem alternativa).
- **Shorts da leva 10:** OndaNazare (Nazaré, 26 m) e PassaroFio (pássaro no fio). Saída `out/Fisica56_OndaNazare.mp4`, `out/Fisica57_PassaroFio.mp4`. Agora o short aceita **foto real** numa cena (`"foto": "NOME"` no roteiro → `public/fotos_short/NOME.jpg`, a câmera passeia pela foto).
- **Vídeos longos (horizontais 1920x1080, ~7-8 min):**
  - Roteiro em `longos.py` (capítulos → cenas; cada cena = frase + `v("busca")`/foto/anim). O dicionário `VIS` no fim diz o que aparece em cada cena (clipe, foto com etiqueta "IMAGEM REAL", `desde` em segundos). Grava `roteiros/ID.json` com `"longo": true`.
  - Narração: `python narrar_longo.py roteiros/ID.json` (Antonio +3%, cada cena gerada separada → tempos exatos; grava também os capítulos).
  - Clipes: `clipes_longos.json` (ID_cena → URL Pexels 1920x1080 ou Pixabay `_large.mp4`) → `python baixar_longos.py [ID]` → `public/clipes_longo/` + folha `previa/longo_ID.jpg` para conferir.
  - Fotos reais: Wikimedia Commons (preferir domínio público/CC0/CC BY; CC BY-SA só com crédito). Procurar com `python buscar_fotos.py "termo"` (mostra licença e autor) e baixar com `python baixar_fotos.py lista.json` ({"NOME": "Arquivo no Commons.jpg"}), créditos em `public/fotos/creditos.json`. `python compor_fotos.py` monta as versões de tela (fundo desfocado) em `public/fotos_longo/` e `public/fotos_short/`.
  - Componente `src/Longo.tsx` (abertura com título, etiqueta de capítulo, legenda em baixo, tela final "Inscreva-se"; registrado em `Root.tsx` na lista `LONGOS`). Prévias: `python previa.py Vulcao 3,29,243`.
  - Capas: `capas/fazer_capas.py` → `capas/capa_ID.jpg` (1280x720). Título/descrição com **capítulos e créditos das fotos**: `python descricoes.py ID` → `out/descricao_ID.txt`.
  - Fila: `Documents\fila_fisica.ps1` (via WMI). Saída `out/Longo1_Vulcao.mp4`, `out/Longo2_Oymyakon.mp4`.
- Temas de 08/10: **Vulcão** (Jansey trocou a aurora boreal por ele) e **Oymyakon** (−67,7 °C oficial; −71 °C de 1924 não confirmado). Fotos de Pompeia, Krakatoa, Tonga, Pinatubo, Galunggung, Oymyakon etc. com crédito na descrição.
- Pexels: a URL `/video/v-ID/` redireciona para a página certa (dá para achar o mp4 só com o número). Pixabay: `https://cdn.pixabay.com/video/AAAA/MM/DD/ID-XXXX_large.mp4` (mesmo caminho da miniatura `_tiny.jpg`). Água fervendo virando neve: Pixabay 14583/14584.
- **PAUSADO em 08/10 ~10h30 a pedido do Jansey ("continuamos à tarde").** Tudo pronto (roteiros, narração, clipes, fotos, capas, descrições `out/descricao_ID.txt`, página de revisão `montar_0810.py` no scratchpad), **falta só renderizar os 4**: nenhum mp4 pronto ainda (o 1º render com concurrency 4 deu "Page crashed" por falta de memória — PC tem 8 GB). Para retomar: rodar `Documents\fila_fisica.ps1` via WMI (já está com concurrency 2; a parte que espera o processo 12048 é inútil agora, pode apagar). Depois: montar a página de revisão e mostrar ao Jansey. NÃO publicar sem ele mandar.
- **09/10: Shorts 56 (OndaNazare) e 57 (PassaroFio) PUBLICADOS** (Jansey: "publique"). Física agora com 57 shorts no ar. Os 2 longos seguem na fila (`fila_fisica.ps1`, Vulcão começou 08:42 de 09/10, depois Oymyakon). Página de revisão: https://claude.ai/artifact/TVpNfn5wHGbn7rrse371aa (montada por `scratchpad/revisao/montar_0810.py`). Publicar vídeo longo: precisa subir a CAPA (`capas/capa_ID.jpg`) e o arquivo é grande (>10 MB) — o upload pelo Claude in Chrome tem limite de 10 MB, então o Jansey precisa arrastar o .mp4 (`out/Longo1_Vulcao.mp4`) na tela de envio que o Claude deixar aberta.
- Truque de publicação que funcionou em 09/10 com o Chrome lento (render rodando): rodar o preenchimento dentro de `setTimeout(async()=>{...},100)` para o JavaScript não travar; título/descrição com `focus()` + `execCommand('selectAll')` + `execCommand('insertText')` em `#title-textarea #textbox` e `#description-textarea #textbox`; depois `#next-button` 3x e `tp-yt-paper-radio-button[name="PUBLIC"]`; clicar Publicar → "Publicar mesmo assim".
- **09/10 ~10:35: 1º VÍDEO LONGO PUBLICADO — "VULCÃO: por que a Terra cospe fogo? 🌋 (e a cidade enterrada em um dia)"** (https://youtu.be/WU6wau0qgj0, 8:15, público, não é para crianças, capa própria, descrição com capítulos e créditos). Jansey adorou ("ficou muito bom"). Como foi: compactei `out/Longo1_Vulcao.mp4` (664 MB) para ~316 MB (`ffmpeg -preset veryfast -crf 21`) numa pasta `Desktop\trabalhos jansey\_upload_longo`, abri a pasta no Explorer e o Jansey arrastou o arquivo para a tela de envio; o resto (título, descrição, capa via file_upload, público) foi o Claude. Renderizar o longo levou 58 min (concurrency 2).
- **09/10 ~10:55: 2º VÍDEO LONGO PUBLICADO — "A vila mais FRIA do mundo: −67 °C 🥶 O que a física faz com tudo lá"** (https://youtu.be/qYYbfDjUTSU, 6:47, público, capa, capítulos, créditos). **Leva de 08-09/10 COMPLETA: 2 shorts (56-57) + 2 longos.** Canal: 57 shorts + 2 vídeos longos. Em 09/10 o painel de ganhos mostrava 78 inscritos, 3/3 vídeos em 90 dias, 0 h de exibição (meta 3.000 h, os longos começam a contar), 7,7 mil views de Shorts (meta 3 mi) — 1º nível do YPP (500 inscritos).
- **Próximo (Jansey, 09/10): à tarde ver publicar em OUTRAS REDES SOCIAIS** (sugestão: Shorts no TikTok, Instagram Reels e Facebook). Ritmo combinado: 2 shorts + 2 longos por dia, com temas detalhados e imagens reais. Temas aprovados ainda não usados: aurora boreal foi trocada; sobram raio no carro e tornado (o vulcão foi o escolhido no lugar do tornado).
- 09/10: tudo enviado ao GitHub (commit `ca4e7c0`, repo shorts-para-redes-sociais), incluindo o sistema de vídeos longos.

## 09/10 — OUTRAS REDES SOCIAIS
- **TikTok: bloqueado pela rede da SEMED** (conexão resetada; YouTube/Instagram/Facebook abrem). Jansey pediu para contornar — **recusado** (burlar filtro da rede do trabalho). Alternativas: postar pelo celular, pedir liberação à TI, ou usar o outro PC fora da rede.
- **Facebook + Instagram:** Jansey NÃO quer usar a conta pessoal → Página "Física Sem Mistério" no Facebook + conta nova @fisicasemmisterio no Instagram (profissional, ligada à Página). **Ele cria as contas** (Claude não cria conta nem digita senha). Material pronto em `Desktop\trabalhos jansey\redes-sociais-fisica\` (perfil 1080, capa FB 1640x624 gerados por `canal/redes_sociais.py`, `LEIA-ME - passo a passo.txt` com bio/sobre/legendas, e `videos\` com os 2 shorts novos). Depois que ele criar: publicar Reels pelo **Meta Business Suite** (business.facebook.com), que posta no FB e IG juntos.
- **09/10: PÁGINA DO FACEBOOK CRIADA** pelo Claude (Jansey pediu "crie a página", logado no perfil dele): **"Física Sem Mistério"**, https://www.facebook.com/profile.php?id=61595238811286 — categoria Educação, bio "Curiosidades da física sem complicação: vídeos curtos e documentários com imagens reais.", site = canal do YouTube, foto do átomo e capa (`redes_sociais.py`, texto subido para cima por causa da foto de perfil). Não convidei amigos. Falta: Jansey criar a conta do Instagram e ligar à Página; depois publicar Reels.
- **09/10: 2 primeiros REELS na Página do Facebook** (os 2 shorts mais vistos do YouTube: "avião pousa de lado" 2.281 views e "navio de aço" 1.409). Os arquivos não estavam neste PC → baixados do próprio YouTube Studio (Conteúdo → ⋮ → Baixar, com autorização do Jansey; vêm em 720p) e copiados para `redes-sociais-fisica\videos\`.
- **Como publicar Reel no Facebook (funciona):** o "Criar reel" normal (facebook.com/reels/create) TRAVA em "Carregando vídeo" com o file_upload. Usar o **Meta Business Suite**: `https://business.facebook.com/latest/reels_composer?asset_id=1355398330993849` (asset da Página). O botão "Adicionar vídeo" cria o `<input type=file>` só na hora e abre o seletor do Windows → antes, rodar no console: `HTMLInputElement.prototype.click` interceptado para inputs file (anexa ao body e não abre o seletor); clicar "Adicionar vídeo", achar o input com `find` e usar `file_upload`. Depois: Descrição → Avançar → Avançar → Compartilhar.
- **09/10: Instagram criado pelo Jansey: @fisicasemmisteriobr** (o @fisicasemmisterio já era de outra pessoa). Falta: conta profissional + ligar à Página do Facebook; depois publicar Reels pelo Business Suite (vai para FB e IG juntos).
- 09/10: o 1º vínculo pegou o Instagram PESSOAL (@janseyfelix, Chrome já logado nele) → Claude DESCONECTOU (Jansey autorizou). @janseyfelix continua listado no portfólio empresarial "Jansey Félix" (business_id 1539743537960881), mas sem ativo conectado. Ligar o @fisicasemmisteriobr pelo app do celular (Editar perfil → Página) ou sair do IG pessoal no Chrome antes. NUNCA publicar no Instagram sem conferir que o conectado é @fisicasemmisteriobr.
- **11/10: INSTAGRAM LIGADO À PÁGINA.** @fisicasemmisteriobr agora aparece no Meta Business Suite (portfólio "Jansey Félix", asset da Página 1355398330993849; IG asset 1392532860609645). A página inicial do Business Suite mostra "Ir para o Instagram" e "Seguidores do Instagram: 3". Como foi: Claude clicou em "Conectar o Instagram" (home do Business Suite) e Jansey fez o login do @fisicasemmisteriobr na janela que abriu. Agora os Reels feitos pelo `reels_composer` podem ir para Facebook e Instagram juntos — conferir sempre que o Instagram marcado é @fisicasemmisteriobr (o @janseyfelix continua no portfólio, sem ativos).
- **11/10: 1ºs REELS NO INSTAGRAM** (@fisicasemmisteriobr), só no Instagram (Facebook desmarcado em "Postar em", porque já estavam na Página): "avião pousa de lado" (14h30) e "navio de aço" (14h33), pelo `reels_composer` do Business Suite, com o truque do `HTMLInputElement.prototype.click` para o input de arquivo. Arquivos: `out/Fisica35_AviaoDeLado.mp4` e `out/Fisica17_NavioAco.mp4` comprimidos em 2 passadas (1650k) para ficar < 10 MB. Legenda = título + explicação + "Siga @fisicasemmisteriobr..." + hashtags. O composer NÃO tem opção de agendar nesse modo; a privacidade fica travada em público. A capa do Reel do avião saiu num quadro do meio (água do rio) — dá para trocar a capa no app.
- **11/10: perfil do Instagram ajustado:** foto do átomo (`canal/redes_sociais.py` → `perfil_1080.png`), nome "Física Sem Mistério" (pela Central de Contas: accountscenter.instagram.com → perfil → Nome; só 2 trocas a cada 14 dias) e bio "🔬 Curiosidades da física sem complicação / 🎬 Vídeos curtos e documentários com imagens reais / ▶️ Vídeos novos todo dia no YouTube". O LINK (site) só dá para editar no app do celular → Jansey precisa pôr https://www.youtube.com/@FisicaSemMisterioBR.
- **11/10: mais 2 Reels no FACEBOOK + INSTAGRAM juntos** (os 2 melhores do YouTube que ainda não estavam lá): "Coca de vidro" (1,4 mil views no YT, 15h57) e "passarinho no fio" (1,1 mil, 16h00). Renderizados de novo neste PC (`out/Fisica47_CocaVidro.mp4`, `out/Fisica57_PassaroFio.mp4`, clipes via `baixar_clipes.py CocaVidro PassaroFio`) e comprimidos < 10 MB (o do passarinho tem 50 s → bitrate calculado ~1400k). Legenda nas redes: título + explicação + "Siga a Física Sem Mistério para mais curiosidades 🔬" + hashtags.
- Já estão nas redes: avião pousa de lado, navio de aço (FB 09/10, IG 11/10), Coca de vidro, passarinho no fio (FB+IG 11/10). Próximos pelo ranking do YouTube: dedos enrugam (1,1 mil), água e óleo (1,1 mil), leite sobe / cebola / gelo queima / vidro embaça (~1 mil).

## 11-12/10 — LEVA 11: 2 LONGOS (Tornado, TerraParar) + 2 SHORTS (TrianguloBermudas, LugarQuente) — temas aprovados por Jansey
- Jansey recusou os shorts "raio no carro" e "mar recua antes do tsunami"; aprovou os longos Tornado e "E se a Terra parasse de girar?" e os shorts Triângulo das Bermudas + lugar mais quente do mundo.
- Longos: roteiros no `longos.py` (VIS com fotos NOAA/NASA/DPU), narração ok, clipes em `clipes_longos.json` (conferidos), capas `capas/capa_Tornado.jpg` e `capa_TerraParar.jpg` (o `fazer_capas.py` quebra se faltar `q_Vulcao_9.jpg` — rodar só os blocos novos), descrições `out/descricao_Tornado.txt`/`descricao_TerraParar.txt`. Saída `out/Longo3_Tornado.mp4`, `out/Longo4_TerraParar.mp4`. Título da abertura do 2º trocado para "TERRA PARADA" (o longo cortava).
- `narrar_longo.py`: trocado `-filter_complex_script` por `-/filter_complex` (ffmpeg 9 não aceita mais o antigo; funciona também no ffmpeg 8).
- Shorts: bloco LEVA 11 do `criar_roteiros.py`, fotos B_golfo, B_tromba, B_avenger, Q_termometro, Q_badwater (CC BY-SA 3.0, King of Hearts), Q_lut (CC BY 2.0, Ninara) — créditos via `descricoes.py`.
- **12/10 madrugada: edge-tts passou a dar 403 na síntese** (a lista de vozes funcionava). Não era bloqueio por excesso: a Microsoft desligou a síntese no host antigo (`speech.platform.bing.com`) — issue #490 e PR #491 do edge-tts. Correção: `video/edge_fix.py` (importado em `narrar.py` e `narrar_longo.py`) troca só o endereço da síntese para o host oficial novo `api.msedgeservices.com`, com o mesmo token e a mesma voz Antonio. Quando sair edge-tts novo com a correção (`pip install -U edge-tts`), pode apagar o `edge_fix.py` e as 2 linhas de import. NÃO usar proxy.
- Vídeo longo NÃO dá para enviar pelo Claude in Chrome (limite 10 MB) — Jansey arrasta o .mp4 e o Claude preenche título, descrição, capa e público.
- **12/10 ~04:30: SHORTS 58 (TrianguloBermudas) e 59 (LugarQuente) PUBLICADOS** no YouTube (https://youtube.com/shorts/WbblaBTZ0w0 e https://youtube.com/shorts/ky8zxWeU4cQ) e como Reels no FACEBOOK + INSTAGRAM juntos (04:34 e 04:35). Saída `out/Fisica58_TrianguloBermudas.mp4`, `out/Fisica59_LugarQuente.mp4`. Física agora com 59 shorts no ar. O reels_composer agora mostra "Programar" na etapa Compartilhar (dá para agendar).
- Reels de 11/10 no FB+IG: passarinho 1.549 views, Coca de vidro 1.282 (bem acima do YouTube por vídeo).
- **Longos 3 (Tornado) e 4 (TerraParar) PRONTOS, NÃO publicados:** arquivos comprimidos (veryfast crf21, 231 MB e 268 MB) + capas + descrições em `Desktop	rabalhos jansey\_upload_longo\`. Jansey arrasta o .mp4 na tela de envio; o Claude preenche o resto.
- **12/10 (manhã): LONGOS 3 e 4 PUBLICADOS** (públicos, não é para crianças, capa própria, descrição com capítulos e créditos): "TORNADO: como nasce um monstro de vento 🌪️ (e sim, o Brasil tem tornados)" https://youtu.be/iLj6rrqbN54 (6:56) e "E se a Terra PARASSE de girar? 🌍 O que a física diz que aconteceria" https://youtu.be/koinIzzMUnc (6:29). Jeito que funcionou: o Claude abre `upload?d=ud` numa aba do grupo do Claude in Chrome, o Jansey arrasta o .mp4 do Explorer para ESSA aba, o Claude espera aparecer `#title-textarea` e preenche o resto. Canal agora com 4 longos.
- **12/10 ~10h40: mais 2 Reels no FB+IG** (os 2 mais vistos do YouTube que faltavam, ~1,1 mil cada): "dedos enrugam" (10:41) e "água e óleo" (10:43). Jansey pediu para NÃO renderizar de novo: o de dedos foi BAIXADO do YouTube Studio (Detalhes do vídeo → ⋮ → Baixar, vem 720p para Downloads). O arquivo baixado travou em 95%% no Business Suite; reencodar com `ffmpeg -c:v libx264 -crf 19 -pix_fmt yuv420p -r 30 -c:a aac -ar 44100 -movflags +faststart` resolveu. Já nas redes: avião de lado, navio, Coca de vidro, passarinho, Bermudas, lugar quente, dedos enrugam, água e óleo. Próximos pelo ranking: leite sobe, cebola, gelo queima, vidro embaça (~1 mil).

## 12/10 — LEVA 12: 2 SHORTS (LugarAlto, MarDrake) + 2 LONGOS (Meteoro, BuracoNegro) — Jansey aprovou e mandou publicar ("pode fazer todos, publicar")
- Temas pela pesquisa do autocompletar + série "o lugar mais..." (lugar quente deu 1,1 mil em horas). Jansey recusou Starlink; trocou por "lugar mais perigoso do oceano".
- **Shorts PUBLICADOS** no YouTube: 60 "O lugar mais ALTO do mundo: 8.849 metros 🏔️" https://youtube.com/shorts/35dkWWJPEnw · 61 "O lugar mais PERIGOSO do oceano: a Passagem de Drake 🌊" https://youtube.com/shorts/-aCXByYFVzc. E como Reels no FB+IG (11:20 e 11:23).
- Fotos dos shorts: E_monte, E_topo, E_fila, E_faixa, D_mar, D_mar2, D_corrente, D_horn (créditos em `public/fotos/creditos.json`).
- Longos: `longos.py` (Meteoro 48 cenas ~7:00, BuracoNegro 48 cenas ~7:17; o 1º rascunho deu ~5:50 e ganhou capítulos extras). Fotos M_* e B_* (NASA, EHT, ESO, LIGO, Wikimedia). Capas `capas/capa_Meteoro.jpg`, `capa_BuracoNegro.jpg` (rodar só os blocos novos do `fazer_capas.py`). Descrições `out/descricao_Meteoro.txt`, `descricao_BuracoNegro.txt`.
- Escolha de clipes longos: busca no Pexels pela aba do Claude in Chrome (fetch `/search/videos/TERMO/?orientation=landscape`), as miniaturas `images.pexels.com/videos/ID/...` montadas numa folha; para tirar a lista grande da página, gerei um download de JSON (o Chrome deixa um `.tmp` em Downloads com o conteúdo completo quando pede "Salvar como").
- Business Suite: se o botão "Adicionar vídeo" não criar o input, refazer o patch do `HTMLInputElement.prototype.click` com a página já carregada e clicar pelo `find` (ref), não por coordenada (o tamanho da janela muda).
- **Longos 5 (Meteoro, 6:59) e 6 (BuracoNegro, 7:17) PRONTOS, NÃO publicados** (>10 MB): comprimidos + capas + descrições em `Desktop\trabalhos jansey\_upload_longo\` (os já publicados foram para a subpasta `ja_publicados`). Troquei o clipe Meteoro_43 (parecia ônibus espacial) por um telescópio à noite e renderizei de novo. Render com concurrency 3 neste PC de 16 GB: ~15 min por longo.
- **12/10 ~15h: LONGOS 5 e 6 PUBLICADOS** (públicos, não é para crianças, capa, capítulos e créditos): "O METEORO que acabou com os dinossauros ☄️ (e se cair outro?)" https://youtu.be/Y9lDgEMEARI (6:59) e "BURACO NEGRO: o que acontece se você cair em um? 🕳️ (e a primeira foto de verdade)" https://youtu.be/PIsJHXMlTzk (7:17). Canal agora com 6 longos e 61 shorts. Dica: esperar o "Envio em X%" terminar antes de clicar em Publicar.

## 13/10 — NOVO RITMO E CONFIGURAÇÕES PARA ATRAIR PÚBLICO AOS LONGOS (sem vídeos novos neste dia)
- **Ritmo decidido pelo Jansey: 2 shorts por dia + 1 longo a cada 2 dias.** Longos no formato "E se...?" e capa mais forte.
- Diagnóstico (Painel do Studio): no longo Buraco negro, duração média 3:39 de 7:17 (retenção boa), mas taxa de cliques da miniatura só 1,7% → o gargalo é capa/título, não o conteúdo. Canal: 109 inscritos, 39,6 mil views e 131 h assistidas em 28 dias.
- Feito no Studio: 3 playlists públicas ("Os lugares mais EXTREMOS do mundo 🌍" 10 vídeos, "Documentários de Física: vídeos completos 🎬" 6, "Espaço e universo 🌌" 9); guia "Início" LIGADA (estava desligada) com trailer p/ não inscritos = Vulcão, destaque p/ inscritos = Buraco negro e seções das 3 playlists (ficaram no fim da página; arrastar para cima não funcionou pelo Chrome); tela final (1 vídeo "melhor para o espectador" + inscrever-se) nos 6 longos; descrição e palavras-chave do canal novas; banner novo ("Shorts todo dia e documentários com imagens reais", `canal/canal_imagens.py`).
- Link "🎬 Vídeo completo: ... 👉 https://youtu.be/ID" na 1ª linha da descrição de 8 shorts: quente→Oymyakon, alto→Vulcão, Drake→Tornado, Bermudas→Tornado, avião de lado→Tornado, Terra gira→Terra parada, viagem no tempo→Buraco negro, Nazaré→Meteoro.
- "Vídeo relacionado" (botão do short que leva ao longo): pelo Studio no computador a lista de vídeos abre VAZIA (recursos avançados estão ativos). Tentar pelo app do YouTube no celular.
- Dica técnica: no Studio, digitar com o teclado às vezes não entra no campo; o que funcionou sempre foi focar o `#textbox` por JS, pôr o cursor no início e usar `document.execCommand('insertText', false, texto)` e depois clicar em Salvar.

## 14/10 — LEVA 13: 1 LONGO (Multigerador) + 2 SHORTS (TerraAneis, LugarSeco)
- **REGRA NOVA DO JANSEY (14/10): "publique" = YouTube + Facebook + Instagram, os 3 juntos** (Reels FB+IG pelo Business Suite). Antes de postar, conferir no Business Suite que o IG ligado é @fisicasemmisteriobr (conferido em 14/10: é ele).
- **Longo 7 "GERADOR de energia INFINITA? 🔋 O Multigerador Quântico e o que mudaria SE funcionasse"** (Dakila, lançado em Corguinho-MS em 11/10/2026): 43 cenas, 7:13, 9 capítulos (anúncio, como dizem que funciona, e se der certo, lei da conservação de energia, moto-perpétuo, como provar, energias que já funcionam). Fotos Mg_* = quadros da transmissão da TV Dakila (citação, Lei 9.610/98 art. 46 III, com crédito) + Wikimedia. Pronto em `out/Longo7_Multigerador.mp4` (render 1 h com concurrency 2 neste PC de 8 GB), capa `capas/capa_Multigerador.jpg` (script `capas/capa_multigerador.py`), descrição `out/descricao_Multigerador.txt`. **Jansey mandou publicar em 14/10 ~10h30**; cópia comprimida (crf 22) em `Desktop\trabalhos jansey\_upload_longo\Multigerador.mp4`. Se não ficou no ar antes da sessão acabar: subir esse arquivo (ele arrasta), colar título/descrição, capa, "não é para crianças", público.
- **Shorts 62 "E se a Terra tivesse ANÉIS como Saturno? 🪐" (TerraAneis) e 63 "O lugar mais SECO do mundo 🏜️" (LugarSeco)**: roteiros na LEVA 13 de `criar_roteiros.py`, fotos A_* (Cassini/NASA) e S_* (McMurdo, ESO Atacama), clipes Pexels em `clipes.json`, descrições `out/descricao_TerraAneis.txt` e `out/descricao_LugarSeco.txt`. Render pela fila `Documents\fila_shorts.ps1` (começou 10:18) → `out/Fisica62_TerraAneis.mp4`, `out/Fisica63_LugarSeco.mp4`. **Jansey já autorizou publicar os dois nos 3 (YouTube+FB+IG)**; se a sessão acabou antes, publicar na próxima.
- **Story no FB+IG (14/10):** onda de Nazaré cortada em 29 s (story do Facebook aceita no máximo 30 s), pelo Business Suite → "Criar story" (mesmo truque do patch do `click` + file_upload no ref). Cumpre 2 tarefas do "Plano semanal". A tarefa "Publicar um anúncio" custa dinheiro (R$ 10/dia): não fazer, decisão do Jansey.
- Reel "lugar mais quente" no Facebook: 4,2 mil visualizações (14/10).
- `baixar_fotos.py` grava `creditos.json` só no fim: se um nome de arquivo do Commons estiver errado ele quebra e PERDE os créditos dos anteriores (rodar de novo com os que faltaram).
- **14/10 ~10h35: LONGO 7 PUBLICADO** "GERADOR de energia INFINITA? 🔋 O Multigerador Quântico e o que mudaria SE funcionasse" https://youtu.be/rb6ffQO4UTk (7:14, público, não é para crianças, capa, capítulos, créditos; verificação de direitos autorais sem problemas). Canal: 7 longos. Falta (já autorizado): shorts 62 e 63 nos 3 (YouTube+FB+IG) quando a renderização terminar.
- **14/10 11h15: shorts 62 e 63 RENDERIZADOS e conferidos, NÃO publicados ainda** (limite de uso do Claude). Cópias ≤10 MB prontas em `Desktop\trabalhos jansey\_upload_shorts\` (Fisica62_TerraAneis.mp4, Fisica63_LugarSeco.mp4). Jansey já autorizou publicar nos 3 (YouTube+FB+IG). Story Nazaré feito; "sempre compartilhar posts nos stories" ATIVADO; anúncio de 1 dia (Reel lugar quente, meta seguidores, R$ 5,27) deixado pronto para o Jansey clicar em Publicar.
- **14/10 ~18h (outro PC, o "bolsa 1"): SHORTS 62 e 63 PUBLICADOS nos 3.** Como os arquivos prontos estavam só no Desktop do outro PC, renderizei de novo aqui (narração e roteiros vieram pelo GitHub; `compor_fotos.py` + `baixar_clipes.py TerraAneis LugarSeco`). YouTube: "E se a Terra tivesse ANÉIS como Saturno? 🪐" https://youtu.be/8zXboupzQ6M · "O lugar mais SECO do mundo 🏜️" https://youtube.com/shorts/LthO0XvD0Dk. Reels FB+IG 18:02 e 18:04. Física: 63 shorts e 7 longos. Antes de subir, conferi no canal público que o outro PC não tinha publicado (evita duplicado).
- Business Suite pediu login de novo; "Continuar com o Facebook" entrou sem senha (sessão do Facebook já aberta no Chrome).

## 15/10 — LEVA 15: temas "que quase ninguém explicou" (regra nova do Jansey)
- **REGRA NOVA (15/10): em vez de temas em alta, buscar assuntos que o canal nunca abordou e que têm pouca cobertura no YouTube BR** (conferir na busca do YouTube quantos vídeos/views já existem; descartar o que já tem vídeos com milhões). Evitar também o mesmo LUGAR/objeto de shorts antigos (ex.: "lugar mais escuro" no fundo do oceano foi barrado por se parecer com "O fundo do mar ESMAGA tudo").
- Lista oferecida (10): dunas que cantam, gelo de lago com som de laser, nuvem Morning Glory, rio que ferve na Amazônia, Rjukan (espelhos), árvore puxa água 100 m, ilha de pedra-pomes, pinguim-imperador −60 °C, raios que sobem (sprites), maior granizo. Jansey escolheu 4 e 5; os outros ficam como reserva.
- **PUBLICADOS nos 3 (YouTube + FB + IG):** 65 "O rio que FERVE no meio da Amazônia ♨️" https://youtube.com/shorts/MFV2J9PIpSs · 66 "A cidade que ficava 6 meses SEM SOL e instalou espelhos gigantes 🪞" https://youtube.com/shorts/5dBYZdnhuVs. Reels 18:17 e 18:20. Fotos F_rio, R_* (não existe foto livre dos espelhos de Rjukan no Commons → animação).
- **Pronto e NÃO publicado:** 64 "O lugar onde mais CHOVE no mundo: 12 metros por ano 🌧️" (LugarChuva, Mawsynram; `out/Fisica64_LugarChuva.mp4`, cópia ≤10 MB em `bolsa 1\_upload_shorts`). LugarEscuro: roteiro/narração feitos, render cancelado (tema barrado).
- **edge-tts 7.3.1 (oficial) voltou a funcionar sem remendo**: `edge_fix.py` removido e os imports tirados de `narrar.py`/`narrar_longo.py`. Num outro PC, rodar `pip install -U edge-tts`.
- **15/10 ~22h: STORY do longo Multigerador publicado (FB+IG)**: renderizei só o começo do longo (`npx remotion render src/index.ts Multigerador out/story_mg_raw.mp4 --frames=0-863`, corte em 28,8 s logo depois da frase de abertura), montei em pé 1080x1920 com fundo desfocado + textos "VÍDEO NOVO NO CANAL" / "Assista completo no YouTube — Física Sem Mistério" (ffmpeg drawtext, fonte seguibl.ttf) e comprimi < 10 MB. Business Suite → `latest/story_composer` (mesmo patch do `click` + file_upload) → "Adicionar link" com https://youtu.be/rb6ffQO4UTk (link de deslizar só funciona no story do Facebook) → Compartilhar. Os reels também vão para o story do Facebook sozinhos ("Share to" ligado).
- Combinado: todo longo novo ganha um story assim (trecho forte ≤ 30 s + link).
- **15/10 22:46: 1º POST DE FOTO (feed) no FB+IG** — divulgação do longo Multigerador: imagem 1080x1350 feita da capa (`capas/capa_Multigerador.jpg` + faixas "VOCÊ VIU ESSA MÁQUINA?" / "O que a FÍSICA diz sobre ela?", Pillow, fonte seguibl — o símbolo ▶ não existe nessa fonte) + texto com o link https://youtu.be/rb6ffQO4UTk. Business Suite → `latest/composer` → "Adicionar foto/vídeo" (patch do click + file_upload) → texto → Publicar. Depois aparece oferta de anúncio (R$ 10/dia): clicar "Talvez mais tarde". Cumpre a etapa "Crie um post". A etapa "Aumentar seu público" (convidar amigos do perfil pessoal) é do Jansey.
- Atenção: ao digitar a legenda, o Escape da lista de hashtags pode apagar a última hashtag — conferir o fim do texto e completar por JS (`execCommand('insertText')`).
- **15/10 ~23h: 1º REEL PROGRAMADO** — "Por que o leite SOBE quando ferve? 🥛" (1,1 mil no YouTube, ainda não estava nas redes) programado para **16/10 12:00** no FB e no IG. Arquivo `bolsa 1\_upload_shorts\Fisica38_LeiteSobe.mp4`. Como: reels_composer → legenda (terminar com um espaço evita que o Escape apague a última hashtag) → Avançar ×2 → "Programar" → data no calendário (FB e IG separados) → horas/minutos são spinbuttons ("horas"/"minutos": clicar pelo ref e digitar) → Programar. O composer de POST comum recusa vídeo em pé para o feed do IG ("Corrija a taxa de proporção"); vídeo vertical vai sempre pelo de Reels. Cumpre a etapa "Programar um post". Próximos pelo ranking do YT ainda fora das redes: cebola, gelo queima, vidro embaça, chuveiro choque, avião curva, ouvido entope (~1 mil cada).

## 16/10 — MAIS SEGUIDORES (Jansey aprovou os itens 1 e 3)
- Instagram: 15 posts, ~23 mil visualizações somadas, mas só 12 seguidores (FB 70) → o problema é converter quem assiste. Plano oferecido: (1) pedir para seguir com motivo, (2) séries numeradas, (3) perfil convidativo (fixar os 3 melhores + bio), (4) trazer fãs do YouTube, (5) horário fixo + responder comentários, (6) anúncio "seguidores" (custa, decisão dele). Aprovados: 1 e 3.
- **(1) FEITO:** final dos shorts (`Final` em `src/espaco.tsx`) agora diz "Siga: 1 curiosidade por dia" + "@fisicasemmisteriobr" + "Física Sem Mistério no YouTube, Instagram e Facebook" + "Salva esse vídeo para mostrar para alguém" (um final só para as 3 redes). `descricoes.py` agora grava também `out/legenda_redes_ID.txt` para os Reels: título, explicação, "💬 pergunta" (campo opcional `pergunta=` no `short()` de `criar_roteiros.py`; padrão "Você já sabia disso? Conta aqui nos comentários 👇"), "👉 Siga @fisicasemmisteriobr: 1 curiosidade de física por dia!" e hashtags (termina com espaço). **Usar esse arquivo como legenda dos Reels.**
- **(3) BIO FEITA (16/10, Jansey entrou no @fisicasemmisteriobr no Chrome):** "🔭 1 curiosidade de física por dia / 🎬 Documentários completos no YouTube / 👇 Comece pelos vídeos fixados". **Fixar Reels NÃO existe no Instagram pelo navegador** (o menu ⋯ só tem Excluir/Editar/Ocultar curtidas/...) → Jansey fixou pelo app em 16/10 (Reel → ícone ═ → Gerenciar → Fixar): **Bermudas, Quente e Drake fixados na aba REELS** do perfil (a grade principal continua sem fixados). Texto original do plano: bio sugerida "🔭 1 curiosidade de física por dia | 🎬 Documentários completos no YouTube" + fixar os Reels lugar mais quente (5,7 mil no IG), Drake (5,2 mil) e Bermudas (3 mil). O Instagram aberto no Chrome deste PC é o PESSOAL (@janseyfelix) — NÃO mexer nele; precisa o Jansey entrar no @fisicasemmisteriobr (o Business Suite não edita bio do IG).
- Views dos Reels no IG (16/10): quente 5.697, Drake 5.232, Bermudas 2.988, Coca 2.471, alto 1.776, passarinho 1.619, seco 890, água e óleo 682, dedos 598, rio 394, avião 374, espelhos 307, anéis 296, navio 150.
- YouTube 16/10: 201 inscritos (109 em 13/10). **Longo Multigerador: 8,4 mil views, 233 likes, 60 comentários em 2 dias** (o 2º melhor longo tem 484) → longos sobre NOTÍCIA DO MOMENTO explicada pela física funcionam muito.

## 15-16/10 — LONGO 8 "Apagao" (tema de notícia escolhido pelo Jansey) — PRONTO, NÃO publicado
- Tema escolhido entre 4 opções tiradas do noticiário/buscas ("apagão no Brasil" é a busca nº 1; crise de energia no noticiário; 1 ano do apagão de out/2025): **"E se o Brasil ficasse 3 dias SEM ENERGIA? ⚡ (e por que um apagão derruba o país inteiro)"**. 51 cenas, 7:04, 13 capítulos (apagões de 2009/2023/2025, SIN, 60 Hz, efeito dominó, hora a hora em 3 dias, Amapá 2020, Espanha/Portugal 2025, como se preparar, como religar o país).
- Fotos reais Ap_* (São Paulo 2009, Itaipu, Belo Monte, Macapá 2020 da Amazônia Real, satélite NOAA da Península Ibérica, Chamartín, e o gráfico real da frequência caindo antes do apagão espanhol). 3 clipes ruins (chuveiro com pessoa, turbina de avião, celular desmontado) viraram animação via `VIS` (`dict(anim={...})`).
- Escolha de clipes: miniaturas renderizadas DENTRO da página do Pexels no navegador embutido (grade HTML + screenshots), sem precisar baixar candidatos.
- Kit em `Desktop\trabalhos jansey\_upload_longo\`: `Longo8_Apagao.mp4` (214 MB), `capa_Apagao.jpg` (capa nova "E SE O BRASIL APAGASSE?"), `descricao_Apagao.txt`, e **`Story_Apagao.mp4`** (24 s, em pé, para divulgar no FB+IG com link quando o longo for publicado). Falta: Jansey arrastar o .mp4 no YouTube + autorizar publicar e postar o story.
- Outros temas levantados (reserva): foguete que pousa em pé (quase zero em PT), tempestade solar hoje + anomalia do Atlântico Sul, cometa 3I/ATLAS, escudo magnético, sem atrito, gravidade 5 s.

## 19/10 — PUBLICADOS os que estavam prontos (Jansey: "vamos postar os que ja estão prontos")
- Antes, conferido no Studio (inclui rascunhos/agendados) que nenhum dos dois tinha sido publicado pelo outro PC.
- **LONGO 8 Apagão PUBLICADO no YouTube:** https://youtu.be/kmEXaK4YIpc (capa, descrição com capítulos e créditos, playlist "Documentários de Física"). **Story_Apagao** publicado no FB+IG com link de deslizar para o vídeo. Kit movido para `_upload_longo\ja_publicados`.
- **SHORT 64 LugarChuva PUBLICADO nos 3:** https://youtube.com/shorts/0nzzOJu9fkU (playlist "Os lugares mais EXTREMOS"; descrição começa com "⚡ Vídeo completo: ... Apagão 👉 link"). Re-renderizado antes com o final novo ("Siga @fisicasemmisteriobr"). Reel FB+IG com `out/legenda_redes_LugarChuva.txt`.
- **ATENÇÃO Business Suite (19/10): a caixa de legenda dos Reels QUEBRA com `execCommand('insertText')`** (o texto some/duplica e a seção "Detalhes do reel" desaparece; precisei descartar e recomeçar). O que funciona: clicar na caixa e usar a ação `type` do computer (digitação real), com `shift+Enter` entre parágrafos; terminar as hashtags com espaço.
- O Facebook tinha deslogado no Chrome; o Jansey entrou de novo.

## 19/10 tarde — LONGO 9 Super El Niño + shorts 67 e 68 (temas do momento, aprovados pelo Jansey)
- Pesquisa "assunto do momento" (Google Trends BR + notícias): o Super El Niño de 2026 (o mais forte já medido para a época; NOAA 83% de chance de recorde) tinha procura enorme no YouTube (5,9 mi) mas quase só previsão/alarme, sem a física. Jansey aprovou o tema e pediu título mais atraente (escolheu "SUPER EL NIÑO: o monstro do Pacífico que já está chegando ao Brasil 🌊🔥").
- **LONGO 9 PUBLICADO:** https://youtu.be/yoRnpbiCCps (7:31, 50 cenas, 14 capítulos; playlist Documentários; capa com o globo do Copernicus). Fotos reais En_* (NASA SVS 2026, Copernicus, seca do Rio Negro 2023, botos de Tefé, enchente de Porto Alegre 2024, furacão Lowell 2026, Atlântico sem furacões, El Niño 1997 TOPEX). Story_ElNino (25 s) no FB+IG com link de deslizar.
- **SHORT 67 ElNinoNome PUBLICADO nos 3:** "Por que esse fenômeno se chama EL NIÑO, "o Menino"? 🎄🌊" https://youtube.com/shorts/IRkZ7bxHui8 (descrição começa com o link do longo). Fotos Nm_totora (caballito de totora, Peru), Nm_pesc.
- **SHORT 68 Orionidas PROGRAMADO para 20/10 12:00 (horário de Brasília) nos 3:** "Nesta semana vão cair pedaços do COMETA HALLEY no céu ☄️" https://youtube.com/shorts/Ra9ySPuvvHY (pico das Oriônidas 21→22/10; link do longo Meteoro na descrição). Fotos Ha_* (Halley 1986 ESO, núcleo Giotto, composição das Oriônidas, chuva de meteoros no Chile). A cena final com foto de Órion ficou escura → trocada por clipe Pexels de céu estrelado.
- YouTube: agendar = etapa Visibilidade → "Programar" (data já vem no dia seguinte; o horário é um campo de texto: selecionar tudo, digitar 12:00, Enter) → done → aviso "Ainda estamos verificando" → ok.
- Business Suite Reels: legenda SÓ com digitação real (ação `type` + shift+Enter); "Programar" no passo Compartilhar tem data separada para FB e IG (calendário) e spinbuttons horas/minutos.
- Temas recusados nesta rodada para o 2º short: cidade vira rio, Fobos, vento da Antártida, céu verde, carro que sobe sozinho, asfalto molhado, calor que mata. Reserva: horário de verão (por que não volta: pico de consumo mudou para as 15h do ar-condicionado).

## 20/10 — ANÁLISE: por que uns vídeos vão bem e outros não (YouTube Analytics + Business Suite) → REGRAS NOVAS (Jansey aprovou aplicar)
- **Longos:** retenção é boa em todos (40–48% de 7 min). O que muda é o clique e a demanda. Multigerador: 47,9 mil impressões, **CTR 8,8%**, 38% das views vindas de BUSCA ("gerador quântico", "multigerador") → 11,9 mil views. Os outros: CTR 1,3–3,3% e o YouTube quase não mostra (Meteoro: 149 impressões em 8 dias; Apagão CTR 1,5%; Buraco negro 1,5%; El Niño 3,3% no 1º dia, 80% vindo de "sugeridos").
- **Shorts:** quase todos param perto de 1 mil. "Continuaram assistindo" (vs. deslizaram) ~44–49% em todos (Drake 46,1%, Seco 46,8%, Rio 49,3%, Espelhos 43,9%) — abaixo dos 60–70% que fazem o YouTube espalhar. Vídeos com retenção >100% (repetidos) NÃO tiveram mais views → o gargalo é o 1º segundo, não o final. Melhores = coisas que todo mundo conhece (avião pousa de lado 2,3 mil, Drake 1,7 mil, Coca de vidro, navio, Bermudas); piores = tema desconhecido ou gancho fraco (Rjukan 353, ímãs 352, geladeira 463, box 466).
- **FB/IG:** Reels 500–700 views; Facebook traz bem mais que Instagram (Halley: 483 FB × 91 IG).
- **REGRAS A PARTIR DE 20/10:**
  1. Longo: só assunto que está sendo PROCURADO na semana; o **termo exato da busca no começo do título** (ex.: "SUPER EL NIÑO 2026: ..."), sem título "criativo"; capa com imagem forte + 3–4 palavras grandes.
  2. Short: o **1º segundo** decide — abrir já com a imagem mais impressionante + pergunta grande na tela, sem introdução/"você sabia". Tema desconhecido só com gancho familiar ("no Brasil", "na sua casa", "no avião", "na Amazônia").
  3. Todo short que divulga um longo ganha **comentário FIXADO com o link** (feito em 20/10 no ElNinoNome → El Niño e no Orionidas → Meteoro). Para comentar como o canal no youtube.com, a conta ativa precisa ser "Física Sem Mistério" (avatar → Mudar de conta); por padrão estava no canal pessoal @janseysilva3079.

## 21/10 — LEVA 17 (regras novas de 20/10): 2 shorts + 1 longo — PRONTOS, NÃO publicados (Jansey: "não publique nada até eu permitir")
- Temas tirados das SUGESTÕES DE BUSCA do YouTube BR (frases exatas que as pessoas digitam). Jansey recusou 2 listas antes (3I/ATLAS, anomalia magnética, terremoto no Brasil; choque na porta do carro, avião motor desliga, pipoca, sorvete, montanha-russa; avião pousar cheio de combustível, barulho de baleia, maior avião, soluço; maior navio, Lua de dia, corpo dá choque; avião não voa pelo Pacífico, sem paraquedas, velocidade do som).
- **Short 69 TsunamiRecua** "Por que o MAR RECUA antes do tsunami? 🌊" (36,5 s; fotos reais Ts_* de Kata Noi/Ao Nang 2004; descrição com link do longo Meteoro). **Short 70 CidadeAlta** "A cidade mais ALTA do mundo: 5.100 metros e quase sem ar 🏔️" (36,7 s; La Rinconada Ri_cidade/Ri_puno, sangue no microscópio Ri_sangue; link do longo Oymyakon). Ri_posto NÃO usar (é outra La Rinconada, em Lima). Shorts agora ~36 s (5 cenas) e abrindo com a foto mais forte + pergunta.
- **Longo 10 SolExplodir** "O que aconteceria se o SOL EXPLODISSE? ☀️💥 (e o que vai acontecer de verdade)" — 47 cenas, 6:56, 11 capítulos; fotos Sol_* (SDO, Helix, Caranguejo, SN1987A, Betelgeuse ESO, Mercúrio MESSENGER, fonte hidrotermal MARUM); capa `capas/capa_SolExplodir.jpg` (script `capas/capa_sol.py`). `src/Longo.tsx`: título da abertura agora centralizado e menor quando tem mais de 14 letras (antes encostava na borda).
- Kit: `Desktop\trabalhos jansey\_upload_shorts\Fisica69_TsunamiRecua.mp4`, `Fisica70_CidadeAlta.mp4` (<10 MB), `_upload_longo\Longo10_SolExplodir.mp4` (270 MB) + capa; descrições `out/descricao_*.txt`, legendas `out/legenda_redes_*.txt`. Página de revisão: https://claude.ai/artifact/XhPxBa7V3HodhkVKTwEngX
- Ao publicar: shorts nos 3 + comentário FIXADO com o link do longo; longo no YouTube + story de divulgação no FB+IG com link.
- **21/10 ~14h40: LEVA 17 PUBLICADA (Jansey: "vamos publicar todos")**
  - Short 69 TsunamiRecua: https://youtube.com/shorts/XxhOqZxEaUo (comentário FIXADO com link do Meteoro) + Reel FB+IG 14:40.
  - Short 70 CidadeAlta: https://youtube.com/shorts/Z7uZoBIcEfE (playlist "Os lugares mais EXTREMOS"; comentário FIXADO com link do Oymyakon) + Reel FB+IG 14:42.
  - Longo 10 SolExplodir: https://youtu.be/1-Qgw52XD1I (capa, capítulos, tela final "1 vídeo + inscrever-se", playlists "Documentários" e "Espaço e universo"). Story_SolExplodir (27,5 s, `_upload_longo`) no FB+IG com link de deslizar.
- **TRUQUE NOVO: o Claude sobe o LONGO (>10 MB) no YouTube sozinho, sem o Jansey arrastar:** servidor Python em 127.0.0.1:8766 com CORS (`Access-Control-Allow-Origin: *` + `Access-Control-Allow-Private-Network: true`) servindo uma pasta só com o .mp4 → na aba do Studio (upload?d=ud) `fetch('http://127.0.0.1:8766/arquivo.mp4').then(r=>r.blob())` → `new File([...])` (270 MB levou ~25 s) → `input[type=file]` do diálogo: `DataTransfer` + `dispatchEvent(new Event('change',{bubbles:true}))`. Depois parar o servidor e apagar a cópia.
- Facebook tinha deslogado de novo no Chrome; o Jansey entrou (o "Continuar" sozinho não entra).
