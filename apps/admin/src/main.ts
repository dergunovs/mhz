import { createApp } from 'vue';

import App from './App.vue';
import router from '@/common/router';
import { VueQueryPlugin, vueQueryOptions } from '@/common/plugins/vue-query';

import '@/common/assets/styles/main.scss';

const app = createApp(App);

app.use(router);
app.use(VueQueryPlugin, vueQueryOptions);
app.mount('#app');
