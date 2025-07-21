// playwright.config.js
// Production-ready Playwright config: deterministic, multi-browser, video on failure
// See: https://playwright.dev/docs/test-configuration and https://playwright.dev/docs/videos

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './tests',
  timeout: 50000,                       // Default test timeout = 50s
  expect: { timeout: 30000 },            // Expect timeouts = 30s
  fullyParallel: true,                   // Parallel execution per spec
  workers: 2,                            // 2 workers for speed/determinism
  reporter: [
    ['html', { open: 'on-failure' }],    // HTML report, auto-open if failure
    ['list']                             // Console progress reporter
  ],
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: false,
        viewport: { width: 1280, height: 720 },
        screenshot: 'on',
        video: 'retain-on-failure',      // Video for failed tests (Playwright best practice)
        trace: 'on-first-retry',
        actionTimeout: 30000,
        navigationTimeout: 50000,
        launchOptions: { slowMo: 500 },
      },
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        headless: false,
        viewport: { width: 1280, height: 720 },
        screenshot: 'on',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
        actionTimeout: 30000,
        navigationTimeout: 50000,
        launchOptions: { slowMo: 500 },
      },
    },
  ],
};

module.exports = config;
