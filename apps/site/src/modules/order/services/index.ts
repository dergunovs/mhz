import { api, useMutation } from 'mhz-helpers';

import { API_ORDER } from '@/order/contants';

export function postOrder(options: object) {
  async function fn() {
    const { data } = await api.post(API_ORDER);

    return data;
  }

  return useMutation({ mutationKey: [API_ORDER], mutationFn: fn, ...options });
}
