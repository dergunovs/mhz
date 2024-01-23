import { Ref } from 'vue';

import { IPageQuery, useMutation, useQuery } from 'mhz-helpers';
import { API_CONFIGURATION } from 'mhz-contracts';

import {
  deleteConfigurationApi,
  getConfigurationApi,
  getConfigurationsApi,
  postConfigurationApi,
  updateConfigurationApi,
} from '@/configuration/services/api';

export function getConfigurations(query: Ref<IPageQuery | number>) {
  return useQuery({ queryKey: [API_CONFIGURATION, query], queryFn: () => getConfigurationsApi(query) });
}

export function getConfiguration(id?: string | string[]) {
  return useQuery({ queryKey: [API_CONFIGURATION, id], queryFn: () => getConfigurationApi(id) });
}

export function updateConfiguration(options: object) {
  return useMutation({ mutationKey: [API_CONFIGURATION], mutationFn: updateConfigurationApi, ...options });
}

export function postConfiguration(options: object) {
  return useMutation({ mutationKey: [API_CONFIGURATION], mutationFn: postConfigurationApi, ...options });
}

export function deleteConfiguration(options: object) {
  return useMutation({ mutationKey: [API_CONFIGURATION], mutationFn: deleteConfigurationApi, ...options });
}
