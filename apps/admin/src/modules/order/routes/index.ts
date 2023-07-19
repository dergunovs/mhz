import { URL_ORDER } from '@/order/constants';

export const orderRoutes = [
  {
    path: URL_ORDER,
    name: 'OrderList',
    component: () => import('@/order/pages/OrderListPage.vue'),
  },
  {
    path: `${URL_ORDER}/:id`,
    name: 'Order',
    component: () => import('@/order/pages/OrderPage.vue'),
  },
];
