import { URL_USER } from '@/user/constants';

export const userRoutes = [
  {
    path: URL_USER,
    name: 'UserList',
    component: () => import('@/user/pages/UserListPage.vue'),
  },
  {
    path: `${URL_USER}/:id`,
    name: 'User',
    component: () => import('@/user/pages/UserPage.vue'),
  },
];
