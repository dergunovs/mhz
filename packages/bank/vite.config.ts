import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  server: {
    port: 8082,
  },

  build: {
    target: "es2022",
    copyPublicDir: false,
    lib: {
      name: "mhz-bank",
      entry: "./src/main.ts",
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        entryFileNames: `main.js`,
      },
    },
  },

  plugins: [dts({ entryRoot: "./src" })],
});
