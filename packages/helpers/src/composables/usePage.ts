import { ref, watch, Ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export interface ISortOption {
  value?: string;
  isAsc: boolean;
}

export interface IPageQuery {
  page: number;
  sort: ISortOption;
  filter: object;
}

export function convertParams(params: Ref<IPageQuery | number>, initiator?: string) {
  return typeof params.value === 'number'
    ? { page: params.value }
    : {
        initiator,
        page: params.value.page || 1,
        sort: params.value.sort.value,
        dir: params.value.sort.isAsc === false ? 'desc' : 'asc',
        ...params.value.filter,
      };
}

export function usePage(filter?: object) {
  const router = useRouter();
  const route = useRoute();

  const query = ref<IPageQuery>({
    page: Number(route.query.page || 1),
    sort: {
      value: route.query.sort?.toString(),
      isAsc: route.query.dir !== 'desc',
    },
    filter: { ...filter },
  });

  function resetQuery(value: string | ISortOption) {
    query.value =
      typeof value === 'string'
        ? Object.assign(query.value, { page: 1, sort: { value, isAsc: true }, filter: {} })
        : { ...query.value, page: 1, sort: value };
  }

  function setQueryPage(pageToSet: number) {
    query.value.page = pageToSet;
  }

  function setQueryFilter(filterToSet?: object) {
    query.value = {
      filter: { ...filterToSet },
      page: 1,
      sort: query.value.sort,
    };
  }

  watch(
    () => [query.value.page, query.value.sort.value, query.value.sort.isAsc],
    () => {
      router.push({
        path: route.path,
        query: {
          page: query.value.page,
          sort: query.value.sort.value,
          dir: query.value.sort.isAsc ? 'asc' : 'desc',
        },
      });
    }
  );

  return { query, resetQuery, setQueryPage, setQueryFilter };
}

export function usePageNumber() {
  const router = useRouter();
  const route = useRoute();

  const page = ref(Number(route.query.page || 1));

  function resetPage() {
    page.value = 1;
  }

  function setPage(pageToSet: number) {
    page.value = pageToSet;
  }

  watch(
    () => page.value,
    () => {
      router.push({ path: route.path, query: { page: page.value } });
    }
  );

  return { page, resetPage, setPage };
}
