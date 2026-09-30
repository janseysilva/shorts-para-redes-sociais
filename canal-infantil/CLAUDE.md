# Canal infantil (4º canal de Shorts, iniciado 30/09/2026) — nome ainda não definido

## Decisões / conversa com Jansey
- Jansey queria "os melhores vídeos infantis / canais em alta", depois perguntou do canal **Mundo Torajo** (animação BR, personagens próprios como a Margo; tem o "Torajo Kids" só de shorts).
- Expliquei: **não dá para repostar/cortar vídeos de outros canais nem usar personagens deles (direito autoral: derrubada + advertência)**. O caminho é fazer conteúdo ORIGINAL no mesmo estilo:
  - esquetes animados curtos com personagens próprios (estilo Torajo Kids/LankyBox);
  - cantigas de domínio público (folclore) com arranjo e desenho próprios.
- Jansey escolheu **nome NOVO** (não usar "Espertinhos"). Ainda não escolheu qual. Sugestões dadas: "Cantinho da Criançada", "Turminha Cantarola", "Toca Aí, Criançada!".

## Teste 1 (30/09): esquete "Só mais 5 minutinhos"
- Arquivos: `video/out/Teste_Ep1_5minutinhos_v2.mp4` (a v1 usava yuvj420p e o player dele só tocava o áudio; a v2 foi reconvertida para yuv420p/tv range; **sempre entregar yuv420p**).
- Personagens em SVG: ``src/personagens.tsx``:
  - Léo: menino de camiseta vermelha, olhos piscam, boca mexe ao falar;
  - Pipoca: cachorro caramelo;
  - ``Balao``: balão de fala.
- Cena em ``src/Ep1.tsx``. Falas geradas por ``falas.py`` (edge-tts: Francisca/Antonio/Thalita com tom agudo).
- **Jansey NÃO gostou do áudio** (vozes de adulto "afinadas" soam artificiais).
  - Opções que passei: ElevenLabs (recomendado; ele cria conta e salva a chave num arquivo), Azure, CapCut/Narakeet (manual), ou versão sem voz (balões + efeitos sonoros).

## Higgsfield MCP (30/09)
- Jansey pediu para instalar: adicionado em ``~/.claude.json`` → ``mcpServers.higgsfield = {type: http, url: https://mcp.higgsfield.ai/mcp}``. Backup em ``~/.claude.json.bak-antes-higgsfield``.
- Só funciona numa **conversa nova** do Claude Code. No 1º uso, o Jansey faz login/autoriza a conta Higgsfield no navegador (o Claude não cria conta).
- Gera vídeo/imagem com IA (30+ modelos). Provavelmente gasta créditos: **conferir o custo antes de gerar**. Testar se algum modelo gera fala/voz, porque isso resolveria o problema das vozes.

### Conectada em 30/09 (fim do dia)
- **Pegadinha:** a tela "Unable to load this consent request" só aparecia porque o cadastro da Higgsfield não estava terminado (faltava responder o "Quiz" inicial). Depois de responder e clicar "Conectar" de novo, funcionou. O conector aparece como `mcp__67f46d85-...` (claude.ai connector, não precisou do `~/.claude.json`).
- **Conta: plano grátis, 10 créditos.** Custos conferidos (sem gastar nada ainda):
  - Voz (`generate_audio`): seed_audio ≈ 0,2 crédito por fala; text2speech_v2/elevenlabs ≈ 0,15. Com 10 créditos cabem ~50 falas (~8 episódios).
  - Vídeo com IA: Seedance 2.5 480p 5s = 15 créditos; Kling 3.0 std sem som 5s = 7,5. **Não compensa no plano grátis.**
- Vozes preset são nomes em inglês (ex.: Pixie `0178ef57-ada4-43d9-992b-8d9221045bb4`, voz feminina aguda). Falta testar como soam em português.
- **Recomendação passada ao Jansey:** Higgsfield só pras VOZES; animação continua no Remotion (grátis).

## Próximo passo
1. Jansey respondeu nada ainda sobre a proposta: **gerar "Só mais cinco minutinhos..." em 3 vozes (~0,6 crédito)** pra ele escolher. Perguntar de novo antes de gastar.
2. Com a voz escolhida, trocar o edge-tts do `falas.py` pelas falas da Higgsfield e refazer o Ep1.
3. Jansey escolhe o nome → criar o canal (conta janseysilva@gmail.com, marcar "conteúdo para crianças") → fazer uma leva de shorts.
