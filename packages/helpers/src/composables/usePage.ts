import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export function usePage(url: string) {
  const page = ref(1);

  const router = useRouter();
  const route = useRoute();

  watch(
    () => page.value,
    () => {
      router.push(`${url}?page=${page.value}`);
    }
  );

  page.value = Number(route.query.page || page.value);

  return { page };
}
