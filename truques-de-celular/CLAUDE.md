# Canal de Shorts de Dicas de Celular (2º canal, iniciado 29/09/2026)

## Decisões
- Tema escolhido por Jansey entre 5 sugestões: **dicas de celular** (Android/WhatsApp etc.), público GERAL (nada de escola).
- **CANAL CRIADO em 29/09: "Truques de Celular", @TruquesdeCelular** (nome escolhido por Jansey), id UCSbkcTcpsPVAu7fJWCcXxBg, Conta de marca na conta `janseysilva@gmail.com`. Foto/banner em `canal/` (gerador `canal/canal_imagens.py`), enviados pelo Studio junto com a descrição: "Truques rápidos para usar melhor o seu celular: WhatsApp, câmera, bateria, espaço de armazenamento, segurança e muito mais. Um truque novo em cada short." Nenhum short enviado ainda (o de teste NÃO foi publicado).
- Ferramenta nova: **Remotion** (vídeo em React), a pedido de Jansey. Node.js portátil v24.21.0 em `%LOCALAPPDATA%\nodejs\node-v24.21.0-win-x64` (já no PATH do usuário; em sessão nova pode precisar `$env:Path="$env:LOCALAPPDATA\nodejs\node-v24.21.0-win-x64;$env:Path"`). Plugin "Remotion" do diretório de plugins foi sugerido (cartão), Jansey ia instalar.
- Voz: **pt-BR-AntonioNeural** (edge-tts, +8%), com tempo de cada palavra → legenda palavra por palavra (a falada acende em amarelo).
- Dados/nomes sempre fictícios. Não copiar logotipo de app de verdade (a tela do "WhatsApp" é desenhada genérica).

## Como gerar um short (pasta `video/`)
1. Roteiro em `roteiros/NOME.json` (`{"titulo":..., "frases":[...]}` — uma frase por cena).
2. `python narrar.py roteiros/NOME.json` → `public/narracao.mp3` + `public/tempos.json` (palavras e início de cada frase).
3. Composição React em `src/` (teste: `FixarConversa.tsx`, registrada em `Root.tsx`; `Legenda.tsx` é reaproveitável).
4. Prévia de quadros: `npx remotion still src/index.ts FixarConversa previa/f150.png --frame=150`.
5. Vídeo: `npx remotion render src/index.ts FixarConversa out/X.mp4` (~1 min por short).
- Cuidado: `package.json` não pode ter BOM (PowerShell `Set-Content -Encoding utf8` põe BOM e quebra o Remotion).

## Status
- 29/09: 1 short de TESTE pronto ("Fixe as conversas importantes no topo do WhatsApp", 20s) em `video/out/Teste_FixarConversa.mp4`, página: https://claude.ai/artifact/M7HwdNzVfztcAmWtJTgwPj — aguardando Jansey assistir e aprovar o estilo.
- 29/09: Jansey achou a v1 "igual aos de Excel" e pediu "mais animado" → **v2 animada** (`out/Teste2_FixarConversa_Animado.mp4`, mesma página): câmera com zoom/pan (tabela CAM), celular 3D girando, fundo com bolhas e ícones flutuando, título palavra por palavra pulando (faixa escura atrás), mensagens chegando no início, explosão de alfinetes, tremidinha, barra de progresso, final com revelação em círculo, música + efeitos sintetizados (`python sons.py <segundos>` → public/*.wav, sem direito autoral). Legenda e título com fundo escuro pra ficarem legíveis sobre o zoom. **Jansey aprovou o estilo da v2 ("ficou bom"), só pediu pra TIRAR a explosão de alfinetes/estrelas — removida. Não usar explosões/partículas nos próximos.** Esse é o padrão visual do canal.
- **29/09: 15 SHORTS PRONTOS** (mesma quantidade do Office, pedido de Jansey), aguardando Jansey assistir/aprovar antes de publicar: 1 FixarConversa, 2 SemSalvar (wa.me), 3 LiberarEspaco (WhatsApp armazenamento), 4 Bateria, 5 Escanear (Drive), 6 ApagarMensagem, 7 ModoEscuro, 8 OuvirAudio, 9 DigitarFalando, 10 AcharCelular (android.com/find), 11 SenhaWifi (QR), 12 SilenciarGrupo, 13 Arquivar, 14 Traduzir (Google Tradutor câmera), 15 GravarTela. Originais em `video/out/CelularN_*.mp4` (~10 MB), versões pra subir no YouTube em `video/out/upload/` (~4-5 MB, 1080p crf 24 — cabem no limite de 10 MB do upload automatizado), página com os 15 + título/legenda: mesma URL do teste. Títulos/legendas ficam em `video/pagina.py` (`python pagina.py <pasta>` comprime e monta a página).
- Estrutura do código: `src/kit.tsx` (celular 3D, câmera, dedo, título pulando, trilha, final, peças de tela), `src/telas.tsx` (tela inicial, teclado, lista de conversas, painel rápido, balão), um arquivo por short em `src/shorts/`, registrado em `src/Root.tsx`. `npx tsc --noEmit` checa tudo; `python previa.py <Id> 1,5,9` tira prints.
- 29/09: Jansey mandou publicar os 15, mas o 1º já foi barrado: **o limite diário de envios é da CONTA inteira (janseysilva@gmail.com), não por canal** — os 14 do Office do mesmo dia esgotaram. Nenhum short de celular publicado ainda. Arquivos prontos pra subir em `Desktop\trabalhos jansey\_upload_celular\` (apagar depois). Procedimento de upload igual ao do Office (ver CLAUDE.md do excel-sem-misterio). Canal Studio: studio.youtube.com/channel/UCSbkcTcpsPVAu7fJWCcXxBg.
- 29/09 (depois): Jansey verificou o telefone → canal com recursos padrão/intermediários/AVANÇADOS todos "Ativado"; limite diário liberou. **Publicado só o Short 1 (FixarConversa)**; parou por limite de uso do Claude. Faltam os shorts 2 a 15 (ordem de `pagina.py`), arquivos em `Desktop\trabalhos jansey\_upload_celular\`. Novidade no upload: ao clicar Publicar aparece "Ainda estamos verificando seu conteúdo" → clicar "Publicar mesmo assim" (conteúdo 100% original). A ferramenta `find` do Chrome usa cota do Claude — preferir `read_page`/coordenadas.
- **29/09: OS 15 SHORTS PUBLICADOS** (públicos, "não é conteúdo para crianças"), conferido na aba Shorts do Studio: 15 itens, todos "Público". Pasta `_upload_celular` apagada (originais continuam em `video/out/`).
- **Lição sobre limite de envio**: o limite diário é POR CANAL, conforme a verificação de cada canal — o Truques (telefone verificado, avançado ativo) subiu 14 no mesmo dia sem problema, mas o Office Sem Mistério continuou barrado. Cada canal (Conta de marca) precisa da própria verificação.
- Próximo: nada pendente; novos shorts quando Jansey pedir (tópicos novos, mesmo estilo).

## LEVA 2 — shorts 16 a 20 (TEMAS EM ALTA, aprovados por Jansey em 29/09 à noite; os antigos lanterna/não perturbe/modo avião/roteador/print foram REJEITADOS)
Temas escolhidos por pesquisa do que está em alta em 2026 (golpes/segurança, novidades do WhatsApp e do Pix).
Código: `src/shorts/Leva2.tsx` (`ShortEtapas` = sequência de telas + dedo tocando). Roteiros gerados por `roteiros_leva2.py`, narração JÁ gerada.
16 DuasEtapas — "Evite ter o WhatsApp clonado: confirmação em duas etapas" / "Configurações › Conta › Confirmação em duas etapas › Ativar e crie um PIN de 6 números. Nunca passe o código do SMS! #whatsapp #golpe #seguranca #celular #dicasdecelular"
17 PinChip — "Proteja o seu número se roubarem o celular (PIN do chip)" / "Configurações › Segurança › Bloqueio do chip SIM. O primeiro PIN vem no cartão da operadora; 3 erros bloqueiam o chip. #celular #seguranca #roubo #chip #dicasdecelular"
18 Transcrever — "Transforme áudio do WhatsApp em texto" / "Configurações › Conversas › Transcrição de mensagens de voz. Depois toque em Transcrever embaixo do áudio. #whatsapp #audio #celular #truques #dicasdecelular"
19 PixAproximacao — "Pague com Pix só encostando o celular" / "No app do banco, ative o Pix por aproximação e encoste na maquininha. Android com NFC ligado. #pix #pixporaproximacao #celular #android #dicasdecelular"
20 GolpePix — "Golpe do Pix no WhatsApp: os 3 sinais" / "Número novo, pressa e pedido de Pix = golpe. Ligue para o número antigo antes de qualquer coisa. #golpe #pix #whatsapp #seguranca #dicasdecelular"
**30/09: OS 5 PUBLICADOS** (Jansey aprovou). Títulos usados no YouTube: 16 'Clonaram o WhatsApp de alguém que você conhece? Ative isso agora 🔐' · 17 'Roubaram seu celular? Faça isso ANTES para proteger seu número' · 18 'Chega de ouvir áudio de 5 minutos no WhatsApp 😅' · 19 'Pague com Pix só encostando o celular (pouca gente sabe)' · 20 '"Oi mãe, troquei de número"? CUIDADO, é golpe 🚨' (o 20 ficou 'Pendente' de processamento, fica público sozinho). Dica de upload: o 1º texto digitado logo após subir o arquivo some (o YouTube recarrega o formulário quando o envio termina) — digitar de novo.
(histórico) STATUS (29/09 ~18h, Jansey desligou o PC): código pronto e `tsc` ok; as prévias estavam sendo geradas quando o PC foi desligado — PRÓXIMO: `python previa.py <Id> ...` de cada um e conferir, depois renderizar (`npx remotion render src/index.ts <Id> out/CelularN_<Id>.mp4`), acrescentar os 5 em `pagina.py` e mostrar ao Jansey.

## LEVA 3 — shorts 21 a 25 (feita em 01/10, no PC novo; PUBLICADA em 01/10)
Temas escolhidos pelas buscas do YouTube Brasil e pelos shorts que mais tiveram visualização (PinChip 359, Fixar 295, Transcrever 243). Silenciar desconhecidos foi feito e APAGADO por não estar em alta.
Código: `src/shorts/Leva3.tsx` (reaproveita `ShortEtapas`, `Config`, `Centro`, `Aviso`... exportados de `Leva2.tsx`). Roteiros: `roteiros_leva3.py`. Vídeos: `video/out/Celular21..25_*.mp4` e `out/upload/` (comprimidos).
21 FalsaCentral — "Ligaram do \"seu banco\" pedindo código? É GOLPE 🚨" / "Banco nunca pede senha, código do SMS ou Pix de teste. Desligue e ligue para o número atrás do cartão, de outro telefone. #golpe #banco #seguranca #celular #dicasdecelular"
22 CelularSeguro — "Celular roubado: bloqueie banco e linha de uma vez 🛡️" / "No app ou site Celular Seguro (gov.br), cadastre o celular e uma pessoa de confiança. Se roubarem, emita o alerta e bancos e operadoras parceiros bloqueiam o acesso. #celularseguro #roubo #seguranca #celular #dicasdecelular"
23 LerEscondido — "Leia a mensagem sem a pessoa saber 👀" / "Configurações › Privacidade › Confirmações de leitura (desligar). Em Visto por último e online, escolha quem vê quando você está online. Vale para os dois lados e não funciona em grupos. #whatsapp #privacidade #truques #celular #dicasdecelular"
24 TrancarConversa — "Tranque uma conversa do WhatsApp com a digital 🔒" / "Abra a conversa › toque no nome › Bloqueio de conversa. Ela vai para a pasta Conversas trancadas. #whatsapp #privacidade #celular #truques #dicasdecelular"
25 FotoPerfil — "Esconda sua foto do WhatsApp de quem não é contato 🙈" / "Configurações › Privacidade › Foto do perfil › Meus contatos. Faça o mesmo com Visto por último e Recado. #whatsapp #privacidade #golpe #celular #dicasdecelular"
- **PC novo (01/10):** Node fica em `C:\Program Files\nodejs` (já no PATH) e o ffmpeg veio pelo winget. `previa.py` e `pagina.py` usam o do PATH quando o caminho antigo não existe.
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
