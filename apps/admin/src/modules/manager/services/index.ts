import { ComputedRef, Ref } from 'vue';

import { api, useMutation, useQuery, IPageQuery, convertParams } from 'mhz-helpers';
import { API_MANAGER, IBaseReply, IManager } from 'mhz-contracts';

export function getManagers(query: Ref<IPageQuery | number>) {
  async function fn() {
    const params = convertParams(query);

    const { data } = await api.get<{ data: IManager[]; total: number }>(API_MANAGER, { params });

    return data;
  }

  return useQuery({ queryKey: [API_MANAGER, query], queryFn: fn });
}

export function getManager(id?: ComputedRef<string | string[]>) {
  async function fn() {
    if (!id?.value) return null;

    const { data } = await api.get<IManager>(`${API_MANAGER}/${id.value}`);

    return data;
  }

  return useQuery({ queryKey: [API_MANAGER, id], queryFn: fn, refetchOnMount: true });
}

export function postManager(options: object) {
  async function fn(formData: IManager) {
    const { data } = await api.post<IBaseReply>(API_MANAGER, formData);

    return data;
  }

  return useMutation({ mutationKey: [API_MANAGER], mutationFn: fn, ...options });
}

export function updateManager(options: object) {
  async function fn(formData: IManager) {
    const { data } = await api.patch<IBaseReply>(`${API_MANAGER}/${formData._id}`, formData);

    return data;
  }

  return useMutation({ mutationKey: [API_MANAGER], mutationFn: fn, ...options });
}

export function deleteManager(options: object) {
  async function fn(id?: string) {
    if (!id) return null;

    const { data } = await api.delete<IBaseReply>(`${API_MANAGER}/${id}`);

    return data;
  }

  return useMutation({ mutationKey: [API_MANAGER], mutationFn: fn, ...options });
}
