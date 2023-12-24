import { ComputedRef } from 'vue';

import { api, useQuery, useMutation } from 'mhz-helpers';
import { API_CATEGORY, ICategory, IBaseReply } from 'mhz-contracts';

export function getCategories(options?: object) {
  async function fn() {
    const { data } = await api.get<{ data: ICategory[] }>(API_CATEGORY);

    return data.data;
  }

  return useQuery({ queryKey: [API_CATEGORY], queryFn: fn, ...options });
}

export function getCategory(id?: ComputedRef<string | string[]>) {
  async function fn() {
    if (!id?.value) return null;

    const { data } = await api.get<{ data: ICategory }>(`${API_CATEGORY}/${id.value}`);

    return data.data;
  }

  return useQuery({ queryKey: [API_CATEGORY, id], queryFn: fn });
}

export function postCategory(options: object) {
  async function fn(formData: ICategory) {
    const { data } = await api.post<IBaseReply>(API_CATEGORY, formData);

    return data;
  }

  return useMutation({ mutationKey: [API_CATEGORY], mutationFn: fn, ...options });
}

export function updateCategory(options: object) {
  async function fn(formData: ICategory) {
    const { data } = await api.patch<IBaseReply>(`${API_CATEGORY}/${formData._id}`, formData);

    return data;
  }

  return useMutation({ mutationKey: [API_CATEGORY], mutationFn: fn, ...options });
}

export function deleteCategory(options: object) {
  async function fn(id?: string) {
    if (!id) return null;

    const { data } = await api.delete<IBaseReply>(`${API_CATEGORY}/${id}`);

    return data;
  }

  return useMutation({ mutationKey: [API_CATEGORY], mutationFn: fn, ...options });
}
