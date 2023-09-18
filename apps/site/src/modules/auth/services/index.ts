import { API_CHECK_AUTH, API_LOGIN, TAuthLoginBody, TAuthLoginReply, TBaseReply } from 'mhz-contracts';
import { api, useMutation, useQuery } from 'mhz-helpers';

import { ILoginFormData } from '@/auth/interface';

export function checkAuth(options: object) {
  async function fn() {
    const { data } = await api.get<TBaseReply>(API_CHECK_AUTH);

    return data;
  }

  return useQuery({ queryKey: [API_CHECK_AUTH], queryFn: fn, ...options });
}

export function login(options: object) {
  async function fn(formData: ILoginFormData) {
    const loginBody: TAuthLoginBody = { ...formData, role: 'customer' };

    const { data } = await api.post<TAuthLoginReply>(API_LOGIN, loginBody);

    return data;
  }

  return useMutation({ mutationKey: [API_LOGIN], mutationFn: fn, ...options });
}
