import subprocess,os
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
D=Path(__file__).resolve().parent;R=D.parent;FF=Path(os.environ["LOCALAPPDATA"])/"ffmpeg/ffmpeg-8.1.2-essentials_build/bin/ffmpeg.exe"
F="C:/Windows/Fonts/seguibl.ttf"
def faz(i,arq,seg,linhas,cor):
    q=D/f"_q_{i}.png";subprocess.run([FF,"-v","error","-y","-ss",str(seg),"-i",R/"out"/arq,"-frames:v","1",q],check=True)
    im=Image.open(q).convert("RGB");q.unlink();d=ImageDraw.Draw(im)
    d.rectangle((0,0,1080,590),fill=cor);d.rectangle((0,1490,1080,1920),fill=cor)
    for k,(s,t,c) in enumerate(linhas): d.text((540,130+k*165),s,font=ImageFont.truetype(F,t),fill=c,anchor="mm",stroke_width=10,stroke_fill="black")
    im.save(D/"shorts"/f"capa_{i}.jpg",quality=92)
A="#FFD400";B="white"
faz("FioCaido","Fisica94_FioCaido.mp4",25,[("O PASSO",150,B),("que dá CHOQUE",118,A),("sem tocar no fio",92,B)],"#10233a")
faz("CarroEnchente","Fisica95_CarroEnchente.mp4",25.0,[("Quanta ÁGUA",130,B),("leva um CARRO?",122,A)],"#10233a")
