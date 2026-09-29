import sys,os
from playwright.sync_api import sync_playwright
html,out,times=sys.argv[1],sys.argv[2],sys.argv[3]
os.makedirs(out,exist_ok=True)
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1080,'height':1920})
    pg.goto('file://'+os.path.abspath(html))
    if times=='all':
        ts=[i/30 for i in range(int(38*30))]
    else: ts=[float(x) for x in times.split(',')]
    for i,t in enumerate(ts):
        pg.evaluate(f'render({t})')
        pg.screenshot(path=f'{out}/f{i:05d}.jpg',type='jpeg',quality=90)
    b.close()
