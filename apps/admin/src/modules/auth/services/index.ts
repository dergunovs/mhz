import {
  API_CHECK_AUTH,
  API_LOGIN,
  API_SETUP,
  TAuthLoginBody,
  TAuthLoginReply,
  TAuthSetupBody,
  TBaseReply,
} from 'mhz-contracts';
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
    const loginBody: TAuthLoginBody = { ...formData, role: 'manager' };

    const { data } = await api.post<TAuthLoginReply>(API_LOGIN, loginBody);

    return data;
  }

  return useMutation({ mutationKey: [API_LOGIN], mutationFn: fn, ...options });
}

export function setup(options: object) {
  async function fn(formData: TAuthSetupBody) {
    const { data } = await api.post<TBaseReply>(API_SETUP, formData);

    return data;
  }

  return useMutation({ mutationKey: [API_SETUP], mutationFn: fn, ...options });
}
