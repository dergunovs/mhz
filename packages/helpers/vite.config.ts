import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  build: {
    target: 'es2022',
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
