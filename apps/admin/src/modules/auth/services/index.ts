import { useMutation, useQuery } from '@tanstack/vue-query';

import { ILoginFormData } from '@/auth/interface';
import { API_CHECK_AUTH, API_LOGIN, API_SETUP } from '@/auth/constants';

import { api } from '@/common/services/api';

export function checkAuth(options: object) {
  async function fn() {
    await api.get(API_CHECK_AUTH);

    return true;
  }

  return useQuery({ queryKey: [API_CHECK_AUTH], queryFn: fn, ...options });
}
export function setup(options: object) {
  async function fn(formData: ILoginFormData): Promise<boolean> {
    await api.post(API_SETUP, formData);

    return true;
  }

  return useMutation({ mutationKey: [API_SETUP], mutationFn: fn, ...options });
}

export function login(options: object) {
  async function fn(formData: ILoginFormData): Promise<string> {
    const { data } = await api.post(API_LOGIN, { ...formData, role: 'manager' });

    return data;
  }

  return useMutation({ mutationKey: [API_LOGIN], mutationFn: fn, ...options });
}
