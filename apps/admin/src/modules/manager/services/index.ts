import { ComputedRef, Ref } from 'vue';
import { useMutation, useQuery } from '@tanstack/vue-query';

import { IManager } from 'mhz-types';

import { API_MANAGER } from '@/manager/constants';
import { api } from '@/common/services/api';

export function getManagers(page: Ref<number>) {
  async function fn(): Promise<{ data: IManager[]; total: number }> {
    const { data } = await api.get(API_MANAGER, { params: { page: page.value || 1 } });

    return data;
  }

  return useQuery({
    queryKey: [API_MANAGER, page],
    queryFn: fn,
  });
}

export function getManager(id: ComputedRef<string>) {
  async function fn(): Promise<IManager> {
    const { data } = await api.get(`${API_MANAGER}/${id.value}`);

    return data;
  }

  return useQuery({
    queryKey: [API_MANAGER, id],
    queryFn: fn,
  });
}

export function postManager(options: object) {
  async function fn(formData: IManager) {
    await api.post(API_MANAGER, formData);
  }

  return useMutation({
    mutationKey: [API_MANAGER],
    mutationFn: fn,
    ...options,
  });
}

export function updateManager(id: ComputedRef<string | undefined>, options: object) {
  async function fn(formData: IManager) {
    await api.patch(`${API_MANAGER}/${id.value}`, formData);
  }

  return useMutation({
    mutationKey: [API_MANAGER, id],
    mutationFn: fn,
    ...options,
  });
}

export function deleteManager(options: object) {
  async function fn(id?: string) {
    await api.delete(`${API_MANAGER}/${id}`);
  }

  return useMutation({
    mutationKey: [API_MANAGER],
    mutationFn: fn,
    ...options,
  });
}
