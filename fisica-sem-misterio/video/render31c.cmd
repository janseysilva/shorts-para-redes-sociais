@echo off
cd /d "%~dp0"
call npx remotion render src/index.ts FioCaidoReal out/Fisica94_FioCaido_real.mp4 --concurrency=2 > out/render31c.log 2>&1
