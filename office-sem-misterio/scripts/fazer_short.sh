#!/usr/bin/env bash
# Uso: scripts/fazer_short.sh <arquivo_animacao_pronto.html> <cenas.json> <saida.mp4>
set -e
HTML=$1; CENAS=$2; OUT=$3; TMP=$(mktemp -d)
python scripts/gen.py "$CENAS" "$TMP/n"
python scripts/rend2.py "$HTML" "$TMP/fr" "$TMP/n.json"
ffmpeg -v error -y -framerate 30 -i "$TMP/fr/f%05d.jpg" -i "$TMP/n.wav" -c:v libx264 -crf 18 -pix_fmt yuv420p \
  -c:a aac -b:a 160k -af "loudnorm=I=-16:TP=-1.5" -shortest -movflags +faststart "$OUT"
rm -rf "$TMP"; echo "Pronto: $OUT"
