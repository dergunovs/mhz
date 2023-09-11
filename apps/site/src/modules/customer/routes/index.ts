import {
  URL_CUSTOMER,
  URL_CUSTOMER_FAVOURITES,
  URL_CUSTOMER_ORDERS,
  URL_CUSTOMER_PROFILE,
  URL_CUSTOMER_WATHED_PRODUCTS,
} from '@/customer/constants';

export const customerRoutes = [
  {
    path: URL_CUSTOMER,
    name: 'Customer',
    component: () => import('@/customer/pages/CustomerPage.vue'),
    children: [
      {
        path: URL_CUSTOMER_FAVOURITES,
        name: 'Favourites',
        component: () => import('@/customer/pages/FavouritesPage.vue'),
      },
      {
        path: URL_CUSTOMER_WATHED_PRODUCTS,
        name: 'WatchedProducts',
        component: () => import('@/customer/pages/WatchedProductsPage.vue'),
      },
      {
        path: URL_CUSTOMER_ORDERS,
        name: 'Orders',
        component: () => import('@/customer/pages/OrdersPage.vue'),
      },
      {
        path: URL_CUSTOMER_PROFILE,
        name: 'Profile',
        component: () => import('@/customer/pages/ProfilePage.vue'),
      },
    ],
  },
];
