# Atualiza este repositorio com o conteudo atual das duas pastas de trabalho e envia ao GitHub.
$doc = Split-Path $PSScriptRoot
$pares = @(@("excel-sem-misterio", "office-sem-misterio"), @("dicas-celular", "truques-de-celular"), @("fisica-sem-misterio", "fisica-sem-misterio"))
git -C $PSScriptRoot read-tree --empty
foreach ($p in $pares) {
  $src = Join-Path $doc $p[0]
  git -C $src add -A
  git -C $src commit -q -m "Atualizacao" 2>$null
  git -C $PSScriptRoot fetch -q $src main
  git -C $PSScriptRoot read-tree --prefix="$($p[1])/" FETCH_HEAD
}
git -C $PSScriptRoot add README.md atualizar.ps1
git -C $PSScriptRoot checkout-index -a -f
git -C $PSScriptRoot commit -m "Atualizacao dos shorts"
git -C $PSScriptRoot push
