# Gerador de Declarações Escolares

Abra `gerador-declaracoes.html` com dois cliques (Chrome, Edge ou Firefox). Não precisa instalar nada e funciona sem internet.

## Como usar
1. **Primeira vez:** preencha os *Dados da escola* (nome, INEP, endereço, quem assina, logotipo). Fica salvo no computador.
2. **Abrir arquivo de alunos:** escolha o arquivo do bloco de notas (.txt). Ele vira o banco de dados e fica guardado; só abra de novo quando a lista mudar ("Trocar arquivo").
3. **Pesquisar aluno:** digite parte do nome (com ou sem acento) e clique no aluno encontrado.
4. **Gerar declaração de:** Matrícula, Frequência, Transferência, Conclusão, Vaga ou Comparecimento.
5. **Imprimir / Salvar PDF.**

A data da declaração e o ano letivo vêm do relógio do computador. O número da declaração (Nº 001/2026) sobe sozinho a cada impressão.

## Formato do arquivo de alunos
O programa reconhece sozinho:
- colunas separadas por tabulação, `;`, `|` ou 2+ espaços, com ou sem linha de títulos (Nome, Sexo, Nascimento, Ano, Turma, Turno, Mãe, Pai);
- blocos `Nome: ... / Mãe: ... / Ano: ...` separados por linha em branco;
- só um nome por linha.

Arquivos salvos em ANSI (Bloco de Notas antigo) também funcionam. Os dados dos alunos não saem do computador.
