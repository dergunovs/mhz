import { Ref, ComputedRef } from 'vue';

import { api, IPageQuery, convertParams } from 'mhz-helpers';
import { API_CUSTOMER, ICustomer } from 'mhz-contracts';

export async function getCustomersApi(query: Ref<IPageQuery | number>) {
  const params = convertParams(query);

  const { data } = await api.get<{ data: ICustomer[]; total: number }>(API_CUSTOMER, { params });

  return data;
}

export async function getCustomerApi(id?: ComputedRef<string | string[]>) {
  if (!id?.value) return null;

  const { data } = await api.get<{ data: ICustomer }>(`${API_CUSTOMER}/${id.value}`);

  return data.data;
}
