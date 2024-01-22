import { Ref } from 'vue';

import { useQuery, useMutation } from 'mhz-helpers';
import { API_UPLOAD, API_SEARCH, API_STATS_COUNT, API_UPLOAD_MULTIPLE } from 'mhz-contracts';

import { deleteFileApi, getEntitiesCountApi, searchApi, uploadFileApi, uploadFilesApi } from '@/common/services/api';

export function search(query: Ref<string>) {
  return useQuery({ queryKey: [API_SEARCH, query], queryFn: () => searchApi(query), enabled: false });
}

export function getEntitiesCount() {
  return useQuery({ queryKey: [API_STATS_COUNT], queryFn: getEntitiesCountApi });
}

export function uploadFile(options: object) {
  return useMutation({ mutationKey: [API_UPLOAD], mutationFn: uploadFileApi, ...options });
}

export function uploadFiles(options: object) {
  return useMutation({ mutationKey: [API_UPLOAD_MULTIPLE], mutationFn: uploadFilesApi, ...options });
}

export function deleteFile() {
  return useMutation({ mutationKey: [API_UPLOAD], mutationFn: deleteFileApi });
}
