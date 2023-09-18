import { api, useMutation, useQuery } from 'mhz-helpers';
import { API_AUTH_CHECK, API_AUTH_LOGIN } from 'mhz-contracts';

import { ILoginFormData } from '@/auth/interface';

export function checkAuth(options: object) {
  async function fn() {
    await api.get(API_AUTH_CHECK);

    return true;
  }

  return useQuery({ queryKey: [API_AUTH_CHECK], queryFn: fn, ...options });
}

export function login(options: object) {
  async function fn(formData: ILoginFormData): Promise<string> {
    const { data } = await api.post(API_AUTH_LOGIN, { ...formData, role: 'customer' });

    return data;
  }

  return useMutation({ mutationKey: [API_AUTH_LOGIN], mutationFn: fn, ...options });
}
