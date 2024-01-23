import { Ref, ComputedRef } from 'vue';

import { IPageQuery, useMutation, useQuery } from 'mhz-helpers';
import { API_ORDER } from 'mhz-contracts';

import { getOrderApi, getOrdersApi, postOrderApi, updateOrderApi } from '@/order/services/api';

export function getOrders(query: Ref<IPageQuery | number>) {
  return useQuery({ queryKey: [API_ORDER, query], queryFn: () => getOrdersApi(query) });
}

export function getOrder(id?: ComputedRef<string | string[] | undefined>) {
  return useQuery({ queryKey: [API_ORDER, id], queryFn: () => getOrderApi(id) });
}

export function updateOrder(id: ComputedRef<string | undefined>, options: object) {
  return useMutation({ mutationKey: [API_ORDER, id], mutationFn: updateOrderApi, ...options });
}

export function postOrder(options: object) {
  return useMutation({ mutationKey: [API_ORDER], mutationFn: postOrderApi, ...options });
}
