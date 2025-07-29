const { expect } = require('@playwright/test');

class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async goto(url) {
    console.log('[Intent] Navigate to', url);
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    console.log('[Result] Page loaded:', url);
  }

  async click(selector, description) {
    console.log(`[Intent] Click on ${description || selector}`);
    await this.page.waitForSelector(selector, { state: 'visible', timeout: 5000 });
    await this.page.click(selector);
    console.log(`[Result] Clicked on ${description || selector}`);
  }

  async fill(selector, value, description) {
    console.log(`[Intent] Fill ${description || selector} with ${value}`);
    await this.page.waitForSelector(selector, { state: 'visible', timeout: 5000 });
    await this.page.fill(selector, value);
    console.log(`[Result] Filled ${description || selector}`);
  }

  async isVisible(selector, description) {
    const visible = await this.page.isVisible(selector);
    console.log(`[Check] ${description || selector} visible:`, visible);
    return visible;
  }

  async getText(selector, description) {
    await this.page.waitForSelector(selector, { state: 'visible', timeout: 5000 });
    const text = await this.page.textContent(selector);
    console.log(`[Fetch] Text from ${description || selector}:`, text);
    return text;
  }

  async expectText(selector, expected, description) {
    await this.page.waitForSelector(selector, { state: 'visible', timeout: 5000 });
    const txt = await this.page.textContent(selector);
    console.log(`[Assert] Expect text of ${description || selector}: ${txt} === ${expected}`);
    expect(txt.trim()).toBe(expected);
  }

  async screenshot(name) {
    await this.page.screenshot({ path: `test-results/screenshots/${name}.png`, fullPage: true });
    console.log(`[Artifact] Screenshot saved: test-results/screenshots/${name}.png`);
  }

}

module.exports = BasePage;
