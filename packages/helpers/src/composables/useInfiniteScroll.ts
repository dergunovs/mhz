import { ref, Ref } from 'vue';

export function useInfiniteScroll<T>() {
  const page = ref(1);
  const allData = ref<T[]>([]) as Ref<T[]>;

  function addData(data: T[]) {
    allData.value = [...allData.value, ...data];
  }

  function handleScroll(isLoading: boolean, pageToSet: number) {
    if (!isLoading) page.value = pageToSet;
  }

  return { page, allData, addData, handleScroll };
}
