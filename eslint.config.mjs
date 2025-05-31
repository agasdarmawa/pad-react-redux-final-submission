import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginImport from 'eslint-plugin-import';
import pluginCypress from 'eslint-plugin-cypress/flat';
import daStyle from 'eslint-config-dicodingacademy';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: ['.next/**', 'dist/**'],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...(Array.isArray(daStyle) ? daStyle : [daStyle]),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    excludedFiles: ['cypress/**/*', '**/*.cy.*'],
    plugins: {
      react: eslintPluginReact,
      import: eslintPluginImport,
    },
    rules: {
      'no-console': 'warn',
      'react/jsx-uses-react': 'off',
      'linebreak-style': 'off',
      'no-alert': 'off',
      'no-underscore-dangle': 'off',
      'import/prefer-default-export': 'off',
      'react/jsx-props-no-spreading': 'off',
    },
    languageOptions: {
      ecmaVersion: 2022,
    },
  },
  // cypress configs
  {
    files: ['cypress/**/*.js', 'cypress/**/*.ts', '**/*.cy.js', '**/*.cy.ts'],
    plugins: {
      cypress: pluginCypress,
    },
    rules: {
      ...pluginCypress.configs.recommended.rules,
    },
    languageOptions: {
      globals: {
        cy: 'readonly',
        Cypress: 'readonly',
        before: 'readonly',
        after: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        context: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        specify: 'readonly',
      },
    },
  },
];

export default eslintConfig;
