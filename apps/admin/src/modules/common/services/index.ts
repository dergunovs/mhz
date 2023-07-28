import { useMutation } from '@tanstack/vue-query';

import { API_UPLOAD } from '@/common/constants';
import { api } from '@/common/services/api';

export function uploadFiles(options?: object) {
  async function fn(files: File[]): Promise<string[]> {
    const formData = new FormData();

    files.forEach((file) => formData.append('files', file));

    const { data } = await api.post(API_UPLOAD, formData);

    return data;
  }

  return useMutation({
    mutationKey: [API_UPLOAD],
    mutationFn: fn,
    ...options,
  });
}
