for i in FioCaido CarroEnchente; do npx remotion render src/index.ts $i previa/p_$i.gif --codec=gif --scale=0.25 --every-nth-frame=45 --concurrency=2 2>&1 | grep -iE "error|rendered" | tail -2
ffmpeg -v error -y -i previa/p_$i.gif -vf "scale=200:-2,tile=10x5" -frames:v 1 previa/p_$i.jpg; done
