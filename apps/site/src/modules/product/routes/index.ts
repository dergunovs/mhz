import { URL_PRODUCT } from '@/product/constants';
import { URL_CATEGORY } from '@/category/constants';

export const productRoutes = [
  {
    path: `${URL_CATEGORY}/:category${URL_PRODUCT}/:id`,
    name: 'Product',
    component: () => import('@/product/pages/ProductPage.vue'),
  },
];
