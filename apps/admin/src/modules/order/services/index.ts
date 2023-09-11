import { ComputedRef, Ref } from 'vue';

import { IOrder, TOrderStatus } from 'mhz-types';
import { api, useQuery, useMutation, IPageQuery } from 'mhz-helpers';

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

export function updateOrder(id: ComputedRef<string | undefined>, options: object) {
  async function fn(status: TOrderStatus) {
    await api.patch(`${API_ORDER}/${id.value}`, { status });
  }

  return useMutation({ mutationKey: [API_ORDER, id], mutationFn: fn, ...options });
}

export function deleteOrder(id: ComputedRef<string | undefined>, options: object) {
  async function fn() {
    await api.delete(`${API_ORDER}/${id.value}`);
  }

  return useMutation({ mutationKey: [API_ORDER], mutationFn: fn, ...options });
}
