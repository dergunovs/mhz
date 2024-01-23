import { Ref } from 'vue';

import { IPageQuery, api, convertParams } from 'mhz-helpers';
import { API_CONFIGURATION, IBaseReply, IConfiguration } from 'mhz-contracts';

export async function getConfigurationsApi(query: Ref<IPageQuery | number>) {
  const params = convertParams(query);

  const { data } = await api.get<{ data: IConfiguration[]; total: number }>(API_CONFIGURATION, { params });

  return data;
}

export async function getConfigurationApi(id?: string | string[]) {
  if (!id) return null;

  const { data } = await api.get<{ data: IConfiguration; isConfigurationEditable: boolean }>(
    `${API_CONFIGURATION}/${id}`
  );

  return data;
}

export async function updateConfigurationApi(formData: IConfiguration) {
  const { data } = await api.patch<IBaseReply>(`${API_CONFIGURATION}/${formData._id}`, formData);

  return data;
}

export async function postConfigurationApi(formData: IConfiguration) {
  const { data } = await api.post<IBaseReply>(API_CONFIGURATION, formData);

  return data;
}

export async function deleteConfigurationApi(id?: string) {
  if (!id) return null;

  const { data } = await api.delete<IBaseReply>(`${API_CONFIGURATION}/${id}`);

  return data;
}
