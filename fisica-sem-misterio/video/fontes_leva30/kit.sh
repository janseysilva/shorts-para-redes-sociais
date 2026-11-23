cd "/c/Users/SEMED CMEI Argentina/Documents/fisica-sem-misterio/video"
export PATH="$PATH:$LOCALAPPDATA/ffmpeg/ffmpeg-8.1.2-essentials_build/bin" PYTHONIOENCODING=utf-8 PYTHONUTF8=1
T="/c/Users/SEMED CMEI Argentina/Desktop/trabalhos jansey"; S="$T/_upload_shorts"; L="$T/_upload_longo"
for x in Fisica92_FogoNaoApaga Fisica93_LagoPedra; do id=${x#*_}
 ffmpeg -v error -y -i out/$x.mp4 -c:v libx264 -b:v 1200k -preset medium -pass 1 -passlogfile out/_p -an -f null NUL
 ffmpeg -v error -y -i out/$x.mp4 -c:v libx264 -b:v 1200k -preset medium -pass 2 -passlogfile out/_p -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart "$S/$x.mp4"
 cp capas/shorts/capa_$id.jpg out/descricao_$id.txt out/legenda_redes_$id.txt "$S/"
done
rm -f out/_p-0.log*
python adicionar_final_app.py out/Longo19_TerrasRaras.mp4
cp out/Longo19_TerrasRaras_comfinal.mp4 capas/capa_TerrasRaras_[ABC].jpg out/descricao_TerrasRaras.txt "$L/"
# copia leve so para o Jansey assistir
ffmpeg -v error -y -i out/Longo19_TerrasRaras_comfinal.mp4 -vf scale=1280:-2 -c:v libx264 -crf 28 -preset medium -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart previa/Previa_TerrasRaras.mp4
ffmpeg -v error -y -sseof -4 -i out/Fisica93_LagoPedra.mp4 -frames:v 1 -vf scale=300:-2 previa/lagofim.jpg
ffmpeg -v error -y -sseof -8 -i out/Longo19_TerrasRaras_comfinal.mp4 -frames:v 1 -vf scale=530:-2 previa/trfim.jpg
ls -la "$S"/Fisica9[23]* "$L" previa/Previa_TerrasRaras.mp4; ffprobe -v error -show_entries format=duration -of csv=p=0 out/Longo19_TerrasRaras_comfinal.mp4
