import { ComputedRef, Ref } from 'vue';

import { api, IPageQuery, convertParams } from 'mhz-helpers';
import { API_MANUFACTURER, IBaseReply, IManufacturer } from 'mhz-contracts';

export async function getManufacturersApi(query: Ref<IPageQuery | number>) {
  const params = convertParams(query);

  const { data } = await api.get<{ data: IManufacturer[]; total: number }>(API_MANUFACTURER, { params });

  return data;
}

export async function getManufacturerApi(id?: ComputedRef<string | string[]>) {
  if (!id?.value) return null;

  const { data } = await api.get<{ data: IManufacturer }>(`${API_MANUFACTURER}/${id.value}`);

  return data.data;
}

export async function postManufacturerApi(formData: IManufacturer) {
  const { data } = await api.post<IBaseReply>(API_MANUFACTURER, formData);

  return data;
}

export async function updateManufacturerApi(formData: IManufacturer) {
  const { data } = await api.patch<IBaseReply>(`${API_MANUFACTURER}/${formData._id}`, formData);

  return data;
}

export async function deleteManufacturerApi(id?: string) {
  if (!id) return null;

  const { data } = await api.delete<IBaseReply>(`${API_MANUFACTURER}/${id}`);

  return data;
}
