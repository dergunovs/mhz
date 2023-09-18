import { Ref } from 'vue';

import { api, useQuery, useMutation } from 'mhz-helpers';
import { ISearchResults, IEntitiesCount } from 'mhz-types';
import { API_UPLOAD, API_UPLOAD_SINGLE, API_SEARCH, API_STATS_COUNT } from 'mhz-contracts';

export function search(query: Ref<string>, isAdmin?: boolean) {
  async function fn(): Promise<ISearchResults> {
    const { data } = await api.get(API_SEARCH, { params: { search: query.value, isAdmin } });

    return data;
  }

  return useQuery({ queryKey: [API_SEARCH, query], queryFn: fn, enabled: false });
}

export function getEntitiesCount() {
  async function fn(): Promise<IEntitiesCount> {
    const { data } = await api.get(API_STATS_COUNT);

    return data;
  }

  return useQuery({ queryKey: [API_STATS_COUNT], queryFn: fn });
}

export function uploadFile(options: object, width?: string) {
  async function fn(file?: File): Promise<string> {
    if (!file) throw new Error();

    const formData = new FormData();

    formData.append('file', file);

    const { data } = await api.post(API_UPLOAD_SINGLE, formData, { params: { width } });

    return data;
  }

  return useMutation({ mutationKey: [API_UPLOAD], mutationFn: fn, ...options });
}

export function uploadFiles(options: object, width?: string, thumb?: boolean) {
  async function fn(files: File[]): Promise<string[]> {
    const formData = new FormData();

    files.forEach((file) => formData.append('files', file));

    const { data } = await api.post(API_UPLOAD, formData, { params: { width, thumb } });

    return data;
  }

  return useMutation({ mutationKey: [API_UPLOAD], mutationFn: fn, ...options });
}

export function deleteFile(thumb?: boolean) {
  async function fn(filename: string) {
    await api.delete(`${API_UPLOAD}/${filename}`, { params: { thumb } });

    return true;
  }

  return useMutation({ mutationKey: [API_UPLOAD], mutationFn: fn });
}
