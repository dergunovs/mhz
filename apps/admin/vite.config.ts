/// <reference types="vitest" />

import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  server: {
    port: 8080,
    headers: {
      'Content-Security-Policy': `default-src 'self';img-src 'self' data: localhost:5000 https://9000mhz.ru;script-src 'self' 'unsafe-inline';style-src 'self' 'unsafe-inline';connect-src 'self' localhost:5000 https://9000mhz.ru;frame-src 'self';`,
    },
  },

  build: { target: 'esnext' },

  resolve: { alias: { '@': resolve(__dirname, './src/modules') } },

  plugins: [
    vue(),
    svgLoader(),
    { name: 'vitest-setup', config: () => ({ test: { setupFiles: ['./vitest.setup.ts'] } }) },
  ],

  css: {
    preprocessorOptions: {
      scss: { additionalData: `@import "mhz-ui/dist/breakpoints";` },
    },
  },

  test: {
    alias: { '@': resolve(__dirname, './src/modules') },
    cache: false,
    clearMocks: true,
    environment: 'happy-dom',
    include: ['**/*.spec.ts'],
    coverage: { provider: 'v8', reporter: ['text'], include: ['**/*.vue'], all: true },
    testTimeout: 20000,
    css: false,
    typecheck: { enabled: false },
  },
});
