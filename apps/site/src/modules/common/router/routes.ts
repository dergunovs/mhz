import { RouteRecordRaw } from 'vue-router';

import { URL_MAIN, URL_ERROR } from '@/common/constants';

import { authRoutes } from '@/auth/routes';
import { categoryRoutes } from '@/category/routes';
import { manufacturerRoutes } from '@/manufacturer/routes';
import { productRoutes } from '@/product/routes';
import { customerRoutes } from '@/customer/routes';
import { cartRoutes } from '@/cart/routes';
import { orderRoutes } from '@/order/router';
import { configurationRoutes } from '@/configuration/routes';

export const routes: RouteRecordRaw[] = [
  ...cartRoutes,
  ...authRoutes,
  ...categoryRoutes,
  ...manufacturerRoutes,
  ...productRoutes,
  ...customerRoutes,
  ...orderRoutes,
  ...configurationRoutes,

  { path: URL_MAIN, name: 'Main', component: () => import('@/common/pages/MainPage.vue') },

  { path: URL_ERROR, name: '404', component: () => import('@/common/pages/ErrorPage.vue'), meta: { layout: 'empty' } },
  { path: '/:catchAll(.*)', name: 'error', redirect: '404' },
];
