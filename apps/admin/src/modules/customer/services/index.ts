import { Ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import { ICustomer } from 'mhz-types';
import { IPageQuery } from 'mhz-helpers';

import { API_CUSTOMER } from '@/customer/constants';
import { api } from '@/common/services/api';

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
