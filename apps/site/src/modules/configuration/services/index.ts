import { Ref } from 'vue';

import { IConfiguration } from 'mhz-types';
import { IPageQuery, api, useMutation, useQuery } from 'mhz-helpers';
import { API_CONFIGURATION } from 'mhz-contracts';

export function getConfigurations(query: Ref<IPageQuery | number>) {
  async function fn(): Promise<{ data: IConfiguration[]; total: number }> {
    const params = typeof query.value === 'number' ? { page: query.value } : { page: query.value.page || 1 };

    const { data } = await api.get(API_CONFIGURATION, { params });

    return data;
  }

  return useQuery({ queryKey: [API_CONFIGURATION, query], queryFn: fn });
}

export function getConfiguration(id?: string | string[]) {
  async function fn(): Promise<{ configuration: IConfiguration; isEditable: boolean } | null> {
    if (!id) return null;

    const { data } = await api.get(`${API_CONFIGURATION}/${id}`);

    return data;
  }

  return useQuery({ queryKey: [API_CONFIGURATION, id], queryFn: fn, refetchOnMount: true });
}

export function updateConfiguration(options: object, id?: string) {
  async function fn(formData: IConfiguration) {
    if (!id) return null;

    await api.patch(`${API_CONFIGURATION}/${id}`, formData);
  }

  return useMutation({ mutationKey: [API_CONFIGURATION, id], mutationFn: fn, ...options });
}

export function deleteConfiguration(options: object, id?: string) {
  async function fn() {
    await api.delete(`${API_CONFIGURATION}/${id}`);
  }

  return useMutation({ mutationKey: [API_CONFIGURATION], mutationFn: fn, ...options });
}

export function postConfiguration(options: object) {
  async function fn(formData: IConfiguration) {
    await api.post(API_CONFIGURATION, formData);
  }

  return useMutation({ mutationKey: [API_CONFIGURATION], mutationFn: fn, ...options });
}
