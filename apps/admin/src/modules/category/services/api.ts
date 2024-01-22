import { ComputedRef } from 'vue';

import { api } from 'mhz-helpers';
import { API_CATEGORY, ICategory, IBaseReply } from 'mhz-contracts';

export async function getCategoriesApi() {
  const { data } = await api.get<{ data: ICategory[] }>(API_CATEGORY);

  return data.data;
}

export async function getCategoryApi(id?: ComputedRef<string | string[]>) {
  if (!id?.value) return null;

  const { data } = await api.get<{ data: ICategory }>(`${API_CATEGORY}/${id.value}`);

  return data.data;
}

export async function postCategoryApi(formData: ICategory) {
  const { data } = await api.post<IBaseReply>(API_CATEGORY, formData);

  return data;
}

export async function updateCategoryApi(formData: ICategory) {
  const { data } = await api.patch<IBaseReply>(`${API_CATEGORY}/${formData._id}`, formData);

  return data;
}

export async function deleteCategoryApi(id?: string) {
  if (!id) return null;

  const { data } = await api.delete<IBaseReply>(`${API_CATEGORY}/${id}`);

  return data;
}
