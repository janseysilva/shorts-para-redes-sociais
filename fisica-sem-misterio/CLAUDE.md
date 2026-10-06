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
