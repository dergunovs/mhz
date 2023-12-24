import { Ref, ComputedRef } from 'vue';

import { api, useQuery, IPageQuery, convertParams } from 'mhz-helpers';
import { API_MANUFACTURER, API_MANUFACTURER_POPULAR, IManufacturer } from 'mhz-contracts';

export function getManufacturers(query: Ref<IPageQuery | number>) {
  async function fn() {
    const params = convertParams(query);

    const { data } = await api.get<{ data: IManufacturer[]; total: number }>(API_MANUFACTURER, { params });

    return data;
  }

  return useQuery({ queryKey: [API_MANUFACTURER, query], queryFn: fn });
}

export function getManufacturersPopular() {
  async function fn() {
    const { data } = await api.get<IManufacturer[]>(API_MANUFACTURER_POPULAR);

    return data;
  }

  return useQuery({ queryKey: [API_MANUFACTURER_POPULAR], queryFn: fn });
}

export function getManufacturer(id?: ComputedRef<string | string[]>) {
  async function fn() {
    if (!id?.value) return null;

    const { data } = await api.get<{ data: IManufacturer }>(`${API_MANUFACTURER}/${id.value}`);

    return data.data;
  }

  return useQuery({ queryKey: [API_MANUFACTURER, id], queryFn: fn });
}
