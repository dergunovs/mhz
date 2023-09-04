import { URL_CUSTOMER } from '@/customer/constants';

export const customerRoutes = [
  {
    path: URL_CUSTOMER,
    name: 'CustomerList',
    component: () => import('@/customer/pages/CustomerListPage.vue'),
  },
  {
    path: `${URL_CUSTOMER}/:customer`,
    name: 'Customer',
    component: () => import('@/customer/pages/CustomerPage.vue'),
  },
];
