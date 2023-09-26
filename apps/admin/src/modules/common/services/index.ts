import { Ref } from 'vue';

import { api, useQuery, useMutation } from 'mhz-helpers';
import {
  API_UPLOAD,
  API_UPLOAD_SINGLE,
  API_SEARCH,
  API_STATS_COUNT,
  ISearchResults,
  IEntitiesCount,
  IBaseReply,
  API_UPLOAD_MULTIPLE,
} from 'mhz-contracts';

export function search(query: Ref<string>) {
  async function fn() {
    const { data } = await api.get<ISearchResults>(API_SEARCH, { params: { search: query.value } });

    return data as unknown as { [key: string]: { _id: string }[] };
  }

  return useQuery({ queryKey: [API_SEARCH, query], queryFn: fn, enabled: false });
}

export function getEntitiesCount() {
  async function fn() {
    const { data } = await api.get<IEntitiesCount>(API_STATS_COUNT);

    return data;
  }

  return useQuery({ queryKey: [API_STATS_COUNT], queryFn: fn });
}

export function uploadFile(options: object, width?: string) {
  async function fn(file?: File) {
    if (!file) throw new Error();

    const formData = new FormData();

    formData.append('file', file);

    const { data } = await api.post<string>(API_UPLOAD_SINGLE, formData, { params: { width } });

    return data;
  }

  return useMutation({ mutationKey: [API_UPLOAD], mutationFn: fn, ...options });
}

export function uploadFiles(options: object, width?: string, thumb?: boolean) {
  async function fn(files: File[]) {
    const formData = new FormData();

    files.forEach((file) => formData.append('files', file));

    const { data } = await api.post<string[]>(API_UPLOAD_MULTIPLE, formData, { params: { width, thumb } });

    return data;
  }

  return useMutation({ mutationKey: [API_UPLOAD_MULTIPLE], mutationFn: fn, ...options });
}

export function deleteFile(thumb?: boolean) {
  async function fn(filename: string) {
    const { data } = await api.delete<IBaseReply>(`${API_UPLOAD}/${filename}`, { params: { thumb } });

    return data;
  }

  return useMutation({ mutationKey: [API_UPLOAD], mutationFn: fn });
}
