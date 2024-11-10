import { computed, Ref } from 'vue';

export function usePagination<T>(dataRaw: Ref<{ data: T[]; total: number } | undefined>) {
  const data = computed(() => dataRaw.value?.data);
  const total = computed(() => dataRaw.value?.total);

  function setPaginationPage(pageToSet: number, page: number) {
    if (!total.value) return page;
    if (pageToSet === 0 || pageToSet === total.value + 1) return page;

    return pageToSet;
  }

  return { data, total, setPaginationPage };
}
