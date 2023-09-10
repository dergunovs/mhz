import { URL_CHECKOUT, URL_PAYMENT } from '@/order/contants';

export const orderRoutes = [
  {
    path: URL_CHECKOUT,
    name: 'Checkout',
    component: () => import('@/order/pages/CheckoutPage.vue'),
  },
  {
    path: URL_PAYMENT,
    name: 'Payment',
    component: () => import('@/order/pages/PaymentPage.vue'),
  },
];
