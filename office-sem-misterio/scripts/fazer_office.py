"""Gera um short de Word/PowerPoint a partir de animacoes/office.html (versão Windows do fazer_short.sh).

Uso (na pasta do projeto):
  python scripts/fazer_office.py word 1 narracao/w1.json videos/Short6_MalaDireta.mp4
  python scripts/fazer_office.py word 1 --previa 2,9,17,27   (só tira prints desses segundos, em previa/)
"""
import json, os, subprocess, sys, tempfile
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
FFMPEG = Path(os.environ["LOCALAPPDATA"]) / "ffmpeg/ffmpeg-8.1.2-essentials_build/bin/ffmpeg.exe"
os.chdir(RAIZ)


def html_pronto(app, modo, pasta):
    src = (RAIZ / "animacoes/office.html").read_text(encoding="utf-8")
    out = Path(pasta) / f"{app}{modo}.html"
    out.write_text(src.replace("__APP__", app).replace("__MODE__", str(modo)), encoding="utf-8")
    return out


def narrar(cenas_json, pref):
    import numpy as np, soundfile as sf, sherpa_onnx
    scenes = json.loads(Path(cenas_json).read_text(encoding="utf-8"))
    d = "tts/vits-piper-pt_BR-faber-medium"
    tts = sherpa_onnx.OfflineTts(sherpa_onnx.OfflineTtsConfig(model=sherpa_onnx.OfflineTtsModelConfig(
        vits=sherpa_onnx.OfflineTtsVitsModelConfig(model=f"{d}/pt_BR-faber-medium.onnx", tokens=f"{d}/tokens.txt",
                                                    data_dir=f"{d}/espeak-ng-data"), num_threads=4)))
    clips, plan, v, sr = [], [], 0, None
    for a, b, txt in scenes:
        g = tts.generate(txt, sid=0, speed=1.1)
        s = np.array(g.samples, dtype=np.float32); sr = g.sample_rate
        dur = max(b - a, len(s) / sr + 0.35)
        plan.append(dict(a=a, b=b, v0=v, dur=dur)); clips.append((v + 0.1, s)); v += dur
    total = v + 0.3
    au = np.zeros(int(total * sr) + sr, dtype=np.float32)
    for stt, s in clips:
        i = int(stt * sr); au[i:i + len(s)] += s
    au = au / max(1e-6, np.abs(au).max()) * 0.9
    sf.write(pref + ".wav", au[:int(total * sr)], sr)
    return plan, total


def quadros(html, tempos, pasta, png=False):
    from playwright.sync_api import sync_playwright
    os.makedirs(pasta, exist_ok=True)
    with sync_playwright() as pw:
        b = pw.chromium.launch(); pg = b.new_page(viewport={"width": 1080, "height": 1920})
        pg.goto(Path(html).resolve().as_uri())
        for i, t in enumerate(tempos):
            pg.evaluate(f"render({t})")
            if png:
                pg.screenshot(path=f"{pasta}/t{t:05.1f}.png")
            else:
                pg.screenshot(path=f"{pasta}/f{i:05d}.jpg", type="jpeg", quality=90)
        b.close()


def main():
    app, modo = sys.argv[1], int(sys.argv[2])
    tmp = tempfile.mkdtemp()
    html = html_pronto(app, modo, tmp)
    if sys.argv[3] == "--previa":
        ts = [float(x) for x in sys.argv[4].split(",")]
        quadros(html, ts, str(RAIZ / "previa" / f"{app}{modo}"), png=True)
        print("previa ok"); return
    cenas, saida = sys.argv[3], sys.argv[4]
    plan, total = narrar(cenas, f"{tmp}/n")

    def amap(v):
        for p in plan:
            if v < p["v0"] + p["dur"]:
                return p["a"] + min(max(v - p["v0"], 0), p["b"] - p["a"] - 0.01)
        return plan[-1]["b"] - 0.01
    quadros(html, [amap(i / 30) for i in range(int(total * 30))], f"{tmp}/fr")
    subprocess.run([str(FFMPEG), "-v", "error", "-y", "-framerate", "30", "-i", f"{tmp}/fr/f%05d.jpg", "-i", f"{tmp}/n.wav",
                    "-c:v", "libx264", "-crf", "18", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "160k",
                    "-af", "loudnorm=I=-16:TP=-1.5", "-shortest", "-movflags", "+faststart", saida], check=True)
    print(f"Pronto: {saida} ({total:.1f}s)")


if __name__ == "__main__":
    main()
