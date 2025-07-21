#!/bin/bash
set -e
cd "$(dirname "$0")/.."
echo "[SCRIPT] Starting quick-setup for Saucedemo_POM_Automation.."

echo "[SCRIPT] npm install.."
npm install

echo "[SCRIPT] Install Playwright browsers.."
npx playwright install

echo "[SCRIPT] Run parallel tests (2 workers).."
npx playwright test --workers=2

echo "[SCRIPT] Move test artifacts (screenshots, reports).."
mkdir -p artifacts
cp -r screenshots/* artifacts/ 2>/dev/null || true
cp -r playwright-report artifacts/ 2>/dev/null || true
cp -r videos artifacts/ 2>/dev/null || true

echo "[SCRIPT] Stage, commit, and push test artifacts and report.."
git add .
git commit -m "Run quick-setup: tests, screenshots, artifacts, report"
git push || true

echo "[SCRIPT] Opening HTML report..."
npx playwright show-report

echo "[SCRIPT] Complete: quick-setup finished. Artifacts should be committed and HTML report opened."
