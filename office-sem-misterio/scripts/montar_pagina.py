"""Monta pagina_shorts.html (página de vídeos do artifact) com a duração real de cada short."""
import json, os, subprocess
from pathlib import Path
from html import escape

RAIZ = Path(__file__).resolve().parent.parent
FFPROBE = Path(os.environ["LOCALAPPDATA"]) / "ffmpeg/ffmpeg-8.1.2-essentials_build/bin/ffprobe.exe"

SHORTS = [
 ("Excel", "Short1_PROCV.mp4", "PROCV: o nome aparece sozinho", "Digita a matrícula e o nome aparece sozinho (PROCV no Excel)", "PROCV em 30 segundos: busque o nome do aluno pela matrícula. Salva para usar no trabalho! #excel #planilha #procv #professor #dicasdeexcel"),
 ("Excel", "Short2_Presenca.mp4", "% de presença sem calculadora", "Como calcular % de presença no Excel em 10 segundos", "Frequência da turma toda de uma vez, sem calculadora. Salva para o fechamento do bimestre! #excel #planilha #frequencia #professor #dicasdeexcel"),
 ("Excel", "Short3_Vermelho.mp4", "Vermelho automático abaixo de 75%", "Quem tem menos de 75% de presença fica vermelho sozinho (Excel)", "Formatação condicional: veja na hora quem está em risco de reprovar por falta. #excel #planilha #formatacaocondicional #professor #dicasdeexcel"),
 ("Excel", "Short4_ListaSuspensa.mp4", "Lista suspensa de conceitos", "Lista suspensa no Excel: acabou a bagunça nos conceitos", "Com validação de dados, cada um escolhe o conceito na setinha e ninguém escreve do próprio jeito. #excel #planilha #listasuspensa #professor #dicasdeexcel"),
 ("Excel", "Short5_CtrlE.mp4", "Ctrl + E: separar nome e sobrenome", "Separe nome e sobrenome em 1 segundo no Excel (Ctrl + E)", "Preenchimento Relâmpago: o atalho que separa nomes da lista inteira sozinho. Guarda esse! #excel #planilha #atalhos #ctrle #dicasdeexcel"),
 ("Word", "Short6_Word_MalaDireta.mp4", "Mala direta: 30 declarações de uma vez", "30 declarações em 1 clique: mala direta no Word", "Uma declaração para cada aluno, com nome e turma certinhos, puxando da planilha do Excel. Salva para a próxima entrega de documentos! #word #maladireta #secretariaescolar #professor #dicasdeword"),
 ("Word", "Short7_Word_Sumario.mp4", "Sumário automático", "Sumário automático no Word (com número de página)", "Nunca mais faça sumário na mão: estilo Título 1 + Referências › Sumário. E se mudar algo, é só atualizar. #word #sumario #trabalhoescolar #professor #dicasdeword"),
 ("Word", "Short8_Word_Timbre.mp4", "Timbre da escola em todas as páginas", "Timbre da escola em todas as páginas do Word (cabeçalho)", "Coloque o nome e o endereço da escola no cabeçalho uma vez só e ele aparece em todas as páginas. #word #cabecalho #secretariaescolar #oficio #dicasdeword"),
 ("Word", "Short9_Word_ShiftF3.mp4", "Shift + F3: maiúscula e minúscula", "Digitou tudo em MAIÚSCULO? Shift + F3 no Word resolve", "Não precisa apagar e digitar de novo: Shift + F3 alterna entre minúsculo, primeira letra maiúscula e MAIÚSCULO. #word #atalhos #shiftf3 #professor #dicasdeword"),
 ("Word", "Short10_Word_TituloTabela.mp4", "Título da tabela em todas as páginas", "Tabela no Word: repetir o título das colunas em todas as páginas", "Lista de presença com várias páginas? Repetir Linhas de Cabeçalho coloca o título das colunas em todas. #word #tabela #listadepresenca #secretariaescolar #dicasdeword"),
 ("PowerPoint", "Short11_PPT_SmartArt.mp4", "Texto vira diagrama (SmartArt)", "Slide só com texto? Transforme em diagrama no PowerPoint", "Converter em SmartArt: seus tópicos viram um diagrama colorido em dois cliques. Ótimo para reunião de pais! #powerpoint #smartart #slides #professor #dicasdepowerpoint"),
 ("PowerPoint", "Short12_PPT_Designer.mp4", "Designer: slide bonito sozinho", "O PowerPoint monta o slide pra você (Designer)", "Coloque o título e uma foto, clique em Designer e escolha um modelo pronto. Recurso do Microsoft 365. #powerpoint #designer #slides #professor #dicasdepowerpoint"),
 ("PowerPoint", "Short13_PPT_Video.mp4", "Apresentação vira vídeo", "Transforme sua apresentação em vídeo no PowerPoint", "Arquivo › Exportar › Criar um Vídeo: um vídeo que abre em qualquer celular, pronto para mandar no grupo dos pais. #powerpoint #video #reuniaodepais #professor #dicasdepowerpoint"),
 ("PowerPoint", "Short14_PPT_F5.mp4", "F5 e Shift + F5", "Comece a apresentação sem procurar botão: F5 e Shift + F5", "F5 começa do primeiro slide, Shift + F5 começa do slide atual e Esc sai. Guarda esses atalhos! #powerpoint #atalhos #apresentacao #professor #dicasdepowerpoint"),
 ("PowerPoint", "Short15_PPT_Alinhar.mp4", "Alinhar e distribuir caixas", "Caixas tortas no slide? Alinhe tudo em 1 segundo no PowerPoint", "Alinhar no Meio deixa todas na mesma altura e Distribuir Horizontalmente iguala o espaço entre elas. #powerpoint #alinhar #slides #professor #dicasdepowerpoint"),
]


def dur(f):
    p = RAIZ / "videos" / f
    if not p.exists():
        return None
    out = subprocess.run([str(FFPROBE), "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(p)],
                         capture_output=True, text=True).stdout.strip()
    return round(float(out))


def secao(n, s):
    app, f, h, tit, leg = s
    d = dur(f)
    return f"""  <section class="item" id="s{n}">
    <video src="{f}" controls playsinline preload="metadata"></video>
    <div>
      <div class="tag">Short {n} · {app} · {d} s</div>
      <h2>{escape(h)}</h2>
      <dl>
        <dt>Título</dt>
        <dd><div class="copy"><p id="t{n}">{escape(tit)}</p><button type="button" data-copy="t{n}">Copiar</button></div></dd>
        <dt>Legenda</dt>
        <dd><div class="copy"><p id="l{n}">{escape(leg)}</p><button type="button" data-copy="l{n}">Copiar</button></div></dd>
      </dl>
    </div>
  </section>"""


GRUPOS = [("Excel", "excel"), ("Word", "word"), ("PowerPoint", "ppt")]
corpo = []
for nome, idg in GRUPOS:
    itens = [secao(i + 1, s) for i, s in enumerate(SHORTS) if s[0] == nome and dur(s[1]) is not None]
    if not itens:
        continue
    corpo.append(f'  <h3 class="grp g-{idg}" id="{idg}">{nome} <span>{len(itens)} shorts</span></h3>\n' + "\n".join(itens))

html = """<title>Office Sem Mistério</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap">
<style>
:root{--bg:#f3f5f6;--fg:#161b20;--muted:#5a646d;--card:#ffffff;--line:#d6dde2;--accent:#107c41;--xl:#107c41;--wd:#2b579a;--pp:#c43e1c}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--bg:#101316;--fg:#e8edf0;--muted:#9aa6ae;--card:#181d21;--line:#2a3238;--accent:#3ddc84;--xl:#3ddc84;--wd:#6ea2ff;--pp:#ff8a5c;color-scheme:dark}}
:root[data-theme="dark"]{--bg:#101316;--fg:#e8edf0;--muted:#9aa6ae;--card:#181d21;--line:#2a3238;--accent:#3ddc84;--xl:#3ddc84;--wd:#6ea2ff;--pp:#ff8a5c;color-scheme:dark}
body{background:var(--bg);color:var(--fg);font-family:"Rubik",system-ui,sans-serif;padding-inline:16px;padding-block:28px}
.wrap{max-width:900px;margin:0 auto;display:grid;gap:24px}
h1{font-size:28px;margin:0;text-wrap:balance}
.sub{color:var(--muted);margin:6px 0 0;font-size:15px;max-width:62ch;line-height:1.5}
nav{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
nav a{font-weight:600;font-size:14px;text-decoration:none;padding:7px 14px;border-radius:999px;border:2px solid currentColor}
.c-excel{color:var(--xl)}.c-word{color:var(--wd)}.c-ppt{color:var(--pp)}
.grp{font-size:22px;margin:12px 0 -8px;display:flex;align-items:baseline;gap:10px}
.grp span{font-size:14px;font-weight:400;color:var(--muted)}
.g-excel{color:var(--xl)}.g-word{color:var(--wd)}.g-ppt{color:var(--pp)}
.item{display:grid;grid-template-columns:minmax(0,360px) 1fr;gap:24px;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:18px}
@media (max-width:700px){.item{grid-template-columns:1fr}}
video{width:100%;max-width:100%;aspect-ratio:9/16;background:#000;border-radius:10px;display:block}
.tag{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);font-weight:700;font-variant-numeric:tabular-nums}
h2{font-size:22px;margin:4px 0 12px;text-wrap:balance}
dl{margin:0;display:grid;gap:12px;font-size:15px;line-height:1.5}
dt{font-weight:600}
dd{margin:2px 0 0;color:var(--muted)}
.copy{display:flex;gap:8px;align-items:flex-start}
.copy p{margin:0;flex:1;min-width:0;background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:10px;color:var(--fg);user-select:all;overflow-wrap:anywhere}
button{font:inherit;font-size:13px;background:var(--accent);color:var(--bg);border:0;border-radius:8px;padding:8px 12px;cursor:pointer;font-weight:600}
button:focus-visible,nav a:focus-visible{outline:3px solid var(--fg);outline-offset:2px}
</style>
<div class="wrap">
  <header>
    <h1>Office Sem Mistério</h1>
    <p class="sub">Shorts prontos para postar, narrados pela voz do Faber, separados por programa. Cada um tem título e legenda para copiar.</p>
    <nav><a class="c-excel" href="#excel">Excel</a><a class="c-word" href="#word">Word</a><a class="c-ppt" href="#ppt">PowerPoint</a></nav>
  </header>
""" + "\n".join(corpo) + """
</div>
<script>
document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',()=>{
  const el=document.getElementById(b.dataset.copy);
  const done=()=>{b.textContent='Copiado';setTimeout(()=>b.textContent='Copiar',1500)};
  const sel=()=>{const r=document.createRange();r.selectNodeContents(el);const s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent='Selecionado'};
  try{navigator.clipboard.writeText(el.textContent).then(done,sel)}catch(e){sel()}
}));
</script>
"""
(RAIZ / "pagina_shorts.html").write_text(html, encoding="utf-8")
print("ok", [s[1] for s in SHORTS if dur(s[1]) is None])
