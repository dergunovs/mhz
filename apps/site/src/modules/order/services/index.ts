import { Ref, ComputedRef } from 'vue';

import { IPageQuery, api, useMutation, useQuery } from 'mhz-helpers';
import { API_ORDER, IOrder, TOrderStatus } from 'mhz-contracts';

export function getOrders(query: Ref<IPageQuery | number>) {
  async function fn(): Promise<{ data: IOrder[]; total: number }> {
    const params = typeof query.value === 'number' ? { page: query.value } : { page: query.value.page || 1 };

    const { data } = await api.get(API_ORDER, { params });

    return data;
  }

  return useQuery({ queryKey: [API_ORDER, query], queryFn: fn });
}

export function getOrder(id?: ComputedRef<string | string[] | undefined>, options?: object) {
  async function fn(): Promise<IOrder | null> {
    if (!id?.value) return null;

    const { data } = await api.get(`${API_ORDER}/${id.value}`);

    return data;
  }

  return useQuery({ queryKey: [API_ORDER, id], queryFn: fn, refetchOnMount: true, ...options });
}

export function updateOrder(options: object, id?: string) {
  async function fn(status: TOrderStatus) {
    if (!id) return null;

    await api.patch(`${API_ORDER}/${id}`, { status });
  }

  return useMutation({ mutationKey: [API_ORDER, id], mutationFn: fn, ...options });
}

export function postOrder(options: object) {
  async function fn(): Promise<string | undefined> {
    const { data } = await api.post(API_ORDER);

    return data.id;
  }

  return useMutation({ mutationKey: [API_ORDER], mutationFn: fn, ...options });
}
