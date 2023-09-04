import { URL_CATEGORY } from '@/category/constants';

export const categoryRoutes = [
  {
    path: `${URL_CATEGORY}`,
    name: 'CategoryList',
    component: () => import('@/category/pages/CategoryListPage.vue'),
  },
  {
    path: `${URL_CATEGORY}/:category`,
    name: 'Category',
    component: () => import('@/category/pages/CategoryPage.vue'),
  },
];
