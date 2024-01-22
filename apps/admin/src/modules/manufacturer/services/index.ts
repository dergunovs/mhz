import { ComputedRef, Ref } from 'vue';

import { useMutation, useQuery, IPageQuery } from 'mhz-helpers';
import { API_MANUFACTURER } from 'mhz-contracts';

import {
  deleteManufacturerApi,
  getManufacturerApi,
  getManufacturersApi,
  postManufacturerApi,
  updateManufacturerApi,
} from '@/manufacturer/services/api';

export function getManufacturers(query: Ref<IPageQuery | number>) {
  return useQuery({ queryKey: [API_MANUFACTURER, query], queryFn: () => getManufacturersApi(query) });
}

export function getManufacturer(id?: ComputedRef<string | string[]>) {
  return useQuery({ queryKey: [API_MANUFACTURER, id], queryFn: () => getManufacturerApi(id) });
}

export function postManufacturer(options: object) {
  return useMutation({ mutationKey: [API_MANUFACTURER], mutationFn: postManufacturerApi, ...options });
}

export function updateManufacturer(options: object) {
  return useMutation({ mutationKey: [API_MANUFACTURER], mutationFn: updateManufacturerApi, ...options });
}

export function deleteManufacturer(options: object) {
  return useMutation({ mutationKey: [API_MANUFACTURER], mutationFn: deleteManufacturerApi, ...options });
}
