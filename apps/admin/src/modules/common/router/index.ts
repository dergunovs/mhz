import { createRouter, createWebHistory } from 'vue-router';

import { getCookieToken, logout, deleteAuthHeader } from 'mhz-helpers';

import { routes } from '@/common/router/routes';
import { TOKEN_NAME, URL_LOGIN, URL_SETUP } from '@/auth/constants';

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ? savedPosition : { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (![URL_LOGIN, URL_SETUP].includes(to.path) && !getCookieToken(TOKEN_NAME)) {
    logout(URL_LOGIN, deleteAuthHeader, TOKEN_NAME);
  } else {
    next();
  }
});

export default router;
