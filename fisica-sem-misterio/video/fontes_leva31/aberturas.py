"""Testes de abertura (26/11): 3 começos de 5 s para o FioCaido, sobre o clipe fio1 (raios atrás das pernas)."""
import asyncio, os, subprocess
from pathlib import Path
import edge_tts
from PIL import Image, ImageDraw, ImageFont
R = Path(__file__).resolve().parents[1]; O = R / "previa" / "aberturas"; O.mkdir(parents=True, exist_ok=True)
FF = str(Path(os.environ["LOCALAPPDATA"]) / "ffmpeg/ffmpeg-8.1.2-essentials_build/bin/ffmpeg.exe")
F = "C:/Windows/Fonts/seguibl.ttf"
OP = {
 "A": ("Esse chão está dando choque. E o fio nem encostou em você.", [("ESSE CHÃO", "white", 150), ("DÁ CHOQUE", "#FFD400", 150)], 2.2),
 "B": ("Quem corre daqui leva choque. Quem anda devagar, não. Por quê?", [("CORRER", "white", 150), ("DÁ CHOQUE?", "#FFD400", 140)], 2.2),
 "C": ("Você está a três metros desse fio. Qual é o seu próximo passo?", [("3 METROS", "#FFD400", 170), ("e agora?", "white", 120)], 2.2),
}
async def voz(t, p):
    await edge_tts.Communicate(t, "pt-BR-AntonioNeural", rate="+8%").save(str(p))
for k, (fala, linhas, de) in OP.items():
    asyncio.run(voz(fala, O / f"{k}.mp3"))
    im = Image.new("RGBA", (1080, 1920), (0, 0, 0, 0)); d = ImageDraw.Draw(im); y = 300
    for s, c, t in linhas:
        d.text((540, y), s, font=ImageFont.truetype(F, t), fill=c, anchor="mm", stroke_width=13, stroke_fill="black"); y += t + 30
    im.save(O / f"{k}.png")
    subprocess.run([FF, "-v", "error", "-y", "-ss", str(de), "-i", str(R / "public/ia31/fio1.mp4"), "-i", str(O / f"{k}.png"), "-i", str(O / f"{k}.mp3"),
                    "-filter_complex", "[0:v]scale=1080:1920,setsar=1[v];[v][1:v]overlay[o]", "-map", "[o]", "-map", "2:a", "-t", "5.6",
                    "-c:v", "libx264", "-crf", "23", "-pix_fmt", "yuv420p", "-c:a", "aac", "-shortest", str(O / f"Abertura_{k}.mp4")], check=True)
    print(k, "ok")
