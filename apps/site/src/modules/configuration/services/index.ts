import { Ref } from 'vue';

import { IPageQuery, api, convertParams, useMutation, useQuery } from 'mhz-helpers';
import { API_CONFIGURATION, IBaseReply, IConfiguration } from 'mhz-contracts';

export function getConfigurations(query: Ref<IPageQuery | number>) {
  async function fn() {
    const params = convertParams(query);

    const { data } = await api.get<{ data: IConfiguration[]; total: number }>(API_CONFIGURATION, { params });

    return data;
  }

  return useQuery({ queryKey: [API_CONFIGURATION, query], queryFn: fn });
}

export function getConfiguration(id?: string | string[]) {
  async function fn() {
    if (!id) return null;

    const { data } = await api.get<{ data: IConfiguration; isConfigurationEditable: boolean }>(
      `${API_CONFIGURATION}/${id}`
    );

    return data;
  }

  return useQuery({ queryKey: [API_CONFIGURATION, id], queryFn: fn });
}

export function updateConfiguration(options: object) {
  async function fn(formData: IConfiguration) {
    const { data } = await api.patch<IBaseReply>(`${API_CONFIGURATION}/${formData._id}`, formData);

    return data;
  }

  return useMutation({ mutationKey: [API_CONFIGURATION], mutationFn: fn, ...options });
}

export function postConfiguration(options: object) {
  async function fn(formData: IConfiguration) {
    const { data } = await api.post<IBaseReply>(API_CONFIGURATION, formData);

    return data;
  }

  return useMutation({ mutationKey: [API_CONFIGURATION], mutationFn: fn, ...options });
}

export function deleteConfiguration(options: object, id?: string) {
  async function fn() {
    if (!id) return null;

    const { data } = await api.delete<IBaseReply>(`${API_CONFIGURATION}/${id}`);

    return data;
  }

  return useMutation({ mutationKey: [API_CONFIGURATION], mutationFn: fn, ...options });
}
