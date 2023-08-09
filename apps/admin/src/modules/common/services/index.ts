import { useMutation } from '@tanstack/vue-query';

import { API_UPLOAD, API_UPLOAD_SINGLE } from '@/common/constants';
import { api } from '@/common/services/api';

export function uploadFile(options: object, width?: string) {
  async function fn(file?: File): Promise<string> {
    if (!file) throw new Error();

    const formData = new FormData();

    formData.append('file', file);

    const { data } = await api.post(API_UPLOAD_SINGLE, formData, { params: { width } });

    return data;
  }

  return useMutation({
    mutationKey: [API_UPLOAD],
    mutationFn: fn,
    ...options,
  });
}

export function uploadFiles(options: object, width?: string) {
  async function fn(files: File[]): Promise<string[]> {
    const formData = new FormData();

    files.forEach((file) => formData.append('files', file));

    const { data } = await api.post(API_UPLOAD, formData, { params: { width } });

    return data;
  }

  return useMutation({
    mutationKey: [API_UPLOAD],
    mutationFn: fn,
    ...options,
  });
}

export function deleteFile(options?: object) {
  async function fn(filename: string) {
    await api.delete(`${API_UPLOAD}/${filename}`);

    return true;
  }

  return useMutation({
    mutationKey: [API_UPLOAD],
    mutationFn: fn,
    ...options,
  });
}
