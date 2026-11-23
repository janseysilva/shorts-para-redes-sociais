import json,subprocess,sys,time,os
d=json.load(open('fontes_leva30/fotos.json',encoding='utf-8'))
cred=json.load(open('public/fotos/creditos.json',encoding='utf-8'))
for k,a in d.items():
    if os.path.exists(f'public/fotos/{k}.jpg') and cred.get(k,{}).get('arquivo')==a: continue
    json.dump({k:a},open('fontes_leva30/_um.json','w',encoding='utf-8'),ensure_ascii=False)
    for n in range(3):
        r=subprocess.run([sys.executable,'baixar_fotos.py','fontes_leva30/_um.json'],capture_output=True,text=True,encoding='utf-8')
        if r.returncode==0: print(r.stdout.strip(),flush=True); break
        time.sleep(12)
    else: print('FALHOU',k,r.stderr[-120:],flush=True)
    time.sleep(12)
