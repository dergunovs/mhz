import { RouteRecordRaw } from 'vue-router';

import { authRoutes } from '@/auth/routes';
import { categoryRoutes } from '@/category/routes';
import { manufacturerRoutes } from '@/manufacturer/routes';
import { orderRoutes } from '@/order/routes';
import { productRoutes } from '@/product/routes';
import { managerRoutes } from '@/manager/routes';
import { customerRoutes } from '@/customer/routes';
import { bannerRoutes } from '@/banner/routes';

import { URL_MAIN, URL_ERROR } from '@/common/constants';

export const routes: RouteRecordRaw[] = [
  ...authRoutes,
  ...categoryRoutes,
  ...manufacturerRoutes,
  ...orderRoutes,
  ...productRoutes,
  ...managerRoutes,
  ...customerRoutes,
  ...bannerRoutes,

  { path: URL_MAIN, name: 'Main', component: () => import('@/common/pages/MainPage.vue') },

  { path: URL_ERROR, name: '404', component: () => import('@/common/pages/ErrorPage.vue'), meta: { layout: 'empty' } },
  { path: '/:catchAll(.*)', name: 'error', redirect: '404' },
];
