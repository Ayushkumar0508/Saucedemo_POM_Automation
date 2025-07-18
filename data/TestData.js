// data/TestData.js
// Centralized deterministic test data and config constants per specifications

module.exports = {
  VALID_USER: {
    username: 'standard_user',
    password: 'secret_sauce',
    firstname: 'Chain',
    lastname: 'Thought',
    postalCode: '12345',
  },
  PRODUCT: {
    name: 'Sauce Labs Backpack', // Use a specific deterministic product
  },
  URLS: {
    base: 'https://www.saucedemo.com/',
    inventory: 'https://www.saucedemo.com/inventory.html',
    cart: 'https://www.saucedemo.com/cart.html'
  }
};
