import { URL_CONFIGURATION } from '@/configuration/constants';

export const configurationRoutes = [
  {
    path: `${URL_CONFIGURATION}/:configuration`,
    name: 'Configuration',
    component: () => import('@/configuration/pages/ConfigurationPage.vue'),
  },
];
