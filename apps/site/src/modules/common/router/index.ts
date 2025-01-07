import { createRouter, createWebHistory } from 'vue-router';

import { deleteAuthHeader, getCookieToken, logout } from 'mhz-helpers';

import { routes } from '@/common/router/routes';
import { TOKEN_NAME, AUTH_URLS } from '@/auth/constants';
import { URL_MAIN } from '@/common/constants';

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    document.querySelector('main')?.scrollTo(0, 0);
  },
});

router.beforeEach((to, from, next) => {
  if (AUTH_URLS.includes(to.path) && !getCookieToken(TOKEN_NAME)) {
    logout(URL_MAIN, deleteAuthHeader, TOKEN_NAME);
  } else {
    next();
  }
});

export { router };
