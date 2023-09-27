import { beforeAll } from 'vitest';

import { router } from './src/modules/common/test';

beforeAll(async () => {
  router.push('/');
  await router.isReady();
});
