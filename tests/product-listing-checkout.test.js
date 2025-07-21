// Playwright POM Functional Test - Chain-of-Thought for Saucedemo
// https://www.saucedemo.com
// Author: POM Generator (Deterministic, Robust)
// See README.md for usage

const { test, expect } = require('@playwright/test');
const { ProductListingPage } = require('../pages/ProductListingPage');
const { TEST_USER, TEST_PASSWORD, CHECKOUT_INFO } = require('../data/TestData');
const { logStep, takeScreenshot, retryWithReason } = require('../utils/TestUtils');

// --- Chain-of-Thought: Test Steps are deterministic and logged
// See https://playwright.dev/docs/test-intro

test.describe.parallel('Chain of Thought: Product Listing → Checkout flow', () => {
  test('Login, add product, checkout, finish (chromium/firefox, deterministic)', async ({ page, browserName }, testInfo) => {
    logStep('INIT', 'Set deterministic test data and fresh browser');
    // Ensure test data is always identical
    await page.goto('https://www.saucedemo.com', { waitUntil: 'domcontentloaded' });
    logStep('NAVIGATE', 'Go to https://www.saucedemo.com');

    await expect(page.locator('[data-test="username"]')).toBeVisible();
    logStep('ACTION', 'Filling credentials and signing in');
    await page.fill('[data-test="username"]', TEST_USER);
    await page.fill('[data-test="password"]', TEST_PASSWORD);
    await page.click('[data-test="login-button"]');

    const productListingPage = new ProductListingPage(page);
    await retryWithReason(() => productListingPage.waitForPage(), 1, 'Wait for inventory page');
    logStep('ASSERT', 'Inventory page loaded, ready for interaction');

    await retryWithReason(() => productListingPage.addProductToCart(0), 2, 'Adding first product to cart');
    logStep('ACTION', 'First product added to cart');
    await takeScreenshot(page, `logged-in-${browserName}.png`);

    await productListingPage.goToCart();
    logStep('ACTION', 'Navigated to cart; verified product in cart');

    await productListingPage.checkout(CHECKOUT_INFO.first, CHECKOUT_INFO.last, CHECKOUT_INFO.postal);
    logStep('ACTION', 'Checkout info entered, continued');

    await retryWithReason(() => productListingPage.finishCheckout(), 2, 'Finish checkout');
    logStep('END', 'Order completed and verified success message.');
  });
});
