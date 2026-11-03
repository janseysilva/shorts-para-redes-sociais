# Declarações Escolares

## Programa do Windows (principal)
`declaracoes_escolares.py`: mesma janela e mesmo visual do Frequência Inteligente (960×750, faixa azul, quadros numerados, botão verde).
Lê o TXTALUNO da SEMED e guarda como banco de dados. Na tela, você pesquisa o aluno, escolhe o tipo e clica em **Gerar declaração**. O PDF (ou Word) abre pronto para imprimir.

Gerar o executável e o instalador (no PC com Windows):
```
pip install -r requirements.txt
python -m PyInstaller DeclaracoesEscolares.spec
ISCC.exe instalador_declaracoes.iss
```
Guia de uso: `LEIA-ME.txt`. Os dados ficam em `%APPDATA%\Declaracoes Escolares` e nunca vão para o GitHub.

## Versão de navegador (antiga)

Abra `gerador-declaracoes.html` com dois cliques (Chrome, Edge ou Firefox). Não precisa instalar nada e funciona sem internet.

## Como usar
1. **Configuração** (uma vez): clique em *Abrir arquivo de alunos* e escolha o `TXTALUNO_xxxxx.txt` exportado do sistema da SEMED. Ele vira o banco de dados e fica guardado no computador. Quando a lista mudar, abra o arquivo novo. Na mesma tela ficam os dados da escola (nome, INEP, quem assina, logotipo).
2. **Tela inicial:** só o campo *Pesquisar aluno*. Digite parte do nome (com ou sem acento) ou o código do aluno.
3. Clique no aluno e escolha a declaração: Matrícula, Frequência, Transferência, Conclusão, Vaga ou Comparecimento.
4. **Imprimir / Salvar PDF.**

A data da declaração e o ano letivo vêm do relógio do computador. O número da declaração (Nº 001/2026) sobe sozinho a cada impressão.

## Arquivo de alunos
Lê direto o TXT da SEMED (`Codigo do Aluno;Nome do Aluno;Nome Social;Data de Nascimento;...;Fase;Turma;Codigo Turma`), em ANSI ou UTF-8. Usa: código, nome (e nome social, se houver), nascimento, sexo, fase (1º/2º período) e turma. Endereço, telefone, cartão SUS etc. são ignorados.

Também reconhece outros formatos: colunas separadas por tabulação, `;`, `|` ou espaços, blocos `Nome: ...`, ou um nome por linha.

Os dados dos alunos não saem do computador e não vão para o GitHub.
