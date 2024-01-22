import { ComputedRef, Ref } from 'vue';

import { api, IPageQuery, convertParams } from 'mhz-helpers';
import { API_MANAGER, IBaseReply, IManager } from 'mhz-contracts';

export async function getManagersApi(query: Ref<IPageQuery | number>) {
  const params = convertParams(query);

  const { data } = await api.get<{ data: IManager[]; total: number }>(API_MANAGER, { params });

  return data;
}

export async function getManagerApi(id?: ComputedRef<string | string[]>) {
  if (!id?.value) return null;

  const { data } = await api.get<{ data: IManager }>(`${API_MANAGER}/${id.value}`);

  return data.data;
}

export async function postManagerApi(formData: IManager) {
  const { data } = await api.post<IBaseReply>(API_MANAGER, formData);

  return data;
}

export async function updateManagerApi(formData: IManager) {
  const { data } = await api.patch<IBaseReply>(`${API_MANAGER}/${formData._id}`, formData);

  return data;
}

export async function deleteManagerApi(id?: string) {
  if (!id) return null;

  const { data } = await api.delete<IBaseReply>(`${API_MANAGER}/${id}`);

  return data;
}
