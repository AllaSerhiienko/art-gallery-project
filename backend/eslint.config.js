import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import mateAcademyConfig from '@mate-academy/eslint-config';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    parser: tsParser,
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    linterOptions: {
      noInlineConfig: false,
    },
    rules: {
      ...mateAcademyConfig.rules,
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
    },
    plugins: {
      prettier: prettierPlugin,
      '@typescript-eslint': tseslint,
    },
  },
];
