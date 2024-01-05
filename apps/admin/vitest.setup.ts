import { beforeAll, vi } from 'vitest';
import { computed } from 'vue';
import * as helpers from 'mhz-helpers';

import { router } from './src/modules/common/test';

beforeAll(async () => {
  router.push('/');
  await router.isReady();

  vi.spyOn(helpers, 'useValidator').mockImplementation(() => {
    return {
      error: () => undefined,
      isValid: () => true,
      errors: computed(() => undefined),
    };
  });

  vi.spyOn(helpers, 'api').mockImplementation(async () => Promise<unknown>);
});
