/// <reference types="vitest" />

import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import { VitePWA } from 'vite-plugin-pwa';

function removeDataTest(node) {
  if (node.type === 1 /* NodeTypes.ELEMENT */) {
    node.props = node.props.filter((prop) => (prop.type === 6 ? prop.name !== 'data-test' : true));
  }
}

export default defineConfig({
  server: {
    port: 8081,
    headers: {
      'Content-Security-Policy': `default-src 'self';img-src 'self' data: localhost:5000 https://9000mhz.ru;script-src 'self' 'unsafe-inline';style-src 'self' 'unsafe-inline';connect-src 'self' localhost:5000 https://9000mhz.ru;frame-src 'self';`,
    },
  },

  build: { target: 'es2022' },

  resolve: { alias: { '@': resolve(__dirname, './src/modules') } },

  plugins: [
    vue({
      template: {
        compilerOptions: { nodeTransforms: process.env.NODE_ENV === 'production' ? [removeDataTest] : [] },
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
      scss: { additionalData: `@use "mhz-ui/dist/breakpoints" as *;`, api: 'modern-compiler' },
    },
  },

  test: {
    alias: { '@': resolve(__dirname, './src/modules') },
    cache: false,
    clearMocks: true,
    environment: 'happy-dom',
    include: ['**/*.spec.ts'],
    coverage: { provider: 'v8', reporter: ['text'], include: ['**/*.vue'], all: true },
    css: false,
  },
});
