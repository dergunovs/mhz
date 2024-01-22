import { ComputedRef } from 'vue';

import { useQuery, useMutation } from 'mhz-helpers';
import { API_CATEGORY } from 'mhz-contracts';

import {
  deleteCategoryApi,
  getCategoriesApi,
  getCategoryApi,
  postCategoryApi,
  updateCategoryApi,
} from '@/category/services/api';

export function getCategories(options?: object) {
  return useQuery({ queryKey: [API_CATEGORY], queryFn: getCategoriesApi, ...options });
}

export function getCategory(id?: ComputedRef<string | string[]>) {
  return useQuery({ queryKey: [API_CATEGORY, id], queryFn: () => getCategoryApi(id) });
}

export function postCategory(options: object) {
  return useMutation({ mutationKey: [API_CATEGORY], mutationFn: postCategoryApi, ...options });
}

export function updateCategory(options: object) {
  return useMutation({ mutationKey: [API_CATEGORY], mutationFn: updateCategoryApi, ...options });
}

export function deleteCategory(options: object) {
  return useMutation({ mutationKey: [API_CATEGORY], mutationFn: deleteCategoryApi, ...options });
}
