import { ComputedRef } from 'vue';

import { API_CATEGORY, TBaseReply, TCategory } from 'mhz-contracts';
import { api, useQuery, useMutation } from 'mhz-helpers';

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

export function postCategory(options: object) {
  async function fn(formData: TCategory) {
    const { data } = await api.post<TBaseReply>(API_CATEGORY, formData);

    return data;
  }

  return useMutation({ mutationKey: [API_CATEGORY], mutationFn: fn, ...options });
}

export function updateCategory(options: object, id?: ComputedRef<string | undefined>) {
  async function fn(formData: TCategory) {
    if (!id?.value) return null;

    const { data } = await api.patch<TBaseReply>(`${API_CATEGORY}/${id.value}`, formData);

    return data;
  }

  return useMutation({ mutationKey: [API_CATEGORY, id], mutationFn: fn, ...options });
}

export function deleteCategory(options: object) {
  async function fn(id?: string) {
    if (!id) return null;

    const { data } = await api.delete<TBaseReply>(`${API_CATEGORY}/${id}`);

    return data;
  }

  return useMutation({ mutationKey: [API_CATEGORY], mutationFn: fn, ...options });
}
