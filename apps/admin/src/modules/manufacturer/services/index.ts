import { ComputedRef } from 'vue';
import { useMutation, useQuery } from '@tanstack/vue-query';

import { IManufacturer } from 'mhz-types';

import { API_MANUFACTURER } from '@/manufacturer/constants';
import { api } from '@/common/services/api';

export function getManufacturers() {
  async function fn(): Promise<IManufacturer[]> {
    const { data } = await api.get(API_MANUFACTURER);

    return data;
  }

  return useQuery({
    queryKey: [API_MANUFACTURER],
    queryFn: fn,
  });
}

export function getManufacturer(id: ComputedRef<string>) {
  async function fn(): Promise<IManufacturer> {
    const { data } = await api.get(`${API_MANUFACTURER}/${id.value}`);

    return data;
  }

  return useQuery({
    queryKey: [API_MANUFACTURER, id],
    queryFn: fn,
  });
}

export function postManufacturer(options: object) {
  async function fn(formData: IManufacturer) {
    await api.post(API_MANUFACTURER, formData);
  }

  return useMutation({
    mutationKey: [API_MANUFACTURER],
    mutationFn: fn,
    ...options,
  });
}

export function updateManufacturer(id: ComputedRef<number | undefined>, options: object) {
  async function fn(formData: IManufacturer) {
    await api.patch(`${API_MANUFACTURER}/${id.value}`, formData);
  }

  return useMutation({
    mutationKey: [API_MANUFACTURER, id],
    mutationFn: fn,
    ...options,
  });
}

export function deleteManufacturer(options: object) {
  async function fn(id?: number) {
    await api.delete(`${API_MANUFACTURER}/${id}`);
  }

  return useMutation({
    mutationKey: [API_MANUFACTURER],
    mutationFn: fn,
    ...options,
  });
}
