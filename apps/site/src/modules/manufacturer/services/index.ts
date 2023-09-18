import { Ref, ComputedRef } from 'vue';

import { IManufacturer } from 'mhz-types';
import { api, useQuery, IPageQuery } from 'mhz-helpers';

import { API_MANUFACTURER } from '@/manufacturer/constants';

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
