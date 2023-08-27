import { useMutation } from '@tanstack/vue-query';

import { ICustomer } from 'mhz-types';

import { API_CUSTOMER } from '@/customer/constants';
import { api } from '@/common/services/api';

export function postCustomer(options: object) {
  async function fn(formData: ICustomer) {
    await api.post(API_CUSTOMER, formData);
  }

  return useMutation({ mutationKey: [API_CUSTOMER], mutationFn: fn, ...options });
}
