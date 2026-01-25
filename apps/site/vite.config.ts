/// <reference types="vitest/config" />

import path from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import { VitePWA } from 'vite-plugin-pwa';
import { removeDataTest } from 'mhz-helpers';
import type { CompilerOptions } from 'vue/compiler-sfc';

export default defineConfig({
  server: {
    port: 8081,
    headers: {
      'Content-Security-Policy': `default-src 'self';img-src 'self' data: localhost:5000 https://9000mhz.ru;script-src 'self' 'unsafe-inline';style-src 'self' 'unsafe-inline';connect-src 'self' localhost:5000 https://9000mhz.ru;frame-src 'self';`,
    },
  },

  build: { target: 'es2022' },

  resolve: { alias: { '@': path.resolve(import.meta.dirname, './src/modules') } },

  plugins: [
    vue({
      template: {
        compilerOptions: {
          nodeTransforms: process.env.NODE_ENV === 'production' ? [removeDataTest] : [],
        } as CompilerOptions,
      },
    }),
    svgLoader(),
    { name: 'vitest-setup', config: () => ({ test: { setupFiles: ['./vitest.setup.ts'] } }) },
    VitePWA({
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,webp,woff2}'],
      },
      manifest: {
        name: '9000 Mhz',
        short_name: '9000 Mhz',
        description: 'Fake PC hardware store',
        theme_color: '#ffffff',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],

  css: {
    preprocessorOptions: {
      scss: { additionalData: `@use "mhz-ui/dist/breakpoints" as *;` },
    },
  },

  test: {
    alias: { '@': path.resolve(import.meta.dirname, './src/modules') },
    cache: false,
    clearMocks: true,
    environment: 'happy-dom',
    include: ['**/*.spec.ts'],
    coverage: { provider: 'v8', reporter: ['text'], include: ['**/*.vue'] },
    css: false,
    server: {
      deps: { inline: [/^(?!.*vitest).*$/] },
    },
    env: { TZ: 'UTC' },
  },
});
