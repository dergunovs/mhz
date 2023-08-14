import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  server: { port: 8082 },

  build: {
    target: 'esnext',
    copyPublicDir: false,
    lib: {
      name: 'mhz-helpers',
      entry: './src/index.ts',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', 'vue-router'],
      output: {
        entryFileNames: `index.js`,
        globals: { vue: 'Vue' },
      },
    },
  },

  plugins: [
    vue(),
    dts({
      entryRoot: './src',
    }),
  ],
});
