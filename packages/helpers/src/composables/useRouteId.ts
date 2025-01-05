import { computed } from 'vue';
import { useRoute } from 'vue-router';

export function useRouteId(title: string, isQuery?: boolean) {
  const route = useRoute();

  const id = computed(() => {
    const value = isQuery ? route.query[title]?.toString() : route.params[title].toString();

    return value || '';
  });

  return { id };
}
