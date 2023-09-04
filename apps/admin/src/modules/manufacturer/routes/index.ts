import { URL_MANUFACTURER, URL_MANUFACTURER_CREATE, URL_MANUFACTURER_EDIT } from '@/manufacturer/constants';

export const manufacturerRoutes = [
  {
    path: URL_MANUFACTURER,
    name: 'ManufacturerList',
    component: () => import('@/manufacturer/pages/ManufacturerListPage.vue'),
  },
  {
    path: URL_MANUFACTURER_CREATE,
    name: 'ManufacturerCreate',
    component: () => import('@/manufacturer/pages/ManufacturerCreatePage.vue'),
  },
  {
    path: `${URL_MANUFACTURER_EDIT}/:manufacturer`,
    name: 'ManufacturerEdit',
    component: () => import('@/manufacturer/pages/ManufacturerEditPage.vue'),
  },
];
