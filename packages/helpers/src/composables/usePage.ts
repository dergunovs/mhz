import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export function usePage(url: string, sortValue: string) {
  const page = ref(1);
  const sort = ref({ value: sortValue, isAsc: true });

  const router = useRouter();
  const route = useRoute();

  page.value = Number(route.query.page || page.value);

  sort.value = {
    value: route.query.sort?.toString() || sort.value.value,
    isAsc: route.query.dir === 'asc' || sort.value.isAsc,
  };

  watch(
    () => [page.value, sort.value],
    (val, newVal) => {
      if (val[1] !== newVal[1] && page.value !== 1) {
        page.value = 1;
      } else {
        router.push(`${url}?page=${page.value}&sort=${sort?.value.value}&dir=${sort?.value.isAsc ? 'asc' : 'desc'}`);
      }
    }
  );

  return { page, sort };
}
