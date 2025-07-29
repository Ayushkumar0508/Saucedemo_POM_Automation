const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = '#user-name';
    this.passwordInput = '#password';
    this.loginButton = '#login-button';
    this.errorMessage = '[data-test="error"]';
  }

  async login(username, password) {
    console.log('[Intent] Attempt login');
    await this.fill(this.usernameInput, username, 'Username Input');
    await this.fill(this.passwordInput, password, 'Password Input');
    await this.click(this.loginButton, 'Login Button');
    console.log('[Result] Submitted login form');
  }

  async assertErrorMsg(expected) {
    await this.expectText(this.errorMessage, expected, 'Login Error Message');
  }
}

module.exports = LoginPage;
