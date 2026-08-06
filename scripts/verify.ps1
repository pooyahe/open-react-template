$ErrorActionPreference = "Stop"

$Pnpm = @("corepack", "pnpm@10.15.1")
$ExpectedScripts = @("lint", "typecheck", "test", "test:e2e", "build")

$package = Get-Content "package.json" -Raw | ConvertFrom-Json

foreach ($script in $ExpectedScripts) {
    if (-not $package.scripts.PSObject.Properties.Name.Contains($script)) {
        throw "Missing package.json script: $script"
    }

    Write-Host "`n> corepack pnpm@10.15.1 $script" -ForegroundColor Cyan
    & $Pnpm[0] $Pnpm[1] $script
    if ($LASTEXITCODE -ne 0) {
        throw "Quality gate failed: $script"
    }
}

Write-Host "`nAll automated quality gates passed." -ForegroundColor Green
