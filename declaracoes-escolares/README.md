# Gerador de Declarações Escolares

Abra `gerador-declaracoes.html` com dois cliques (Chrome, Edge ou Firefox). Não precisa instalar nada e funciona sem internet.

1. **Dados da escola** (só na primeira vez): cabeçalho, nome, INEP, endereço, quem assina, logotipo. Ficam salvos no navegador.
2. **Tipo**: Matrícula, Frequência, Transferência, Conclusão, Vaga ou Comparecimento.
3. **Aluno**: clique em **Abrir lista de alunos (.txt)**, escolha o arquivo do bloco de notas e digite parte do nome em **Pesquisar aluno**. Ao escolher o aluno, os campos são preenchidos sozinhos.
   - A lista fica guardada no navegador até clicar em "Esquecer lista". Os dados não saem do computador.
   - Formatos aceitos: colunas separadas por tabulação, `;`, `|` ou 2+ espaços (com ou sem linha de títulos), blocos `Nome: ... / Mãe: ...` separados por linha em branco, ou só um nome por linha. Arquivos salvos em ANSI (Bloco de Notas antigo) também funcionam.
   - Também dá para preencher à mão, ou usar "Vários" e colar as linhas da planilha nesta ordem:
   `Nome · Sexo (M/F) · Nascimento · Ano · Turma · Turno · Mãe`
4. **Imprimir / Salvar PDF**: sai uma folha A4 por aluno. O número da declaração sobe sozinho depois de imprimir.

O texto concorda com o sexo do aluno (matriculado/matriculada). Para mudar alguma frase, marque "Ajustar o texto à mão" e clique na folha. "Copiar para o Word" leva a declaração formatada para colar no Word.
