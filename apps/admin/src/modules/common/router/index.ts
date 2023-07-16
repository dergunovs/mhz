import { createRouter, createWebHistory } from 'vue-router';

import { routes } from '@/common/router/routes';
import { getCookieToken } from '@/auth/composables';
import { URL_LOGIN } from '@/auth/constants';

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ? savedPosition : { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (to.path !== URL_LOGIN && !getCookieToken()) {
    next({ path: `${URL_LOGIN}?logout=1` });
  } else {
    next();
  }
});

export default router;
