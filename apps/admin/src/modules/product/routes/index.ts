import { URL_PRODUCT } from '@/product/constants';

export const productRoutes = [
  {
    path: URL_PRODUCT,
    name: 'ProductList',
    component: () => import('@/product/pages/ProductListPage.vue'),
  },
  {
    path: `${URL_PRODUCT}/:id`,
    name: 'Product',
    component: () => import('@/product/pages/ProductPage.vue'),
  },
];
