import { ComputedRef, Ref } from 'vue';

import { api, useQuery, useMutation, IPageQuery, convertParams } from 'mhz-helpers';
import { API_ORDER, IBaseReply, IOrder, TOrderStatus } from 'mhz-contracts';

export function getOrders(query: Ref<IPageQuery | number>) {
  async function fn() {
    const params = convertParams(query);

    const { data } = await api.get<{ data: IOrder[]; total: number }>(API_ORDER, { params });

    return data;
  }

  return useQuery({ queryKey: [API_ORDER, query], queryFn: fn });
}

export function getOrder(id?: ComputedRef<string | string[]>) {
  async function fn() {
    if (!id?.value) return null;

    const { data } = await api.get<IOrder>(`${API_ORDER}/${id.value}`);

    return data;
  }

  return useQuery({ queryKey: [API_ORDER, id], queryFn: fn, refetchOnMount: true });
}

export function updateOrder(id: ComputedRef<string | undefined>, options: object) {
  async function fn(status: TOrderStatus) {
    if (!id) return null;

    const { data } = await api.patch<IBaseReply>(`${API_ORDER}/${id.value}`, { status });

    return data;
  }

  return useMutation({ mutationKey: [API_ORDER, id], mutationFn: fn, ...options });
}

export function deleteOrder(options: object) {
  async function fn(id?: string) {
    if (!id) return null;

    const { data } = await api.delete<IBaseReply>(`${API_ORDER}/${id}`);

    return data;
  }

  return useMutation({ mutationKey: [API_ORDER], mutationFn: fn, ...options });
}
