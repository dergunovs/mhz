import { QueryCache, QueryClient, type VueQueryPluginOptions } from '@tanstack/vue-query';

import { handleError } from './api';

export const queryClient = new QueryClient();

export function vueQueryOptions(toast: { error: (text: string) => void }): VueQueryPluginOptions {
  return {
    queryClientConfig: {
      queryCache: new QueryCache({
        onError: (error: unknown) => {
          toast.error(handleError(error));
        },
      }),
      defaultOptions: {
        queries: {
          refetchOnMount: false,
          refetchOnWindowFocus: false,
          retry: false,
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
export type { UseQueryReturnType } from '@tanstack/vue-query';
