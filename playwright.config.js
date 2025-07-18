// playwright.config.js
// See https://playwright.dev/docs/test-configuration and https://playwright.dev/docs/videos
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  timeout: 50000,
  expect: {
    timeout: 30000
  },
  reporter: [
    ['list'],
    ['html', { open: 'on-failure' }]
  ],
  use: {
    headless: false, // Headed for visibility
    screenshot: 'only-on-failure',
    video: 'retain-on-failure', // https://playwright.dev/docs/videos
    viewport: { width: 1280, height: 720 },
    trace: 'off',
    actionTimeout: 30000,
    navigationTimeout: 50000,
    baseURL: 'https://www.saucedemo.com',
    storageState: undefined // No default login
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    }
  ]
};
module.exports = config;
