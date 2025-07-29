const BasePage = require('./BasePage');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.checkoutBtn = '[data-test="checkout"]';
    this.firstnameInput = '[data-test="firstName"]';
    this.lastnameInput = '[data-test="lastName"]';
    this.zipInput = '[data-test="postalCode"]';
    this.continueBtn = '[data-test="continue"]';
    this.finishBtn = '[data-test="finish"]';
    this.completeHeader = '.complete-header';
  }

  async startCheckout() {
    await this.click(this.checkoutBtn, 'Checkout Button');
  }

  async fillInfo(first, last, zip) {
    await this.fill(this.firstnameInput, first, 'First Name');
    await this.fill(this.lastnameInput, last, 'Last Name');
    await this.fill(this.zipInput, zip, 'Zip/Postal Code');
    await this.click(this.continueBtn, 'Continue Button');
    console.log('[Action] Entered checkout information and continued');
  }

  async completeOrder() {
    await this.click(this.finishBtn, 'Finish Button');
    console.log('[Result] Completed order');
  }

  async assertCompleted() {
    await this.page.waitForSelector(this.completeHeader, { timeout: 8000 });
    const header = await this.getText(this.completeHeader, 'Complete Header');
    console.log(`[Assert] Order completed message: ${header}`);
    return header;
  }
}

module.exports = CheckoutPage;
