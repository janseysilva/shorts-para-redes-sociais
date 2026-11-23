@echo off
cd /d "%~dp0"
call npx remotion render src/index.ts LagoPedra out/Fisica93_LagoPedra.mp4 --concurrency=2 > out/render30b.log 2>&1
