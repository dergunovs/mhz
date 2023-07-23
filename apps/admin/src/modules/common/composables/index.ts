import { useRoute, useRouter } from 'vue-router';
import { useQueryClient } from '@tanstack/vue-query';

export function useInvalidate() {
  const route = useRoute();
  const router = useRouter();

  const queryClient = useQueryClient();

  function invalidate(queryKey: string) {
    queryClient.invalidateQueries({ queryKey: [queryKey], exact: true });
  }

  function invalidateCheck(queryKey: string) {
    if (route.query.create === '1') invalidate(queryKey);
  }

  function invalidatePush(url: string) {
    router.push(`${url}?create=1`);
  }

  return {
    invalidate,
    invalidateCheck,
    invalidatePush,
  };
}
