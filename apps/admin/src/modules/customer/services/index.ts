import { Ref, ComputedRef } from 'vue';

import { api, useQuery, IPageQuery } from 'mhz-helpers';
import { API_CUSTOMER, ICustomer } from 'mhz-contracts';

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

export function getCustomer(id?: ComputedRef<string | string[]>) {
  async function fn(): Promise<ICustomer | null> {
    if (!id?.value) return null;

    const { data } = await api.get(`${API_CUSTOMER}/${id.value}`);

    return data;
  }

  return useQuery({ queryKey: [API_CUSTOMER, id], queryFn: fn, refetchOnMount: true });
}
