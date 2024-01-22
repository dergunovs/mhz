import { ComputedRef, Ref } from 'vue';

import { useQuery, useMutation, IPageQuery } from 'mhz-helpers';
import { API_ORDER } from 'mhz-contracts';

import { deleteOrderApi, getOrderApi, getOrdersApi, updateOrderApi } from '@/order/services/api';

export function getOrders(query: Ref<IPageQuery | number>) {
  return useQuery({ queryKey: [API_ORDER, query], queryFn: () => getOrdersApi(query) });
}

export function getOrder(id?: ComputedRef<string | string[]>) {
  return useQuery({ queryKey: [API_ORDER, id], queryFn: () => getOrderApi(id) });
}

export function updateOrder(id: ComputedRef<string | undefined>, options: object) {
  return useMutation({ mutationKey: [API_ORDER, id], mutationFn: updateOrderApi, ...options });
}

export function deleteOrder(options: object) {
  return useMutation({ mutationKey: [API_ORDER], mutationFn: deleteOrderApi, ...options });
}
