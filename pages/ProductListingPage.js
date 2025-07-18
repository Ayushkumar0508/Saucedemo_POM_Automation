// pages/ProductListingPage.js
// Page Object & base classes for Inventory, Cart, Checkout per SOLID
// All selectors and logic deterministically set

class BasePage {
  constructor(page) {
    this.page = page;
  }
  async goto(url) {
    await this.page.goto(url, { waitUntil: 'networkidle' });
  }
}

class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartIcon = '#shopping_cart_container';
    this.addToCartBtn = 'button[data-test="add-to-cart-sauce-labs-backpack"]';
    this.burgerMenu = '#react-burger-menu-btn';
  }
  async addProductToCart() {
    await this.page.click(this.addToCartBtn);
  }
  async navToCart() {
    await this.page.click(this.cartIcon);
  }
}

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.checkoutBtn = 'button[data-test="checkout"]';
  }
  async checkout() {
    await this.page.click(this.checkoutBtn);
  }
}

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstName = 'input[data-test="firstName"]';
    this.lastName = 'input[data-test="lastName"]';
    this.postal = 'input[data-test="postalCode"]';
    this.continueBtn = 'input[data-test="continue"]';
    this.finishBtn = 'button[data-test="finish"]';
  }
  async enterInfo({ firstname, lastname, postalCode }) {
    await this.page.fill(this.firstName, firstname);
    await this.page.fill(this.lastName, lastname);
    await this.page.fill(this.postal, postalCode);
    await this.page.click(this.continueBtn);
  }
  async finish() {
    await this.page.click(this.finishBtn);
  }
}

module.exports = {
  InventoryPage, CartPage, CheckoutPage
};
