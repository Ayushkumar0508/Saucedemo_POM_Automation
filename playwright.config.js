module.exports = {
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  reporter: [['html', { open: 'on-failure' }], ['list']],
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    screenshot: 'on',
    video: 'retain-on-failure',
    trace: 'on',
    actionTimeout: 30000,
    timeout: 50000,
  },
  projects: [
    { name: 'chromium' },
    { name: 'firefox' },
  ],
};
