@echo off
cd /d "%~dp0"
call npx remotion render src/index.ts FioCaido out/Fisica94_FioCaido.mp4 --concurrency=2 > out/render31.log 2>&1
call npx remotion render src/index.ts CarroEnchente out/Fisica95_CarroEnchente.mp4 --concurrency=2 >> out/render31.log 2>&1
