import { createApp } from 'vue';
import { createHead } from '@vueuse/head';

import { VueQueryPlugin, vueQueryOptions, setBaseURL } from 'mhz-helpers';
import { toast } from 'mhz-ui';

import App from './App.vue';

import router from '@/common/router';

import '@/common/styles/main.scss';

const app = createApp(App);
const head = createHead();

app.use(router);
app.use(head);
app.use(VueQueryPlugin, vueQueryOptions(toast));

setBaseURL(import.meta.env.VITE_API);

app.mount('#app');
