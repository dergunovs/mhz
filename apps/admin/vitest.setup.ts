import { beforeAll, vi } from 'vitest';
import { computed } from 'vue';
import * as helpers from 'mhz-helpers';

beforeAll(() => {
  vi.spyOn(helpers, 'useValidator').mockImplementation(() => {
    return {
      error: () => undefined,
      isValid: () => true,
      errors: computed(() => undefined),
    };
  });

  vi.spyOn(helpers, 'api').mockImplementation(async () => Promise<unknown>);
});
