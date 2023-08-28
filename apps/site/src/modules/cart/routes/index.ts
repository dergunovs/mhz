import { URL_CART } from '@/cart/constants';

export const cartRoutes = [
  {
    path: URL_CART,
    name: 'Cart',
    component: () => import('@/cart/pages/CartPage.vue'),
  },
];
