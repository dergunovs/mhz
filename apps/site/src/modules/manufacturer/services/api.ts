import { ComputedRef, Ref } from 'vue';

import { api, IPageQuery, convertParams } from 'mhz-helpers';
import { API_MANUFACTURER, API_MANUFACTURER_POPULAR, IManufacturer } from 'mhz-contracts';

export async function getManufacturersApi(query: Ref<IPageQuery | number>) {
  const params = convertParams(query);

  const { data } = await api.get<{ data: IManufacturer[]; total: number }>(API_MANUFACTURER, { params });

  return data;
}

export async function getManufacturersPopularApi() {
  const { data } = await api.get<IManufacturer[]>(API_MANUFACTURER_POPULAR);

  return data;
}

export async function getManufacturerApi(id?: ComputedRef<string | string[]>) {
  if (!id?.value) return null;

  const { data } = await api.get<{ data: IManufacturer }>(`${API_MANUFACTURER}/${id.value}`);

  return data.data;
}
