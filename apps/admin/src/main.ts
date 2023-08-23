import { createApp } from 'vue';
import { createHead } from '@vueuse/head';

import App from './App.vue';

import router from '@/common/router';
import { VueQueryPlugin, vueQueryOptions } from '@/common/plugins/vue-query';

import '@/common/assets/styles/main.scss';

const app = createApp(App);
const head = createHead();

app.use(router);
app.use(head);
app.use(VueQueryPlugin, vueQueryOptions);

app.mount('#app');
