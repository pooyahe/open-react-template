$ErrorActionPreference = "Stop"

Write-Host "== Digitalization website AI workflow setup ==" -ForegroundColor Cyan

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    throw "Git is required. Install Git and reopen PowerShell."
}

if (-not (Test-Path ".git")) {
    throw "Run this script from the existing template repository root."
}

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    throw "Node.js is required."
}

Write-Host "`nInstalling GSD Core. Choose Codex and project/local scope in the installer." -ForegroundColor Yellow
npx --yes @opengsd/gsd-core@latest
if ($LASTEXITCODE -ne 0) {
    throw "GSD installer failed."
}

if (Get-Command uv -ErrorAction SilentlyContinue) {
    uv tool install graphifyy --force
} elseif (Get-Command pipx -ErrorAction SilentlyContinue) {
    pipx install graphifyy --force
} else {
    throw "Install uv (recommended) or pipx, then rerun. On Windows: winget install astral-sh.uv"
}

if (-not (Get-Command graphify -ErrorAction SilentlyContinue)) {
    Write-Host "Graphify is installed but not yet on PATH. Run 'uv tool update-shell', reopen PowerShell, return to this repository, and rerun this script." -ForegroundColor Yellow
    exit 1
}

graphify install --project --platform codex
graphify hook install

Write-Host "`nSetup complete. Start a new Codex session and run /graphify . --no-viz inside Codex." -ForegroundColor Green
Write-Host "Then open START_CODEX.md for the first audit prompt." -ForegroundColor Green
