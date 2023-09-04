import { URL_PRODUCT } from '@/product/constants';

export const productRoutes = [
  {
    path: `${URL_PRODUCT}/:product`,
    name: 'Product',
    component: () => import('@/product/pages/ProductPage.vue'),
  },
];
