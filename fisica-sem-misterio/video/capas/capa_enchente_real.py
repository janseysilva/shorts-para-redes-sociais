import subprocess, os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
D = Path(__file__).resolve().parent; R = D.parent
FF = Path(os.environ["LOCALAPPDATA"]) / "ffmpeg/ffmpeg-8.1.2-essentials_build/bin/ffmpeg.exe"
q = D / "_q.png"
subprocess.run([FF, "-v", "error", "-y", "-ss", "6.2", "-i", R / "public/ia31/carro1.mp4", "-frames:v", "1", "-vf", "scale=1080:1920:flags=lanczos", q], check=True)
im = Image.open(q).convert("RGB"); q.unlink()
g = Image.new("L", (1, 1920)); [g.putpixel((0, y), int(max(0, 190 * (1 - y / 900)))) for y in range(1920)]
im = Image.composite(Image.new("RGB", im.size, "black"), im, g.resize(im.size)); d = ImageDraw.Draw(im)
for k, (s, t, c) in enumerate([("Quanta ÁGUA", 138, "white"), ("leva um CARRO?", 122, "#FFD400")]):
    d.text((540, 470 + k * 165), s, font=ImageFont.truetype("C:/Windows/Fonts/seguibl.ttf", t), fill=c, anchor="mm", stroke_width=11, stroke_fill="black")
im.save(D / "shorts/capa_CarroEnchente.jpg", quality=92)
