import { fileURLToPath } from 'node:url';
import path from 'node:path';
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import pluginImportX from 'eslint-plugin-import-x';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginSonar from 'eslint-plugin-sonarjs';
import pluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import { parser, options, ignores, settings, rules } from 'fastify-linters-config';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginSonar.configs.recommended,
  pluginUnicorn.configs.recommended,
  pluginImportX.flatConfigs.recommended,
  pluginImportX.flatConfigs.typescript,

  ignores,

  parser(tseslint.parser, dirname),

  { ...options(globals), ...settings, ...rules },

  pluginPrettierRecommended
);
