import { ComputedRef } from 'vue';

import { api, useQuery } from 'mhz-helpers';
import { API_CATEGORY, ICategory } from 'mhz-contracts';

export function getCategories(options?: object) {
  async function fn(): Promise<ICategory[]> {
    const { data } = await api.get(API_CATEGORY);

    return data;
  }

  return useQuery({ queryKey: [API_CATEGORY], queryFn: fn, ...options });
}

export function getCategory(id?: ComputedRef<string | string[]>) {
  async function fn(): Promise<ICategory | null> {
    if (!id?.value) return null;

    const { data } = await api.get(`${API_CATEGORY}/${id.value}`);

    return data;
  }

  return useQuery({ queryKey: [API_CATEGORY, id], queryFn: fn, refetchOnMount: true });
}
