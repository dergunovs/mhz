import { Ref, ComputedRef } from 'vue';

import { api, useQuery, IPageQuery, convertParams } from 'mhz-helpers';
import { API_CUSTOMER, ICustomer } from 'mhz-contracts';

export function getCustomers(query: Ref<IPageQuery | number>) {
  async function fn() {
    const params = convertParams(query);

    const { data } = await api.get<{ data: ICustomer[]; total: number }>(API_CUSTOMER, { params });

    return data;
  }

  return useQuery({ queryKey: [API_CUSTOMER, query], queryFn: fn });
}

export function getCustomer(id?: ComputedRef<string | string[]>) {
  async function fn() {
    if (!id?.value) return null;

    const { data } = await api.get<{ data: ICustomer }>(`${API_CUSTOMER}/${id.value}`);

    return data.data;
  }

  return useQuery({ queryKey: [API_CUSTOMER, id], queryFn: fn });
}
