import { ComputedRef } from 'vue';

import { api } from 'mhz-helpers';
import { API_CATEGORY, API_CATEGORY_POPULAR, ICategory } from 'mhz-contracts';

export async function getCategoriesApi() {
  const { data } = await api.get<{ data: ICategory[] }>(API_CATEGORY);

  return data.data;
}

export async function getCategoriesPopularApi() {
  const { data } = await api.get<ICategory[]>(API_CATEGORY_POPULAR);

  return data;
}

export async function getCategoryApi(id?: ComputedRef<string | string[]>) {
  if (!id?.value) return null;

  const { data } = await api.get<{ data: ICategory }>(`${API_CATEGORY}/${id.value}`);

  return data.data;
}
