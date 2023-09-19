import { ComputedRef } from 'vue';

import { api, useQuery, useMutation } from 'mhz-helpers';
import { API_CATEGORY, ICategory } from 'mhz-contracts';

export function getCategories() {
  async function fn(): Promise<ICategory[]> {
    const { data } = await api.get(API_CATEGORY);

    return data;
  }

  return useQuery({ queryKey: [API_CATEGORY], queryFn: fn });
}

export function getCategory(id?: ComputedRef<string | string[]>) {
  async function fn(): Promise<ICategory | null> {
    if (!id?.value) return null;

    const { data } = await api.get(`${API_CATEGORY}/${id.value}`);

    return data;
  }

  return useQuery({ queryKey: [API_CATEGORY, id], queryFn: fn, refetchOnMount: true });
}

export function postCategory(options: object) {
  async function fn(formData: ICategory) {
    await api.post(API_CATEGORY, formData);
  }

  return useMutation({ mutationKey: [API_CATEGORY], mutationFn: fn, ...options });
}

export function updateCategory(id: ComputedRef<string | undefined>, options: object) {
  async function fn(formData: ICategory) {
    await api.patch(`${API_CATEGORY}/${id.value}`, formData);
  }

  return useMutation({ mutationKey: [API_CATEGORY, id], mutationFn: fn, ...options });
}

export function deleteCategory(options: object) {
  async function fn(id?: string) {
    await api.delete(`${API_CATEGORY}/${id}`);
  }

  return useMutation({ mutationKey: [API_CATEGORY], mutationFn: fn, ...options });
}
