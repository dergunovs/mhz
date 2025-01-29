/// <reference types="vitest" />

import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

function removeDataTest(node) {
  if (node.type === 1 /* NodeTypes.ELEMENT */) {
    node.props = node.props.filter((prop) => (prop.type === 6 ? prop.name !== 'data-test' : true));
  }
}

const files = fs.readdirSync('./src/components').filter((file) => file.includes('Ui'));

const components = files.reduce<{ [key: string]: string }>((obj, component) => {
  obj[component.split('.')[0]] = `src/components/${component}/${component}.vue`;

  return obj;
}, {});

components['toast'] = `src/components/toast/toast.ts`;
components['stubs'] = `src/components/stubs/stubs.ts`;

export default defineConfig({
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    copyPublicDir: false,
    lib: {
      name: 'mhz-ui',
      entry: components,
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', 'vue-router'],
      output: {
        entryFileNames: `[name]/[name].js`,
        assetFileNames: `[name]/[name].[ext]`,
        globals: { vue: 'Vue' },
      },
    },
  },

  resolve: { alias: { '@': path.resolve(__dirname, './src') } },

  css: {
    preprocessorOptions: {
      scss: { additionalData: `@use "@/assets/styles/breakpoints" as *;`, api: 'modern-compiler' },
    },
  },

  test: {
    alias: { '@': path.resolve(__dirname, './src') },
    cache: false,
    clearMocks: true,
    environment: 'happy-dom',
    include: ['**/*.spec.ts'],
    coverage: { provider: 'v8', reporter: ['text'], include: ['src/**/Ui*.vue'], all: true },
    css: false,
  },

  plugins: [
    vue({
      template: {
        compilerOptions: { nodeTransforms: process.env.NODE_ENV === 'production' ? [removeDataTest] : [] },
      },
    }),
    svgLoader(),
    dts({ cleanVueFileName: true, entryRoot: './src/components' }),
    viteStaticCopy({
      targets: [
        {
          src: 'src/components/index.ts',
          dest: '',
          rename: 'index.js',
          transform: (contents) =>
            contents
              .toString()
              .replace(/.(vue|ts)/g, '.js')
              .replace('./toast/toast', './toast/toast.js')
              .replace('./stubs/stubs', './stubs/stubs.js'),
        },
        {
          src: 'src/components/index.ts',
          dest: '',
          rename: 'index.d.ts',
          transform: (contents) => contents.toString().replace(/.(vue|ts)/g, ''),
        },
        { src: 'src/assets/styles/base.scss', dest: '' },
        { src: 'src/assets/styles/breakpoints.scss', dest: '' },
        { src: 'src/assets/styles/colors.scss', dest: '' },
        { src: 'src/assets/styles/fonts.scss', dest: '' },
        { src: 'src/assets/styles/transitions.scss', dest: '' },
      ],
    }),
    {
      name: 'add-css-link',
      apply: 'build',

      writeBundle(option, bundle) {
        const cssFiles = Object.keys(bundle)
          .filter((file) => file.endsWith('.css') && !file.includes('-'))
          .map((file) => file.replace('.css', ''));

        for (const file of cssFiles) {
          const filePath = path.resolve('', 'dist', `${file}.js`);
          const cssImport = `import "./${file.split('/')[0]}.css";`;
          const data = fs.readFileSync(filePath, { encoding: 'utf8' });

          fs.writeFileSync(filePath, `${cssImport}\n${data}`);
        }
      },
    },
  ],
});
