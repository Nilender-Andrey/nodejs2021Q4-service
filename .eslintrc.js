module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
    node: true,
  },

  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:node/recommended',
    'eslint:recommended',
    'airbnb-base',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
  },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 2021,
    createDefaultProgram: true,
    ecmaFeatures: {
      impliedStrict: true,
    },
  },
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-tsdoc',
    '@typescript-eslint/tslint',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': ['error'],
    'tsdoc/syntax': 'error',
    'import/extensions': 'off',
    'linebreak-style': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
    node: {
      tryExtensions: ['.js', '.json', '.node', '.ts', '.d.ts'],
    },
  },
};
