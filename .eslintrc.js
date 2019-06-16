module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [ 'react' ],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'react/display-name': ['off'],
    'react/no-unescaped-entities': ['off'],
    'max-len': ['error', {code: 80}],
    'comma-spacing': ['error', {before: false, after: true}],
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': ['error', 'never']
  },
  settings: {
    react: { version: '16.8.6' }
  }
}
