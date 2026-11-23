@echo off
cd /d "%~dp0"
call npx remotion render src/index.ts FogoNaoApaga out/Fisica92_FogoNaoApaga.mp4 --concurrency=2 >> outender30.log 2>&1
call npx remotion render src/index.ts LagoPedra out/Fisica93_LagoPedra.mp4 --concurrency=2 >> outender30.log 2>&1
call npx remotion render src/index.ts TerrasRaras out/Longo19_TerrasRaras.mp4 --concurrency=2 >> outender30.log 2>&1
