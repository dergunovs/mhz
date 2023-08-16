import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export interface ISortOption {
  value: string;
  isAsc: boolean;
}

export interface IPageQuery {
  page: number;
  sort: ISortOption;
}

export function usePage(url: string, sortValue: string) {
  const router = useRouter();
  const route = useRoute();

  const query = ref<IPageQuery>({
    page: Number(route.query.page || 1),
    sort: {
      value: route.query.sort?.toString() || sortValue,
      isAsc: route.query.dir !== 'desc',
    },
  });

  function resetQuery(value: string) {
    query.value = Object.assign(query.value, { page: 1, sort: { value, isAsc: true } });
  }

  function setQueryPage(pageToSet: number) {
    query.value.page = pageToSet;
  }

  watch(
    () => query.value,
    () => {
      router.push(
        `${url}?page=${query.value.page}&sort=${query.value.sort.value}&dir=${query.value.sort.isAsc ? 'asc' : 'desc'}`
      );
    },
    { deep: true }
  );

  return { query, resetQuery, setQueryPage };
}
