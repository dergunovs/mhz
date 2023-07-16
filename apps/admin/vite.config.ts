import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  server: { port: 8080 },

  build: { target: 'esnext' },

  resolve: { alias: { '@': resolve(__dirname, './src/modules') } },

  plugins: [vue()],
});
