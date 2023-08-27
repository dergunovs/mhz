import { Ref } from 'vue';

import { useQuery, useMutation } from '@tanstack/vue-query';

import { ISearchResults, IEntitiesCount } from '@/common/interface';
import { API_UPLOAD, API_UPLOAD_SINGLE, API_SEARCH, API_COUNT } from '@/common/constants';
import { api } from '@/common/services/api';

export function search(query: Ref<string>, options: object) {
  async function fn(): Promise<ISearchResults> {
    const { data } = await api.get(API_SEARCH, { params: { search: query.value } });

    return data;
  }

  return useQuery({ queryKey: [API_SEARCH, query], queryFn: fn, ...options });
}

export function getEntitiesCount() {
  async function fn(): Promise<IEntitiesCount> {
    const { data } = await api.get(API_COUNT);

    return data;
  }

  return useQuery({ queryKey: [API_COUNT], queryFn: fn });
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

export function uploadFiles(options: object, width?: string) {
  async function fn(files: File[]): Promise<string[]> {
    const formData = new FormData();

    files.forEach((file) => formData.append('files', file));

    const { data } = await api.post(API_UPLOAD, formData, { params: { width } });

    return data;
  }

  return useMutation({ mutationKey: [API_UPLOAD], mutationFn: fn, ...options });
}

export function deleteFile(options?: object) {
  async function fn(filename: string) {
    await api.delete(`${API_UPLOAD}/${filename}`);

    return true;
  }

  return useMutation({ mutationKey: [API_UPLOAD], mutationFn: fn, ...options });
}
