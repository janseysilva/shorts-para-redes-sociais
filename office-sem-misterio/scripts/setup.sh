#!/usr/bin/env bash
# Instala o que é preciso para gerar os vídeos (Python 3, ffmpeg e Chromium do Playwright).
set -e
pip install sherpa-onnx soundfile numpy playwright openpyxl
python -m playwright install chromium
mkdir -p tts && cd tts
curl -L https://github.com/k2-fsa/sherpa-onnx/releases/download/tts-models/vits-piper-pt_BR-faber-medium.tar.bz2 | tar xj
