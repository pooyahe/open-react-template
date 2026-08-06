#!/usr/bin/env bash
set -euo pipefail

echo "== Digitalization website AI workflow setup =="

command -v git >/dev/null 2>&1 || { echo "Git is required." >&2; exit 1; }
command -v node >/dev/null 2>&1 || { echo "Node.js is required for GSD Core." >&2; exit 1; }

if [ ! -d .git ]; then
  git init
fi

echo "Installing GSD Core. Choose Codex and project/local scope in the installer."
npx @opengsd/gsd-core@latest

if command -v uv >/dev/null 2>&1; then
  uv tool install graphifyy
elif command -v pipx >/dev/null 2>&1; then
  pipx install graphifyy
else
  echo "Install uv (recommended) or pipx, then rerun this script." >&2
  exit 1
fi

command -v graphify >/dev/null 2>&1 || {
  echo "Graphify is not yet on PATH. Run 'uv tool update-shell' or 'pipx ensurepath', reopen the shell, and rerun." >&2
  exit 1
}

graphify install --project --platform codex
graphify hook install
graphify . --no-viz

echo "Setup complete. Open START_CODEX.md."
