from PIL import Image, ImageDraw, ImageFont
import glob, os
f=ImageFont.truetype('arialbd.ttf',14)
for pasta,step,w,cols in [('q1912',6,240,10),('qice',6,320,8)]:
    fs=sorted(glob.glob(pasta+'/*.jpg')); h=Image.open(fs[0]).height
    sh=Image.new('RGB',(cols*w,-(-len(fs)//cols)*(h+18)),'white'); d=ImageDraw.Draw(sh)
    for k,p in enumerate(fs):
        x,y=(k%cols)*w,(k//cols)*(h+18); sh.paste(Image.open(p),(x,y)); d.text((x+3,y+h+1),f'{k*step}s',fill='black',font=f)
    sh.save(f'folha_{pasta}.jpg',quality=80)
fs=sorted(glob.glob('../public/fotos/Tt_*.jpg')); cols=6; w,h=300,200
sh=Image.new('RGB',(cols*w,-(-len(fs)//cols)*(h+18)),'white'); d=ImageDraw.Draw(sh)
for k,p in enumerate(fs):
    im=Image.open(p).convert('RGB'); im.thumbnail((w,h)); x,y=(k%cols)*w,(k//cols)*(h+18); sh.paste(im,(x,y)); d.text((x+3,y+h+1),os.path.basename(p),fill='black',font=f)
sh.save('folha_fotos.jpg',quality=80)
