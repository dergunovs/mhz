import { URL_PRODUCT, URL_PRODUCT_CREATE, URL_PRODUCT_EDIT } from '@/product/constants';

export const productRoutes = [
  {
    path: URL_PRODUCT,
    name: 'ProductList',
    component: () => import('@/product/pages/ProductListPage.vue'),
  },
  {
    path: URL_PRODUCT_CREATE,
    name: 'ProductCreate',
    component: () => import('@/product/pages/ProductCreatePage.vue'),
  },
  {
    path: `${URL_PRODUCT_EDIT}/:product`,
    name: 'ProductEdit',
    component: () => import('@/product/pages/ProductEditPage.vue'),
  },
];
