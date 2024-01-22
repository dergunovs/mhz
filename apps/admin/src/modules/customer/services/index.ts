import { Ref, ComputedRef } from 'vue';

import { useQuery, IPageQuery } from 'mhz-helpers';
import { API_CUSTOMER } from 'mhz-contracts';

import { getCustomerApi, getCustomersApi } from '@/customer/services/api';

export function getCustomers(query: Ref<IPageQuery | number>) {
  return useQuery({ queryKey: [API_CUSTOMER, query], queryFn: () => getCustomersApi(query) });
}

export function getCustomer(id?: ComputedRef<string | string[]>) {
  return useQuery({ queryKey: [API_CUSTOMER, id], queryFn: () => getCustomerApi(id) });
}
