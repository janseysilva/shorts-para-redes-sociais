import json,sys,numpy as np,soundfile as sf,sherpa_onnx
scenes=json.load(open(sys.argv[1])); pref=sys.argv[2]
d="tts/vits-piper-pt_BR-faber-medium"
tts=sherpa_onnx.OfflineTts(sherpa_onnx.OfflineTtsConfig(model=sherpa_onnx.OfflineTtsModelConfig(vits=sherpa_onnx.OfflineTtsVitsModelConfig(model=f"{d}/pt_BR-faber-medium.onnx",tokens=f"{d}/tokens.txt",data_dir=f"{d}/espeak-ng-data"),num_threads=4)))
clips=[];plan=[];v=0;sr=None
for a,b,txt in scenes:
    g=tts.generate(txt,sid=0,speed=1.1); s=np.array(g.samples,dtype=np.float32); sr=g.sample_rate
    dur=max(b-a,len(s)/sr+0.35); plan.append(dict(a=a,b=b,v0=v,dur=dur)); clips.append((v+0.1,s)); v+=dur
total=v+0.3; au=np.zeros(int(total*sr)+sr,dtype=np.float32)
for st,s in clips: i=int(st*sr); au[i:i+len(s)]+=s
au=au/max(1e-6,np.abs(au).max())*0.9
sf.write(pref+".wav",au[:int(total*sr)],sr); json.dump(dict(plan=plan,total=total),open(pref+".json","w"))
print(pref,round(total,1),[round(p['dur'],1) for p in plan])
