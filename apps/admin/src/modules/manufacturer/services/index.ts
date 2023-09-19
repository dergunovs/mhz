import { ComputedRef, Ref } from 'vue';

import { api, useMutation, useQuery, IPageQuery, convertParams } from 'mhz-helpers';
import { API_MANUFACTURER, IBaseReply, IManufacturer } from 'mhz-contracts';

export function getManufacturers(query: Ref<IPageQuery | number>) {
  async function fn() {
    const params = convertParams(query);

    const { data } = await api.get<{ data: IManufacturer[]; total: number }>(API_MANUFACTURER, { params });

    return data;
  }

  return useQuery({ queryKey: [API_MANUFACTURER, query], queryFn: fn });
}

export function getManufacturer(id?: ComputedRef<string | string[]>) {
  async function fn() {
    if (!id?.value) return null;

    const { data } = await api.get<IManufacturer>(`${API_MANUFACTURER}/${id.value}`);

    return data;
  }

  return useQuery({ queryKey: [API_MANUFACTURER, id], queryFn: fn, refetchOnMount: true });
}

export function postManufacturer(options: object) {
  async function fn(formData: IManufacturer) {
    const { data } = await api.post<IBaseReply>(API_MANUFACTURER, formData);

    return data;
  }

  return useMutation({ mutationKey: [API_MANUFACTURER], mutationFn: fn, ...options });
}

export function updateManufacturer(options: object) {
  async function fn(formData: IManufacturer) {
    const { data } = await api.patch<IBaseReply>(`${API_MANUFACTURER}/${formData._id}`, formData);

    return data;
  }

  return useMutation({ mutationKey: [API_MANUFACTURER], mutationFn: fn, ...options });
}

export function deleteManufacturer(options: object) {
  async function fn(id?: string) {
    if (!id) return null;

    const { data } = await api.delete<IBaseReply>(`${API_MANUFACTURER}/${id}`);

    return data;
  }

  return useMutation({ mutationKey: [API_MANUFACTURER], mutationFn: fn, ...options });
}
