import { URL_LOGIN } from '@/auth/constants';

export const authRoutes = [{ path: URL_LOGIN, name: 'Login', component: () => import('@/auth/pages/LoginPage.vue') }];
