module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },//这几行自己加的
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
      'no-undef': 2,//这几行自己加的
      '@typescript-eslint/no-unused-vars': 2,//这几行自己加的
    },
  };
  