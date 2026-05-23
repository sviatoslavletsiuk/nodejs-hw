import { configs } from '@eslint/js';

export default [
  {
    ...configs.recommended,
    languageOptions: {
      ...configs.recommended.languageOptions,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
];
