#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

MAX_ATTEMPTS=3
attempt=1
until mcp sync; do
  if [[ $attempt -ge $MAX_ATTEMPTS ]]; then
    echo "[ERROR] MCP sync failed after $attempt attempts"; exit 1;
  fi
  sleep $((2*attempt)); ((attempt++))
  mcp reset --hard || true
  mcp pull || true
  echo "[INFO] Retrying MCP sync ($attempt/$MAX_ATTEMPTS)..."
done
mcp status | grep -q "clean" || { echo "[ERROR] Dirty repo"; exit 1; }

npx playwright test --serial
