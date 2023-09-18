import { ComputedRef } from 'vue';

import { API_CATEGORY, TCategory } from 'mhz-contracts';
import { api, useQuery } from 'mhz-helpers';

export function getCategories(options?: object) {
  async function fn() {
    const { data } = await api.get<TCategory[]>(API_CATEGORY);

    return data;
  }

  return useQuery({ queryKey: [API_CATEGORY], queryFn: fn, ...options });
}

export function getCategory(id?: ComputedRef<string | string[]>) {
  async function fn() {
    if (!id?.value) return null;

    const { data } = await api.get<TCategory>(`${API_CATEGORY}/${id.value.toString()}`);

    return data;
  }

  return useQuery({ queryKey: [API_CATEGORY, id], queryFn: fn, refetchOnMount: true });
}
