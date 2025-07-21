#!/bin/bash
set -e
cd "$(dirname \"$0\")/.."
echo "[SCRIPT] Running parallel Playwright tests (2 workers)..."
npm install || echo "Already installed."
npx playwright install || echo "Browsers already installed."
npx playwright test --workers=2
mkdir -p artifacts
cp -r screenshots/* artifacts/ 2>/dev/null || true
cp -r playwright-report artifacts/ 2>/dev/null || true
cp -r videos artifacts/ 2>/dev/null || true

git add .
git commit -m "Run tests in parallel: artifacts, screenshots, report"
git push || true

echo "[SCRIPT] Opening report.."
npx playwright show-report
