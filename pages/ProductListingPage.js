const BasePage = require('./BasePage');

class ProductListingPage extends BasePage {
  constructor(page) {
    super(page);
    this.inventoryContainer = '.inventory_list';
    this.cartButton = '.shopping_cart_link';
    this.inventoryItem = '.inventory_item';
    this.addToCartButton = 'button.btn_inventory';
    this.cartBadge = '.shopping_cart_badge';
  }

  async isLoaded() {
    return this.isVisible(this.inventoryContainer, 'Product Inventory List');
  }

  async addFirstProductToCart() {
    await this.click(this.addToCartButton, 'First Add to Cart Button');
    console.log('[Result] First product added to cart');
  }

  async goToCart() {
    await this.click(this.cartButton, 'Cart Button');
    console.log('[Action] Navigated to Cart');
  }

  async cartBadgeCount() {
    const text = await this.getText(this.cartBadge, 'Cart Badge Count');
    return parseInt(text) || 0;
  }
}

module.exports = ProductListingPage;
