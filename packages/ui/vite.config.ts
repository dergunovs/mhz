import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

const files = fs.readdirSync('./src/components').filter((file) => file.includes('Ui'));

const components = files.reduce<{ [key: string]: string }>((obj, component) => {
  obj[component.split('.')[0]] = `src/components/${component}/${component}.vue`;

  return obj;
}, {});

export default defineConfig({
  server: { port: 8080 },

  build: {
    target: 'esnext',
    cssCodeSplit: true,
    copyPublicDir: false,
    lib: {
      name: 'mhz-ui',
      entry: components,
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue'],
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
      scss: {
        additionalData: `@import "@/assets/styles/breakpoints.scss";`,
      },
    },
  },

  plugins: [
    vue(),
    svgLoader(),
    dts({
      cleanVueFileName: true,
      include: ['./src/**/Ui*.vue'],
      exclude: ['./src/utils'],
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'src/components/index.js',
          dest: '',
          transform: (contents) => contents.toString().replace(/.(vue|ts)/g, '.js'),
        },
        {
          src: 'src/components/index.js',
          dest: '',
          rename: 'index.d.ts',
          transform: (contents) => contents.toString().replace(/.(vue|ts)/g, ''),
        },
        { src: 'src/assets/styles/base.scss', dest: '' },
        { src: 'src/assets/styles/breakpoints.scss', dest: '' },
        { src: 'src/assets/styles/colors.scss', dest: '' },
        { src: 'src/assets/styles/fonts.scss', dest: '' },
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
