import { Ref, ComputedRef } from 'vue';

import { useQuery, IPageQuery } from 'mhz-helpers';
import { API_MANUFACTURER, API_MANUFACTURER_POPULAR } from 'mhz-contracts';

import { getManufacturerApi, getManufacturersApi, getManufacturersPopularApi } from '@/manufacturer/services/api';

export function getManufacturers(query: Ref<IPageQuery | number>) {
  return useQuery({ queryKey: [API_MANUFACTURER, query], queryFn: () => getManufacturersApi(query) });
}

export function getManufacturersPopular() {
  return useQuery({ queryKey: [API_MANUFACTURER_POPULAR], queryFn: getManufacturersPopularApi });
}

export function getManufacturer(id?: ComputedRef<string | string[]>) {
  return useQuery({ queryKey: [API_MANUFACTURER, id], queryFn: () => getManufacturerApi(id) });
}
