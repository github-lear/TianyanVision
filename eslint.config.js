import vue from 'eslint-plugin-vue';
import prettierConfig from '@vue/eslint-config-prettier';
import tseslint from '@vue/eslint-config-typescript';

export default [
  ...vue.configs['flat/recommended'],
  ...tseslint(),
  prettierConfig,
  {
    files: ['**/*.{ts,vue}'],
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  }
];