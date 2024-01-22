import { ComputedRef, Ref } from 'vue';

import { useMutation, useQuery, IPageQuery } from 'mhz-helpers';
import { API_MANAGER } from 'mhz-contracts';

import {
  deleteManagerApi,
  getManagerApi,
  getManagersApi,
  postManagerApi,
  updateManagerApi,
} from '@/manager/services/api';

export function getManagers(query: Ref<IPageQuery | number>) {
  return useQuery({ queryKey: [API_MANAGER, query], queryFn: () => getManagersApi(query) });
}

export function getManager(id?: ComputedRef<string | string[]>) {
  return useQuery({ queryKey: [API_MANAGER, id], queryFn: () => getManagerApi(id) });
}

export function postManager(options: object) {
  return useMutation({ mutationKey: [API_MANAGER], mutationFn: postManagerApi, ...options });
}

export function updateManager(options: object) {
  return useMutation({ mutationKey: [API_MANAGER], mutationFn: updateManagerApi, ...options });
}

export function deleteManager(options: object) {
  return useMutation({ mutationKey: [API_MANAGER], mutationFn: deleteManagerApi, ...options });
}
