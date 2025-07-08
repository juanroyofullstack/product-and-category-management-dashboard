import pluginNext from '@next/eslint-plugin-next'
import pluginTypeScript from '@typescript-eslint/eslint-plugin';
import parserTypeScript from '@typescript-eslint/parser';

export default [
  {
    ignores: [
      'node_modules',
      '.next',
      'out',
      'dist',
      'build',
      'coverage',
      'public',
      '.turbo',
      '.vercel',
      '.git',
      '**/*.d.ts'
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@next/next': pluginNext,
      '@typescript-eslint': pluginTypeScript,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
      'no-console': 'warn',
      'indent': [
        'error',
        4,
        {
          'SwitchCase': 1,
          'VariableDeclarator': 1,
          'outerIIFEBody': 1,
          'MemberExpression': 1,
          'FunctionDeclaration': { 'parameters': 1, 'body': 1 },
          'FunctionExpression': { 'parameters': 1, 'body': 1 },
          'CallExpression': { 'arguments': 1 },
          'ArrayExpression': 1,
          'ObjectExpression': 1,
          'ImportDeclaration': 1,
          'flatTernaryExpressions': false,
          'offsetTernaryExpressions': true,
          'ignoreComments': false
        }
      ],
      'semi': ['error', 'always'],
      'quotes': ['error', 'single', { 'avoidEscape': true }],
      'comma-dangle': ['error', 'always-multiline'],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['off'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    }
  }
]
