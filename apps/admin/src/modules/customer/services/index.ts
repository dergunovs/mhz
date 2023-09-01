import { Ref, ComputedRef } from 'vue';

import { ICustomer } from 'mhz-types';
import { api, useQuery, IPageQuery } from 'mhz-helpers';

import { API_CUSTOMER } from '@/customer/constants';

export function getCustomers(query: Ref<IPageQuery | number>) {
  async function fn(): Promise<{ data: ICustomer[]; total: number }> {
    const params =
      typeof query.value === 'number'
        ? { page: query.value }
        : {
            page: query.value.page || 1,
            sort: query.value.sort.value,
            dir: query.value.sort.isAsc === false ? 'desc' : 'asc',
          };

    const { data } = await api.get(API_CUSTOMER, { params });

    return data;
  }

  return useQuery({ queryKey: [API_CUSTOMER, query], queryFn: fn });
}

export function getCustomer(id: ComputedRef<string>) {
  async function fn(): Promise<ICustomer> {
    const { data } = await api.get(`${API_CUSTOMER}/${id.value}`);

    return data;
  }

  return useQuery({ queryKey: [API_CUSTOMER, id], queryFn: fn });
}
