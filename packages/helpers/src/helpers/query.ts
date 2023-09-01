import type { VueQueryPluginOptions } from '@tanstack/vue-query';

import { handleError } from './api';

export function vueQueryOptions(toast: { error: (text: string) => void }): VueQueryPluginOptions {
  return {
    queryClientConfig: {
      defaultOptions: {
        queries: {
          refetchOnMount: false,
          refetchOnWindowFocus: false,
          onError: (error: unknown) => {
            toast.error(handleError(error));
          },
        },
        mutations: {
          onError: (error: unknown) => {
            toast.error(handleError(error));
          },
        },
      },
    },
  };
}

export { VueQueryPlugin, useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
