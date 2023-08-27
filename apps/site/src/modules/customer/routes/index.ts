import { URL_CUSTOMER, URL_FAVOURITES } from '@/customer/constants';

export const customerRoutes = [
  {
    path: URL_CUSTOMER,
    name: 'Customer',
    component: () => import('@/customer/pages/CustomerPage.vue'),
  },
  {
    path: URL_FAVOURITES,
    name: 'Favourites',
    component: () => import('@/customer/pages/FavouritesPage.vue'),
  },
];
