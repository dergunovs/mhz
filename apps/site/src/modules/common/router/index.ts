import { createRouter, createWebHistory } from 'vue-router';

import { deleteAuthHeader, getCookieToken, logout } from 'mhz-helpers';

import { routes } from '@/common/router/routes';
import { TOKEN_NAME, AUTH_URLS } from '@/auth/constants';
import { URL_MAIN } from '@/common/constants';

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ? savedPosition : { top: 0 };
  },
});

const isAuthPages = AUTH_URLS.includes(window.location.pathname);
const token = getCookieToken(TOKEN_NAME);

router.beforeEach((to, from, next) => {
  if (isAuthPages && !token) {
    logout(URL_MAIN, deleteAuthHeader, TOKEN_NAME);
  } else {
    next();
  }
});

export default router;
