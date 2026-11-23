import subprocess,os
from concurrent.futures import ThreadPoolExecutor
from PIL import Image,ImageDraw
FF=os.path.join(os.environ['LOCALAPPDATA'],'ffmpeg/ffmpeg-8.1.2-essentials_build/bin/ffmpeg.exe')
R={
'0globo':'854518-hd_1920_1080_30fps 2062566-hd_1920_1080_24fps 3129785-hd_1920_1080_25fps 4696463-hd_1920_1080_30fps 6909829-hd_1920_1080_25fps',
'1celular':'852308-hd_1920_1080_24fps 3044130-hd_1920_1080_24fps 4232958-hd_1920_1080_24fps 6278830-hd_1920_1080_30fps 6587542-hd_1920_1080_25fps',
'5atomo':'29238626/12617976_1920_1080_25fps 29689646/12768596_1920_1080_30fps 31554971/13447985_1920_1080_30fps 32466901/13846225_1920_1080_30fps 34499231/14617824_1920_1080_30fps',
'7carro':'4817952-hd_1920_1080_30fps 4817955-hd_1920_1080_30fps 4818143-hd_1920_1080_30fps 4818165-hd_1920_1080_30fps 4818168-hd_1920_1080_30fps',
'8vento':'855181-hd_1920_1080_25fps 8741102-hd_1920_1080_30fps 19202853-hd_1920_1080_50fps 19455221-hd_1920_1080_25fps 28652427/12443207_1920_1080_60fps',
'13lab':'3735729-hd_1920_1080_25fps 3735772-hd_1920_1080_25fps 4715926-hd_1920_1080_25fps 4715928-hd_1920_1080_25fps 4715932-hd_1920_1080_25fps',
'14mina':'9310142-hd_1920_1080_30fps 9310157-hd_1920_1080_30fps 27676660/12201727_1920_1080_25fps 30911527/13223355_1920_1080_30fps 35357100/14980545_1920_1080_30fps',
'18navio':'6618332-hd_1920_1080_24fps 10472326-hd_1920_1080_25fps 16922514-hd_1920_1080_60fps 19073572-hd_1920_1080_30fps 26796991/12008795_1920_1080_30fps',
'19fabrica':'4468754-hd_1920_1080_24fps 6450803-hd_1920_1080_25fps 8084494-hd_1920_1080_25fps 8084620-hd_1920_1080_25fps 8084758-hd_1920_1080_25fps',
'21brasil':'8809861-hd_1920_1080_24fps 11179235-hd_1920_1080_30fps 11469073-hd_1920_1080_30fps 16821161-hd_1920_1080_30fps 20416435-hd_1920_1080_30fps',
'23brasilia':'5539902-hd_1920_1080_30fps 10053332-hd_1920_1080_24fps 10136771-hd_1920_1080_24fps 19141615-hd_1920_1080_24fps 27100038/12071919_1920_1080_30fps',
'22mina':'6618334-hd_1920_1080_24fps 7779603-hd_1920_1080_30fps 8382429-hd_1920_1080_30fps 8382436-hd_1920_1080_30fps 28529394/12409786_1920_1080_25fps',
'24ima':'3147272-hd_1920_1080_25fps 3184621-hd_1920_1080_25fps 3770189-hd_1920_1080_24fps 4201553-hd_1920_1080_30fps 5242417-hd_1920_1080_25fps',
'P gas':'6216463-hd_1080_1920_24fps 6216467-hd_1080_1920_24fps 6247893-hd_1080_1920_24fps 6263477-hd_1080_1920_25fps 7008574-hd_1080_1920_25fps',
'P crosta':'13408286-hd_1080_1920_30fps 13408287-hd_1080_1920_30fps 13408288-hd_1080_1920_30fps 16582413-hd_1080_1920_30fps 17087127-hd_1080_1920_30fps',
'P sal':'16582411-hd_1080_1920_30fps 18045523-hd_1080_1920_30fps 26560250/11959620_1080_1920_30fps 27047787/12056358_1080_1920_30fps 27759080/12219304_1080_1920_30fps'}
def url(x):
    i,f=(x.split('/') if '/' in x else (x.split('-')[0],x)); return f'https://videos.pexels.com/video-files/{i}/{f}.mp4',i
def g(a):
    u,i=url(a); o=f'previa/t30_{i}.jpg'
    if not os.path.exists(o):
        try: subprocess.run([FF,'-v','error','-y','-user_agent','Mozilla/5.0','-ss','2','-i',u,'-frames:v','1','-vf','scale=-2:130',o],timeout=90)
        except Exception as e: print(i,e)
with ThreadPoolExecutor(4) as ex: list(ex.map(g,[a for v in R.values() for a in v.split()]))
f=Image.new('RGB',(1400,150*len(R)));d=ImageDraw.Draw(f)
for r,(k,v) in enumerate(R.items()):
    d.text((2,r*150+60),k,fill='yellow')
    for c,a in enumerate(v.split()):
        i=url(a)[1];p=f'previa/t30_{i}.jpg'
        if os.path.exists(p): f.paste(Image.open(p).crop((0,0,255,130)),(90+c*260,r*150))
        d.text((90+c*260,r*150+132),i,fill='white')
f.crop((0,0,1400,1200)).save('previa/t30_A.jpg');f.crop((0,1200,1400,2400)).save('previa/t30_B.jpg')
