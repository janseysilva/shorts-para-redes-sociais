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
