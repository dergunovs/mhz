import { URL_LOGIN, URL_SIGN_UP } from '@/auth/constants';

export const authRoutes = [
  {
    path: URL_LOGIN,
    name: 'Login',
    component: () => import('@/auth/pages/LoginPage.vue'),
  },
  {
    path: URL_SIGN_UP,
    name: 'SignUp',
    component: () => import('@/auth/pages/SignUpPage.vue'),
  },
];
