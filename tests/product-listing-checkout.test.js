const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductListingPage = require('../pages/ProductListingPage');
const CheckoutPage = require('../pages/CheckoutPage');
const { clearContextAndGoto } = require('../utils/TestUtils');
const testData = require('../data/TestData');
const env = require('../config/env.config');

const ARTIFACT = 'listing_checkout';

test.describe('Saucedemo Product Listing & Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    await clearContextAndGoto(page, env.baseUrl);
  });

  test('should add item to cart and checkout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductListingPage(page);
    const checkoutPage = new CheckoutPage(page);
    // Login
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await expect(page).toHaveURL(/inventory/);
    await loginPage.screenshot(`${ARTIFACT}_after_login`);
    // Product listing page loaded
    await expect(await productPage.isLoaded()).toBeTruthy();
    await productPage.addFirstProductToCart();
    await productPage.screenshot(`${ARTIFACT}_after_add_to_cart`);
    await productPage.goToCart();
    // Cart
    await checkoutPage.startCheckout();
    await checkoutPage.fillInfo('John', 'Doe', '10001');
    await checkoutPage.completeOrder();
    const result = await checkoutPage.assertCompleted();
    await checkoutPage.screenshot(`${ARTIFACT}_after_checkout`);
    expect(result.toLowerCase()).toContain('thank you');
  });
});
