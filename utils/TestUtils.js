// utils/TestUtils.js
// Robust utility helpers for Playwright POM Test Framework
// - Chain-of-Thought logging, deterministic screenshot, robust retry, context cleanup

const { expect } = require('@playwright/test');
const fs = require('fs');

/**
 * Log each test step with intent, action, result, timestamp, browser context.
 * This meets the chain-of-thought and deterministic trace requirements.
 */
function logStep(intent, action, result) {
  const stamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  console.log(`[${stamp}] [${process.env.BROWSER || 'browser'}] [${intent}] ${action}${result ? ' → ' + result : ''}`);
}

/**
 * Save deterministic screenshots for each major action.
 */
function takeScreenshot(page, filename) {
  logStep('SCREENSHOT', `Saving screenshot: ${filename}`);
  return page.screenshot({ path: `screenshots/${filename}`, fullPage: true });
}

/**
 * Retry utility with intent logging, for explicit/deterministic waits and operations.
 */
async function retryWithReason(fn, maxAttempts, reason) {
  let err = null;
  for (let i = 0; i < maxAttempts; ++i) {
    try {
      logStep('RETRY', reason, `Attempt ${i + 1}`);
      await fn();
      return;
    } catch (e) {
      err = e;
      logStep('RETRY', reason, `Failed attempt ${i + 1}: ${e.message}`);
    }
  }
  logStep('RETRY', reason, 'FAIL');
  throw err;
}

/**
 * Clean up and close browser context safely
 */
async function cleanUp(page) {
  try {
    await page.context().close();
    if (page.context().browser()) await page.context().browser().close();
  } catch (_) {/* Suppress for finalizer */}
}

module.exports = {
  logStep,
  takeScreenshot,
  retryWithReason,
  cleanUp,
};
