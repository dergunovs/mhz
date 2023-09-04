import { URL_MANUFACTURER } from '@/manufacturer/constants';

export const manufacturerRoutes = [
  {
    path: `${URL_MANUFACTURER}`,
    name: 'ManufacturerList',
    component: () => import('@/manufacturer/pages/ManufacturerListPage.vue'),
  },
  {
    path: `${URL_MANUFACTURER}/:manufacturer`,
    name: 'Manufacturer',
    component: () => import('@/manufacturer/pages/ManufacturerPage.vue'),
  },
];
