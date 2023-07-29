import { URL_LOGIN, URL_SETUP } from '@/auth/constants';

export const authRoutes = [
  { path: URL_LOGIN, name: 'Login', component: () => import('@/auth/pages/LoginPage.vue') },
  { path: URL_SETUP, name: 'Setup', component: () => import('@/auth/pages/SetupPage.vue') },
];
