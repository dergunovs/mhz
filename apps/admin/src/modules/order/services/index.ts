import { ComputedRef, Ref } from 'vue';

import { IOrder } from 'mhz-types';
import { api, useQuery, IPageQuery } from 'mhz-helpers';

import { API_ORDER } from '@/order/constants';

export function getOrders(query: Ref<IPageQuery | number>) {
  async function fn(): Promise<{ data: IOrder[]; total: number }> {
    const params =
      typeof query.value === 'number'
        ? { page: query.value }
        : {
            page: query.value.page || 1,
            sort: query.value.sort.value,
            dir: query.value.sort.isAsc === false ? 'desc' : 'asc',
          };

    const { data } = await api.get(API_ORDER, { params });

    return data;
  }

  return useQuery({ queryKey: [API_ORDER, query], queryFn: fn });
}

export function getOrder(id?: ComputedRef<string | string[]>) {
  async function fn(): Promise<IOrder | null> {
    if (!id?.value) return null;

    const { data } = await api.get(`${API_ORDER}/${id.value}`);

    return data;
  }

  return useQuery({ queryKey: [API_ORDER, id], queryFn: fn });
}
