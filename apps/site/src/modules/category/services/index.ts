import { ComputedRef } from 'vue';

import { api, useQuery } from 'mhz-helpers';
import { API_CATEGORY, API_CATEGORY_POPULAR, ICategory } from 'mhz-contracts';

export function getCategories(options?: object) {
  async function fn() {
    const { data } = await api.get<{ data: ICategory[] }>(API_CATEGORY);

    return data.data;
  }

  return useQuery({ queryKey: [API_CATEGORY], queryFn: fn, ...options });
}

export function getCategoriesPopular() {
  async function fn() {
    const { data } = await api.get<ICategory[]>(API_CATEGORY_POPULAR);

    return data;
  }

  return useQuery({ queryKey: [API_CATEGORY_POPULAR], queryFn: fn });
}

export function getCategory(id?: ComputedRef<string | string[]>) {
  async function fn() {
    if (!id?.value) return null;

    const { data } = await api.get<{ data: ICategory }>(`${API_CATEGORY}/${id.value}`);

    return data.data;
  }

  return useQuery({ queryKey: [API_CATEGORY, id], queryFn: fn });
}
