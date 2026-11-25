cd "/c/Users/SEMED CMEI Argentina/Documents/fisica-sem-misterio/video"
export PYTHONUTF8=1 PATH="$PATH:$LOCALAPPDATA/ffmpeg/ffmpeg-8.1.2-essentials_build/bin"
cd public/ia31
[ -f novo1.mp4 ] && mv novo1.mp4 roda1.mp4 && mv novo2.mp4 motorista1.mp4
for k in im1:chave im2:buraco im3:caminhonete nv0:janela nv1:perfil; do cp ../../fontes_leva31/flow/${k%%:*}.jpg ${k##*:}.jpg; done
ffmpeg -nostdin -v error -y -i motorista1.mp4 -vf reverse -an -c:v libx264 -crf 16 -pix_fmt yuv420p re.mp4
ffmpeg -nostdin -i roda1.mp4 -af volumedetect -vn -f null - 2>&1 | grep -E "mean_vol|max_vol"
ffmpeg -nostdin -v error -y -i roda1.mp4 -ss 3.2 -vn -ac 2 -ar 48000 a.wav
ffmpeg -nostdin -v error -y -i a.wav -i a.wav -i a.wav -filter_complex "[0][1]acrossfade=d=1[x];[x][2]acrossfade=d=1" ../sons/chuva31.wav
rm a.wav; ffprobe -v error -show_entries format=duration -of csv=p=0 ../sons/chuva31.wav
cd ../..
sed -i -E 's/^const (Pilula|Chuva|Xis|Svg|Rotulo|VERM|ip|suave|quando)\b/export const \1/' src/Perigo.tsx
grep -q CarroEnchenteReal src/Root.tsx || python fontes_leva31/registrar.py
npx tsc --noEmit -p . 2>&1 | grep -E "Perigo|Root"
npx remotion render src/index.ts CarroEnchenteReal previa/r.gif --codec=gif --scale=0.25 --every-nth-frame=45 --concurrency=2 2>&1 | grep -iE "error|Rendered 3[45]"
ffmpeg -nostdin -v error -y -i previa/r.gif -vf "scale=200:-2,tile=9x4" -frames:v 1 previa/r.jpg
