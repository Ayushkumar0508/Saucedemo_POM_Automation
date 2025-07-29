# Saucedemo POM Automation Framework

This repository provides a production-ready Playwright-based Page Object Model (POM) framework for end-to-end automation of https://www.saucedemo.com.

## Features
- Playwright MCP, GitHub MCP integration (deterministic, CI/CD ready)
- Robust Page Object Model for maintainability
- Cross-browser (Chromium & Firefox) support
- Artifact persistence: reproducible screenshots/videos
- MCP-safe validated shell scripts for every project operation
- Immediate green run after checkout (`npm run setup && npm run test:parallel` passes)

## Project Structure
```
Saucedemo_POM_Automation/
├── .github/workflows/ci.yml           # CI: Run tests, persist artifacts
├── config/env.config.js               # Env config (base URLs, timeouts)
├── data/TestData.js                   # Valid/invalid users, products
├── fixtures/userCredentials.json      # Test credentials fixture
├── pages/                             # Page Object Model classes
│   ├── BasePage.js
│   ├── LoginPage.js
│   ├── ProductListingPage.js
│   └── CheckoutPage.js
├── reports/index.html                 # Stub; Playwright HTML reports via CI
├── scripts/                           # Robust project scripts (see below)
│   ├── quick-setup.sh
│   ├── run-parallel.sh
│   ├── run-sequential.sh
│   └── validate-setup.sh
├── tests/                             # E2E tests (deterministic, CI clean)
│   ├── login.test.js
│   └── product-listing-checkout.test.js
├── utils/TestUtils.js                 # Utility helpers for test flow
├── .eslintrc.js                       # Linting config
├── .gitignore
├── package.json
├── playwright.config.js
└── README.md
```

## Setup & Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ayushkumar0508/Saucedemo_POM_Automation.git
   cd Saucedemo_POM_Automation
   ```
2. **Initial installation & Playwright browsers:**
   ```bash
   npm run setup
   ```

## Running Tests
- **Deterministic Parallel Run:**
  ```bash
  npm run test:parallel
  # or
  ./scripts/run-parallel.sh
  ```
- **Sequential Run:**
  ```bash
  npm run test:sequence
  # or
  ./scripts/run-sequential.sh
  ```
- **Quick setup for CI/local:**
  ```bash
  ./scripts/quick-setup.sh
  ```
- **Validate setup & repo cleanliness:**
  ```bash
  ./scripts/validate-setup.sh
  ```

## CI/CD & Artifacts
- All test runs (manual or CI) save deterministic screenshots and video artifacts using fixed names for reproducibility.
- The [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) workflow installs dependencies, runs all tests in parallel, and uploads Playwright HTML reports + artifacts (videos/screenshots).

## Troubleshooting
- If MCP reports a dirty repo or sync issues, scripts will retry with backoff. See script output.
- For Playwright dependency or browser install issues, rerun `npm run setup`.
- All Playwright, npm, and MCP operations must report a clean repo for reliable CI/CD.

## Contribution Guidelines
- All page objects/logs must follow the POM conventions (`Intent`, `Action`, `Observed result` in logs)
- Commit via MCP only; never push by hand
- New scripts must detect & recover from MCP conflicts by design
- Keep tests fully deterministic and cross-browser
- Adhere to `.eslintrc.js` linting

## License
[MIT](LICENSE)
