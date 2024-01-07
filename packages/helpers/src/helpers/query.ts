import { QueryCache, QueryClient, type VueQueryPluginOptions } from '@tanstack/vue-query';

import { logout } from '../composables/useAuth';
import { handleError, deleteAuthHeader } from './api';

export const queryClient = new QueryClient();

export function vueQueryOptions(
  toast: { error: (text: string) => void },
  logoutUrl: string,
  tokenName: string
): VueQueryPluginOptions {
  return {
    queryClientConfig: {
      queryCache: new QueryCache({
        onError: (error: unknown) => {
          if ((error as { response: { status: number } }).response.status === 403) {
            logout(logoutUrl, deleteAuthHeader, tokenName);
          }

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
export type { UseQueryReturnType, UseMutationReturnType, QueryClient } from '@tanstack/vue-query';
