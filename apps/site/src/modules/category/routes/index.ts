import { URL_CATEGORY } from '@/category/constants';

export const categoryRoutes = [
  {
    path: `${URL_CATEGORY}/:id`,
    name: 'Category',
    component: () => import('@/category/pages/CategoryPage.vue'),
  },
];
