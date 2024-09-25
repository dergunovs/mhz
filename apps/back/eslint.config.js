import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginImportX from 'eslint-plugin-import-x';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import { options, ignores, settings, rules } from 'fastify-linters-config';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,

  ignores,
  { ...options(globals), ...settings, ...rules },

  eslintPluginPrettierRecommended
);
