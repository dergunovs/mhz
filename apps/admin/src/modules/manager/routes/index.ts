import { URL_MANAGER } from '@/manager/constants';

export const managerRoutes = [
  {
    path: URL_MANAGER,
    name: 'ManagerList',
    component: () => import('@/manager/pages/ManagerListPage.vue'),
  },
  {
    path: `${URL_MANAGER}/:id`,
    name: 'Manager',
    component: () => import('@/manager/pages/ManagerPage.vue'),
  },
];
