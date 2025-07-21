// Page Object for Inventory/Product Listing and CheckoutPage (Saucedemo)
// Playwright Page Object Model - Production-grade implementation
// Reference: https://playwright.dev/docs/pom
// SOLID Principles, Chain-of-Thought, Deterministic flows

const { expect } = require('@playwright/test');

class ProductListingPage {
  /**
   * @param {import('@playwright/test').Page} page
   * For browser context: page.context().browser()
   */
  constructor(page) {
    this.page = page;
    this.inventoryContainer = '#inventory_container';
    this.cartButton = '.shopping_cart_link';
    this.addToCartButton = 'button[data-test^="add-to-cart"]';
    this.cartBadge = '.shopping_cart_badge';
    this.checkoutButton = '[data-test="checkout"]';
    this.firstNameInput = '[data-test="firstName"]';
    this.lastNameInput = '[data-test="lastName"]';
    this.postalCodeInput = '[data-test="postalCode"]';
    this.continueButton = '[data-test="continue"]';
    this.finishButton = '[data-test="finish"]';
    this.successMessage = '.complete-header';
  }

  async waitForPage(timeout = 30000) {
    // Assert intent: Inventory page loads
    await expect(this.page.locator(this.inventoryContainer)).toBeVisible({ timeout });
  }

  async addProductToCart(productIndex = 0) {
    // Deterministic: fixed product (default 0, could be made data-driven)
    const buttons = await this.page.$$(this.addToCartButton);
    if (buttons.length === 0) {
      throw new Error('No add to cart buttons found. [Selector valid? Product issue?]');
    }
    await buttons[productIndex].click();
  }

  async goToCart() {
    await this.page.click(this.cartButton);
    await expect(this.page.locator(this.cartBadge)).toBeVisible();
  }

  async checkout(first, last, postal) {
    await this.page.click(this.checkoutButton);
    await this.page.fill(this.firstNameInput, first);
    await this.page.fill(this.lastNameInput, last);
    await this.page.fill(this.postalCodeInput, postal);
    await this.page.click(this.continueButton);
  }

  async finishCheckout() {
    await this.page.click(this.finishButton);
    await expect(this.page.locator(this.successMessage)).toHaveText('Thank you for your order!', { timeout: 5000 });
  }
}

module.exports = { ProductListingPage };