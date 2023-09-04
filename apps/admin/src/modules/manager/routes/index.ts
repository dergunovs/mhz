import { URL_MANAGER, URL_MANAGER_CREATE, URL_MANAGER_EDIT } from '@/manager/constants';

export const managerRoutes = [
  {
    path: URL_MANAGER,
    name: 'ManagerList',
    component: () => import('@/manager/pages/ManagerListPage.vue'),
  },
  {
    path: URL_MANAGER_CREATE,
    name: 'ManagerCreate',
    component: () => import('@/manager/pages/ManagerCreatePage.vue'),
  },
  {
    path: `${URL_MANAGER_EDIT}/:manager`,
    name: 'ManagerEdit',
    component: () => import('@/manager/pages/ManagerEditPage.vue'),
  },
];
