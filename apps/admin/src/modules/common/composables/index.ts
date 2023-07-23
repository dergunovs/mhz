import { useRoute } from 'vue-router';
import { useQueryClient } from '@tanstack/vue-query';

export function useInvalidate(queryKey: string) {
  const route = useRoute();
  const queryClient = useQueryClient();

  function invalidate() {
    if (route.query.create === '1') {
      queryClient.invalidateQueries({ queryKey: [queryKey], exact: true });
    }
  }

  return {
    invalidate,
  };
}
