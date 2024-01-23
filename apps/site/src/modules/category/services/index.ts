import { ComputedRef } from 'vue';

import { useQuery } from 'mhz-helpers';
import { API_CATEGORY, API_CATEGORY_POPULAR } from 'mhz-contracts';

import { getCategoriesApi, getCategoriesPopularApi, getCategoryApi } from '@/category/services/api';

export function getCategories(options?: object) {
  return useQuery({ queryKey: [API_CATEGORY], queryFn: getCategoriesApi, ...options });
}

export function getCategoriesPopular() {
  return useQuery({ queryKey: [API_CATEGORY_POPULAR], queryFn: getCategoriesPopularApi });
}

export function getCategory(id?: ComputedRef<string | string[]>) {
  return useQuery({ queryKey: [API_CATEGORY, id], queryFn: () => getCategoryApi(id) });
}
