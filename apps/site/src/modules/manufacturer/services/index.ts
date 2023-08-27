import { Ref, ComputedRef } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import { IPageQuery } from 'mhz-helpers';
import { IManufacturer } from 'mhz-types';

import { api } from '@/common/services/api';
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

export function getManufacturer(id: ComputedRef<string>) {
  async function fn(): Promise<IManufacturer> {
    const { data } = await api.get(`${API_MANUFACTURER}/${id.value}`);

    return data;
  }

  return useQuery({ queryKey: [API_MANUFACTURER, id], queryFn: fn });
}
