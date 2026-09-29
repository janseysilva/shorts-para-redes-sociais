import sys,os,json
from playwright.sync_api import sync_playwright
html,out,planf=sys.argv[1:4]
P=json.load(open(planf)); plan=P['plan']; total=P['total']
def amap(v):
    for p in plan:
        if v < p['v0']+p['dur']:
            return p['a']+min(max(v-p['v0'],0),p['b']-p['a']-0.01)
    return plan[-1]['b']-0.01
os.makedirs(out,exist_ok=True)
with sync_playwright() as pw:
    b=pw.chromium.launch(); pg=b.new_page(viewport={'width':1080,'height':1920})
    pg.goto('file://'+os.path.abspath(html))
    n=int(total*30)
    for i in range(n):
        pg.evaluate(f'render({amap(i/30)})')
        pg.screenshot(path=f'{out}/f{i:05d}.jpg',type='jpeg',quality=90)
    b.close()
