import { useRoute } from 'vue-router';
import { useQueryClient } from '@tanstack/vue-query';

const queryClient = useQueryClient(); // стоит проверить, вызвав invalidate

export function useInvalidate(queryKey: string) {
  const route = useRoute(); 
  function invalidate() {
    if (route.query.create === '1') {
      queryClient.invalidateQueries({ queryKey: [queryKey], exact: true });
    }
  }

  return {
    invalidate,
  };
}
