const globals = require('globals');

const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');

module.exports = [
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    plugins: {
      '@typescript-eslint': tseslint,
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.es6,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
    },
  }
];
