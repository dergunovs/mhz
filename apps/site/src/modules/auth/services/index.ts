import { api, useMutation, useQuery } from 'mhz-helpers';

import { ILoginFormData } from '@/auth/interface';
import { API_CHECK_AUTH, API_LOGIN } from '@/auth/constants';

export function checkAuth(options: object) {
  async function fn() {
    await api.get(API_CHECK_AUTH);

    return true;
  }

  return useQuery({ queryKey: [API_CHECK_AUTH], queryFn: fn, ...options });
}

export function login(options: object) {
  async function fn(formData: ILoginFormData): Promise<string> {
    const { data } = await api.post(API_LOGIN, { ...formData, role: 'customer' });

    return data;
  }

  return useMutation({ mutationKey: [API_LOGIN], mutationFn: fn, ...options });
}
