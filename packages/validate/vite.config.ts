import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  server: { port: 8081 },

  build: {
    target: 'esnext',
    copyPublicDir: false,
    lib: {
      name: 'mhz-validate',
      entry: './src/index.ts',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue'],
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
