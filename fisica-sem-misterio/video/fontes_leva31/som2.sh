cd "/c/Users/SEMED CMEI Argentina/Documents/fisica-sem-misterio/video"
export PATH="$PATH:$LOCALAPPDATA/ffmpeg/ffmpeg-8.1.2-essentials_build/bin"
ffmpeg -nostdin -v error -y -ss 4 -i public/ia31/carro1.mp4 -vn -ac 2 -ar 48000 -af "lowpass=f=450,lowpass=f=450,acompressor=threshold=-30dB:ratio=6:attack=5:release=200" a.wav
ffmpeg -nostdin -v error -y -i a.wav -i a.wav -i a.wav -i a.wav -filter_complex "[0][1]acrossfade=d=1[x];[x][2]acrossfade=d=1[y];[y][3]acrossfade=d=1,loudnorm=I=-24:TP=-3" -ar 48000 public/sons/correnteza31.wav
rm a.wav; ffprobe -v error -show_entries format=duration -of csv=p=0 public/sons/correnteza31.wav
sed -i 's|sons/chuva31.wav")} volume={0.45}|sons/correnteza31.wav")} volume={0.22}|; s|\[0.07, 0.07, 0\]|[0.086, 0.086, 0]|; s|{chuva && <Svg>.*</Svg>}||' src/PerigoReal.tsx
sed -i 's|, Chuva, Svg|, Svg|; s|chuva = true, ||; s|chuva?: boolean; ||; s| chuva={false}||g' src/PerigoReal.tsx
grep -n "chuva\|Chuva\|correnteza" src/PerigoReal.tsx; npx tsc --noEmit -p . 2>&1 | grep Perigo
