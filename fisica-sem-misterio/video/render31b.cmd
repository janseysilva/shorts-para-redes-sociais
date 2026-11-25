@echo off
cd /d "%~dp0"
call npx remotion render src/index.ts CarroEnchenteReal out/Fisica95_CarroEnchente_real.mp4 --concurrency=2 > out/render31b.log 2>&1
