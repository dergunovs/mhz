import { RouteRecordRaw } from 'vue-router';

import { URL_MAIN, URL_ERROR } from '@/common/constants';

import { categoryRoutes } from '@/category/routes';
import { manufacturerRoutes } from '@/manufacturer/routes';
import { productRoutes } from '@/product/routes';

export const routes: RouteRecordRaw[] = [
  ...categoryRoutes,
  ...manufacturerRoutes,
  ...productRoutes,

  { path: URL_MAIN, name: 'Main', component: () => import('@/common/pages/MainPage.vue') },

  { path: URL_ERROR, name: '404', component: () => import('@/common/pages/ErrorPage.vue'), meta: { layout: 'empty' } },
  { path: '/:catchAll(.*)', name: 'error', redirect: '404' },
];
