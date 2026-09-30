# Renderiza, um de cada vez, os shorts que ainda não têm vídeo em out/ e grava o andamento em out/andamento.txt.
# Uso: powershell -File renderizar_todos.ps1
$env:Path = "$env:LOCALAPPDATA\nodejs\node-v24.21.0-win-x64;$env:Path"
Set-Location $PSScriptRoot
$ordem = @("Trovao","Gelo","Astronautas","ArcoIris","Lua","MicroOndas","MetalGelado","Aviao","PanelaPressao","SomEspaco","Estrelas","Colher","Inercia","MarSalgado")
$n = 2
foreach ($id in $ordem) {
  $saida = "out\Fisica${n}_$id.mp4"
  if (-not (Test-Path $saida)) {
    Add-Content out\andamento.txt "$(Get-Date -Format 'dd/MM HH:mm') começando $id"
    npx.cmd remotion render src/index.ts $id $saida --log=error --concurrency=3 2>&1 | Out-File -Append -Encoding utf8 out\erros.txt
    Add-Content out\andamento.txt "$(Get-Date -Format 'dd/MM HH:mm') pronto $id ($LASTEXITCODE)"
  }
  $n++
}
Add-Content out\andamento.txt "$(Get-Date -Format 'dd/MM HH:mm') TODOS PRONTOS"
