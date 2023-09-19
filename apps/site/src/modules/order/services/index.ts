import { Ref, ComputedRef } from 'vue';

import { IPageQuery, api, convertParams, useMutation, useQuery } from 'mhz-helpers';
import { API_ORDER, IBaseReply, IOrder, TOrderStatus } from 'mhz-contracts';

export function getOrders(query: Ref<IPageQuery | number>) {
  async function fn() {
    const params = convertParams(query);

    const { data } = await api.get<{ data: IOrder[]; total: number }>(API_ORDER, { params });

    return data;
  }

  return useQuery({ queryKey: [API_ORDER, query], queryFn: fn });
}

export function getOrder(id?: ComputedRef<string | string[] | undefined>, options?: object) {
  async function fn() {
    if (!id?.value) return null;

    const { data } = await api.get<{ data: IOrder }>(`${API_ORDER}/${id.value}`);

    return data.data;
  }

  return useQuery({ queryKey: [API_ORDER, id], queryFn: fn, refetchOnMount: true, ...options });
}

export function updateOrder(options: object, id?: string) {
  async function fn(status: TOrderStatus) {
    if (!id) return null;

    const { data } = await api.patch<IBaseReply>(`${API_ORDER}/${id}`, { status });

    return data;
  }

  return useMutation({ mutationKey: [API_ORDER, id], mutationFn: fn, ...options });
}

export function postOrder(options: object) {
  async function fn() {
    const { data } = await api.post<string>(API_ORDER);

    return data;
  }

  return useMutation({ mutationKey: [API_ORDER], mutationFn: fn, ...options });
}
