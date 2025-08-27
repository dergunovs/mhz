import { Ref } from 'vue';

import { api } from 'mhz-helpers';
import {
  API_UPLOAD,
  API_UPLOAD_SINGLE,
  API_SEARCH,
  API_STATS_COUNT,
  API_UPLOAD_MULTIPLE,
  ISearchResults,
  IBaseReply,
  IEntitiesReply,
} from 'mhz-contracts';

export async function searchApi(query: Ref<string>) {
  const { data } = await api.get<ISearchResults>(API_SEARCH, { params: { search: query.value } });

  return data as unknown as { [key: string]: { _id: string }[] };
}

export async function getEntitiesCountApi() {
  const { data } = await api.get<IEntitiesReply>(API_STATS_COUNT);

  return data;
}

export async function uploadFileApi(file?: File) {
  if (!file) throw new Error('Error uploading file');

  const formData = new FormData();

  formData.append('file', file);

  const { data } = await api.post<string>(API_UPLOAD_SINGLE, formData);

  return data;
}

export async function uploadFilesApi(files: { files: File[]; width?: string; isThumb?: boolean }) {
  const formData = new FormData();

  files.files.forEach((file) => formData.append('files', file));

  const { data } = await api.post<string[]>(API_UPLOAD_MULTIPLE, formData, {
    params: { width: files.width, thumb: files.isThumb },
  });

  return data;
}

export async function deleteFileApi(file: { url: string; isThumb: boolean }) {
  const { data } = await api.delete<IBaseReply>(`${API_UPLOAD}/${file.url}`, { params: { thumb: file.isThumb } });

  return data;
}
