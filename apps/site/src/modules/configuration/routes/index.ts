import { URL_CONFIGURATION_CREATE } from '@/configuration/constants';

export const configurationRoutes = [
  {
    path: URL_CONFIGURATION_CREATE,
    name: 'Configuration',
    component: () => import('@/configuration/pages/ConfigurationCreatePage.vue'),
  },
];
