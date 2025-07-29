const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const { clearContextAndGoto } = require('../utils/TestUtils');
const testData = require('../data/TestData');
const env = require('../config/env.config');

// Deterministic file/artifact suffix
const ARTIFACT = 'login';

test.describe('Saucedemo Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    await clearContextAndGoto(page, env.baseUrl);
  });

  test('should login with valid credentials (chromium & firefox)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await loginPage.screenshot(`${ARTIFACT}_valid_login`);
    await expect(page).toHaveURL(/inventory/);
  });

  test('should not login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(testData.invalidUser.username, testData.invalidUser.password);
    await loginPage.assertErrorMsg('Epic sadface: Username and password do not match any user in this service');
    await loginPage.screenshot(`${ARTIFACT}_invalid_login`);
  });
});
