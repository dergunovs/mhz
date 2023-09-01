import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  server: {
    port: 8081,
    headers: {
      'Content-Security-Policy': `default-src 'self';img-src 'self' data: localhost:5000 https://9000mhz.ru;script-src 'self' 'unsafe-inline';style-src 'self' 'unsafe-inline';connect-src 'self' localhost:5000 https://9000mhz.ru;frame-src 'self';`,
    },
  },

  build: { target: 'esnext' },

  resolve: { alias: { '@': resolve(__dirname, './src/modules') } },

  plugins: [vue(), svgLoader()],

  css: {
    preprocessorOptions: {
      scss: { additionalData: `@import "mhz-ui/dist/breakpoints";` },
    },
  },
});
