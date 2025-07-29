module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:playwright/recommended'
  ],
  plugins: ['playwright'],
  overrides: [
    {
      files: ['tests/**/*.js'],
      env: { mocha: true }
    }
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'no-console': 'off',
    'playwright/no-skipped-test': 'error'
  }
};
