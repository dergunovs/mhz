import { Ref, ComputedRef } from 'vue';

import { IPageQuery, api, convertParams } from 'mhz-helpers';
import { API_ORDER, IBaseReply, IOrder, TOrderStatus } from 'mhz-contracts';

export async function getOrdersApi(query: Ref<IPageQuery | number>) {
  const params = convertParams(query);

  const { data } = await api.get<{ data: IOrder[]; total: number }>(API_ORDER, { params });

  return data;
}

export async function getOrderApi(id?: ComputedRef<string | string[] | undefined>) {
  if (!id?.value) return null;

  const { data } = await api.get<{ data: IOrder }>(`${API_ORDER}/${id.value}`);

  return data.data;
}

export async function updateOrderApi(order: { status: TOrderStatus; id?: string }) {
  if (!order.id) return null;

  const { data } = await api.patch<IBaseReply>(`${API_ORDER}/${order.id}`, { status: order.status });

  return data;
}

export async function postOrderApi() {
  const { data } = await api.post<string>(API_ORDER);

  return data;
}
