import { createRouter, createWebHistory } from 'vue-router';

import { routes } from '@/common/router/routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ? savedPosition : { top: 0 };
  },
});

export default router;
