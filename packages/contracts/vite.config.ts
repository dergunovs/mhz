import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    target: 'esnext',
    copyPublicDir: false,
    lib: {
      name: 'mhz-contracts',
      entry: './src/index.ts',
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        entryFileNames: `index.js`,
      },
    },
  },

  plugins: [
    dts({
      entryRoot: './src',
    }),
  ],
});
