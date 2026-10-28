"""Cola o final de divulgação do app Espertinhos no fim de um vídeo (regra do Jansey, 28/10).
Uso:  python adicionar_final_app.py ENTRADA.mp4 [SAIDA.mp4] [--max-mb 9.5]
- vídeo vertical (Shorts)  -> final_app/final_vertical.mp4   (15 s)
- vídeo horizontal (longo) -> final_app/final_horizontal.mp4 (14 s)
- sem SAIDA: grava ao lado, com sufixo _comfinal.mp4
- --max-mb: reencoda pra caber nesse tamanho (o file_upload do Claude in Chrome aceita < 10 MB)
"""
import os, subprocess, sys
FF = r"C:\Users\SEMED CMEI Argentina\AppData\Local\ffmpeg\ffmpeg-8.1.2-essentials_build\bin\ffmpeg.exe"
FP = FF.replace("ffmpeg.exe", "ffprobe.exe")
AQUI = os.path.dirname(os.path.abspath(__file__))
def probe(p, entries, sel="v:0"):
    return subprocess.check_output([FP, "-v", "error", "-select_streams", sel, "-show_entries", entries, "-of", "csv=p=0", p]).decode().strip()
args = [a for a in sys.argv[1:] if not a.startswith("--")]
maxmb = None
if "--max-mb" in sys.argv: maxmb = float(sys.argv[sys.argv.index("--max-mb")+1]); args = [a for a in args if a != str(sys.argv[sys.argv.index("--max-mb")+1])]
ent = args[0]
saida = args[1] if len(args) > 1 else os.path.splitext(ent)[0] + "_comfinal.mp4"
w, h = [int(x) for x in probe(ent, "stream=width,height").replace(",", " ").split()]
vert = h > w
final = os.path.join(AQUI, "final_app", "final_vertical.mp4" if vert else "final_horizontal.mp4")
W, H = (1080, 1920) if vert else (1920, 1080)
dur_ent = float(subprocess.check_output([FP, "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", ent]).decode().strip())
dur_fin = float(subprocess.check_output([FP, "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", final]).decode().strip())
v = f"fps=30,scale={W}:{H}:force_original_aspect_ratio=decrease,pad={W}:{H}:(ow-iw)/2:(oh-ih)/2,setsar=1,format=yuv420p"
a = "aformat=sample_rates=48000:channel_layouts=stereo"
fc = f"[0:v]{v}[v0];[0:a]{a}[a0];[1:v]{v}[v1];[1:a]{a}[a1];[v0][a0][v1][a1]concat=n=2:v=1:a=1[v][a]"
if maxmb:
    kbps = int((maxmb*8*1024*1024*0.96/(dur_ent+dur_fin) - 128000)/1000)
    venc = ["-b:v", f"{kbps}k", "-maxrate", f"{int(kbps*1.3)}k", "-bufsize", f"{kbps*2}k"]
else:
    venc = ["-crf", "20"]
cmd = [FF, "-y", "-loglevel", "error", "-i", ent, "-i", final, "-filter_complex", fc, "-map", "[v]", "-map", "[a]",
       "-c:v", "libx264", "-preset", "medium", *venc, "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", saida]
subprocess.run(cmd, check=True)
print(saida, f"{os.path.getsize(saida)/1024/1024:.1f} MB", "vertical" if vert else "horizontal")
