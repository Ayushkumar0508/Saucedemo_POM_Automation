#!/bin/bash
set -e
cd "$(dirname \"$0\")/.."
echo "[SCRIPT] Running Playwright tests sequentially (1 worker) for debugging..."
npm install || echo "Already installed."
npx playwright install || echo "Browsers already installed."
npx playwright test --workers=1
mkdir -p artifacts
cp -r screenshots/* artifacts/ 2>/dev/null || true
cp -r playwright-report artifacts/ 2>/dev/null || true
cp -r videos artifacts/ 2>/dev/null || true

git add .
git commit -m "Run tests sequentially: artifacts, screenshots, report"
git push || true

echo "[SCRIPT] Opening report.."
npx playwright show-report
