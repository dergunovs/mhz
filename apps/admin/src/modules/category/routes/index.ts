import { URL_CATEGORY, URL_CATEGORY_CREATE, URL_CATEGORY_EDIT } from '@/category/constants';

export const categoryRoutes = [
  {
    path: URL_CATEGORY,
    name: 'CategoryList',
    component: () => import('@/category/pages/CategoryListPage.vue'),
  },
  {
    path: URL_CATEGORY_CREATE,
    name: 'CategoryCreate',
    component: () => import('@/category/pages/CategoryCreatePage.vue'),
  },
  {
    path: `${URL_CATEGORY_EDIT}/:id`,
    name: 'CategoryEdit',
    component: () => import('@/category/pages/CategoryEditPage.vue'),
  },
];
