import { Ref } from 'vue';
import { useMutation, useQuery } from '@tanstack/vue-query';

import { IManufacturer } from 'mhz-types';

import { API_MANUFACTURER } from '@/manufacturer/constants';
import { api } from '@/common/services/api';

export function getManufacturers() {
  async function fn(): Promise<IManufacturer[] | undefined> {
    const { data } = await api.get(API_MANUFACTURER);

    return data;
  }

  return useQuery({
    queryKey: [API_MANUFACTURER],
    queryFn: fn,
  });
}

export function postManufacturer(formData: Ref<IManufacturer>) {
  async function fn(): Promise<void> {
    await api.post(API_MANUFACTURER, formData.value);
  }

  return useMutation({
    mutationKey: [API_MANUFACTURER, formData],
    mutationFn: fn,
  });
}
