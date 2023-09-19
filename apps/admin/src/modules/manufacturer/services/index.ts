import { ComputedRef, Ref } from 'vue';

import { api, useMutation, useQuery, IPageQuery } from 'mhz-helpers';
import { API_MANUFACTURER, IManufacturer } from 'mhz-contracts';

export function getManufacturers(query: Ref<IPageQuery | number>) {
  async function fn(): Promise<{ data: IManufacturer[]; total: number }> {
    const params =
      typeof query.value === 'number'
        ? { page: query.value }
        : {
            page: query.value.page || 1,
            sort: query.value.sort.value,
            dir: query.value.sort.isAsc === false ? 'desc' : 'asc',
          };

    const { data } = await api.get(API_MANUFACTURER, { params });

    return data;
  }

  return useQuery({ queryKey: [API_MANUFACTURER, query], queryFn: fn });
}

export function getManufacturer(id?: ComputedRef<string | string[]>) {
  async function fn(): Promise<IManufacturer | null> {
    if (!id?.value) return null;

    const { data } = await api.get(`${API_MANUFACTURER}/${id.value}`);

    return data;
  }

  return useQuery({ queryKey: [API_MANUFACTURER, id], queryFn: fn, refetchOnMount: true });
}

export function postManufacturer(options: object) {
  async function fn(formData: IManufacturer) {
    await api.post(API_MANUFACTURER, formData);
  }

  return useMutation({ mutationKey: [API_MANUFACTURER], mutationFn: fn, ...options });
}

export function updateManufacturer(id: ComputedRef<string | undefined>, options: object) {
  async function fn(formData: IManufacturer) {
    await api.patch(`${API_MANUFACTURER}/${id.value}`, formData);
  }

  return useMutation({ mutationKey: [API_MANUFACTURER], mutationFn: fn, ...options });
}

export function deleteManufacturer(options: object) {
  async function fn(id?: string) {
    await api.delete(`${API_MANUFACTURER}/${id}`);
  }

  return useMutation({ mutationKey: [API_MANUFACTURER], mutationFn: fn, ...options });
}
