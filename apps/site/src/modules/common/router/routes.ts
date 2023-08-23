import { RouteRecordRaw } from 'vue-router';

import { URL_MAIN, URL_ERROR } from '@/common/constants';

export const routes: RouteRecordRaw[] = [
  { path: URL_MAIN, name: 'Main', component: () => import('@/common/pages/MainPage.vue') },

  { path: URL_ERROR, name: '404', component: () => import('@/common/pages/ErrorPage.vue'), meta: { layout: 'empty' } },
  { path: '/:catchAll(.*)', name: 'error', redirect: '404' },
];
