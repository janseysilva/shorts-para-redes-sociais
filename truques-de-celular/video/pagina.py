"""Gera versões leves dos shorts e a página (index.html) do canal Truques de Celular.

Uso: python pagina.py <pasta_saida>
- <pasta_saida>/index.html + <pasta_saida>/v/CelularN_*.mp4 (720p leve, pra página)
- out/upload/CelularN_*.mp4 (1080p comprimido, < 10 MB, pra subir no YouTube)
"""
import shutil
import os, subprocess, sys
from html import escape
from pathlib import Path

RAIZ = Path(__file__).resolve().parent
FF = Path(os.environ["LOCALAPPDATA"]) / "ffmpeg/ffmpeg-8.1.2-essentials_build/bin"
if not FF.exists():  # em outro PC: usa o ffmpeg do PATH
    FF = Path(shutil.which("ffmpeg")).parent

SHORTS = [
 ("FixarConversa", "Fixe as conversas importantes no topo do WhatsApp", "Segure a conversa e toque no alfinete: ela fica sempre no topo. Dá para fixar até 3. #whatsapp #celular #truques #dicasdecelular #android"),
 ("SemSalvar", "Mande mensagem no WhatsApp sem salvar o número", "Digite wa.me/55 + DDD + número no navegador e a conversa abre direto, sem salvar o contato. #whatsapp #celular #truques #dicasdecelular #android"),
 ("LiberarEspaco", "Celular sem espaço? Libere pelo WhatsApp", "Configurações › Armazenamento e dados › Gerenciar armazenamento › Maior que 5 MB. Apague o que não precisa! #whatsapp #armazenamento #celular #truques #dicasdecelular"),
 ("Bateria", "Faça a bateria do celular durar mais", "Ative a Economia de bateria na barra de cima e baixe um pouco o brilho. #bateria #celular #android #truques #dicasdecelular"),
 ("Escanear", "Escaneie documentos em PDF com o celular", "No Google Drive: + › Digitalizar. Ele corta, deixa a folha reta e salva em PDF. #pdf #scanner #googledrive #celular #dicasdecelular"),
 ("ApagarMensagem", "Apague mensagem enviada por engano no WhatsApp", "Segure a mensagem › lixeira › Apagar para todos. Funciona até uns 2 dias depois. #whatsapp #celular #truques #dicasdecelular #android"),
 ("ModoEscuro", "Ative o tema escuro no celular", "Puxe a barra de cima e toque em Tema escuro. Descansa a vista e, em muitos celulares, economiza bateria. #modoescuro #celular #android #truques #dicasdecelular"),
 ("OuvirAudio", "Ouça seu áudio antes de mandar no WhatsApp", "Segure o microfone, arraste para o cadeado, pare e aperte o play. Gostou? Envia. Não gostou? Apaga. #whatsapp #audio #celular #truques #dicasdecelular"),
 ("DigitarFalando", "Digite falando no celular (ditado por voz)", "Toque no microfone do teclado e fale. Dá até para dizer vírgula e ponto final. #teclado #ditadoporvoz #celular #truques #dicasdecelular"),
 ("AcharCelular", "Perdeu o celular? Faça ele tocar e veja no mapa", "Entre em android.com/find com a mesma conta Google e toque em Tocar som. Toca até no silencioso! #celularperdido #android #google #truques #dicasdecelular"),
 ("SenhaWifi", "Compartilhe a senha do Wi-Fi com QR code", "Configurações › Wi-Fi › engrenagem da rede › Compartilhar. A visita aponta a câmera e conecta. #wifi #qrcode #celular #truques #dicasdecelular"),
 ("SilenciarGrupo", "Silencie grupo do WhatsApp sem sair dele", "Segure o grupo › ícone de som cortado › Sempre. As mensagens continuam chegando, sem apitar. #whatsapp #grupo #celular #truques #dicasdecelular"),
 ("Arquivar", "Esconda conversa no WhatsApp sem apagar", "Segure a conversa › Arquivar. Ela sai da lista e fica em Arquivadas. #whatsapp #privacidade #celular #truques #dicasdecelular"),
 ("Traduzir", "Traduza placas e cardápios com a câmera", "Google Tradutor › Câmera › aponte para o texto. A tradução aparece na hora. #tradutor #viagem #celular #truques #dicasdecelular"),
 ("GravarTela", "Grave a tela do celular em segundos", "Puxe a barra de cima › Gravar tela › Iniciar. O vídeo vai para a galeria. #gravartela #android #celular #truques #dicasdecelular"),
]


def dur(p):
    o = subprocess.run([str(FF / "ffprobe.exe"), "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(p)],
                       capture_output=True, text=True).stdout.strip()
    return round(float(o))


def comprimir(src, dst, altura, crf):
    if dst.exists() and dst.stat().st_mtime > src.stat().st_mtime:
        return
    dst.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run([str(FF / "ffmpeg.exe"), "-v", "error", "-y", "-i", str(src), "-vf", f"scale=-2:{altura}", "-c:v", "libx264",
                    "-crf", str(crf), "-preset", "slow", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart",
                    str(dst)], check=True)


def main(saida):
    saida = Path(saida)
    itens = []
    for n, (id_, tit, leg) in enumerate(SHORTS, 1):
        src = RAIZ / "out" / f"Celular{n}_{id_}.mp4"
        if not src.exists():
            continue
        nome = src.name
        comprimir(src, RAIZ / "out" / "upload" / nome, 1920, 24)
        comprimir(src, saida / "v" / nome, 1280, 28)
        itens.append(f"""  <section class="item">
    <video src="v/{nome}" controls playsinline preload="metadata"></video>
    <div>
      <div class="tag">Short {n} · {dur(src)} s</div>
      <h2>{escape(tit)}</h2>
      <dl>
        <dt>Título</dt>
        <dd><div class="copy"><p id="t{n}">{escape(tit)}</p><button type="button" data-copy="t{n}">Copiar</button></div></dd>
        <dt>Legenda</dt>
        <dd><div class="copy"><p id="l{n}">{escape(leg)}</p><button type="button" data-copy="l{n}">Copiar</button></div></dd>
      </dl>
    </div>
  </section>""")
    html = """<title>Truques de Celular</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap">
<style>
:root{--bg:#f2f5f3;--fg:#141a17;--muted:#5a6660;--card:#ffffff;--line:#d5ddd8;--accent:#128C4A}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--bg:#0e1311;--fg:#e8efeb;--muted:#9aa8a1;--card:#171e1b;--line:#27312c;--accent:#25D366;color-scheme:dark}}
:root[data-theme="dark"]{--bg:#0e1311;--fg:#e8efeb;--muted:#9aa8a1;--card:#171e1b;--line:#27312c;--accent:#25D366;color-scheme:dark}
body{background:var(--bg);color:var(--fg);font-family:"Rubik",system-ui,sans-serif;padding-inline:16px;padding-block:28px}
.wrap{max-width:900px;margin:0 auto;display:grid;gap:24px}
h1{font-size:28px;margin:0;text-wrap:balance}
.sub{color:var(--muted);margin:6px 0 0;font-size:15px;max-width:62ch;line-height:1.5}
.item{display:grid;grid-template-columns:minmax(0,360px) 1fr;gap:24px;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:18px}
@media (max-width:700px){.item{grid-template-columns:1fr}}
video{width:100%;max-width:100%;aspect-ratio:9/16;background:#000;border-radius:10px;display:block}
.tag{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--accent);font-weight:700;font-variant-numeric:tabular-nums}
h2{font-size:22px;margin:4px 0 12px;text-wrap:balance}
dl{margin:0;display:grid;gap:12px;font-size:15px;line-height:1.5}
dt{font-weight:600}
dd{margin:2px 0 0;color:var(--muted)}
.copy{display:flex;gap:8px;align-items:flex-start}
.copy p{margin:0;flex:1;min-width:0;background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:10px;color:var(--fg);user-select:all;overflow-wrap:anywhere}
button{font:inherit;font-size:13px;background:var(--accent);color:var(--bg);border:0;border-radius:8px;padding:8px 12px;cursor:pointer;font-weight:600}
button:focus-visible{outline:3px solid var(--fg);outline-offset:2px}
</style>
<div class="wrap">
  <header>
    <h1>Truques de Celular</h1>
    <p class="sub">Shorts prontos para postar no canal @TruquesdeCelular, com voz, legenda palavra por palavra e música. Cada um tem título e legenda para copiar.</p>
  </header>
""" + "\n".join(itens) + """
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
    (saida / "index.html").write_text(html, encoding="utf-8")
    print("ok", len(itens), "shorts")


if __name__ == "__main__":
    main(sys.argv[1])
