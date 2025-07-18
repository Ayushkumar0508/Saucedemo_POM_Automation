#!/bin/bash
cd "$(dirname "$0")/.."
echo "[quick-setup] Running npm install and browser install..."
npm install && npx playwright install
if [ $? -ne 0 ]; then
  echo "[quick-setup] ERROR: Dependency install failed"; exit 1;
fi
# clean old
node -e "require('./utils/TestUtils').cleanArtifacts()"
echo "[quick-setup] Running tests (parallel, 2 workers)..."
npx playwright test --workers=2
if [ $? -ne 0 ]; then
  echo "[quick-setup] WARNING: Some tests failed (videos on failure will be committed)";
fi
npx playwright show-report &
git add .
git commit -m "quick-setup: install, test, and push artifacts/results"
git push
echo "[quick-setup] DONE. Artifacts/results pushed."
