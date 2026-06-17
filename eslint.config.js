const js = require('@eslint/js');
const cypressPlugin = require('eslint-plugin-cypress');
const prettierPlugin = require('eslint-plugin-prettier');
const globals = require('globals');

module.exports = [
  js.configs.recommended,
  {
    plugins: {
      cypress: cypressPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        Cypress: 'readonly',
        cy: 'readonly',
        ...globals.browser,
        ...globals.commonjs,
        ...globals.mocha,
      },
    },
    files: ['**/*.js'],
    rules: {
      'no-unused-vars': 'warn',
      'prettier/prettier': 'error',
    },
  },
];
