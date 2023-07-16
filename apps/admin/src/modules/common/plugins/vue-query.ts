import type { VueQueryPluginOptions } from '@tanstack/vue-query';

import { handleError } from '@/common/services/api';

export const vueQueryOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        onError: (error) => {
          handleError(error);
        },
      },
      mutations: {
        onError: (error) => {
          handleError(error);
        },
      },
    },
  },
};

export { VueQueryPlugin } from '@tanstack/vue-query';
