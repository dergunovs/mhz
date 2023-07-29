import { useMutation, useQuery } from '@tanstack/vue-query';

import { ILoginFormData } from '@/auth/interface';
import { API_GET_CHECK_AUTH, API_POST_LOGIN, API_POST_SETUP } from '@/auth/constants';

import { api } from '@/common/services/api';

export function getCheckAuth(options: object) {
  async function fn() {
    await api.get(API_GET_CHECK_AUTH);

    return true;
  }

  return useQuery({
    queryKey: [API_GET_CHECK_AUTH],
    queryFn: fn,
    ...options,
  });
}
export function postSetup(options: object) {
  async function fn(formData: ILoginFormData): Promise<boolean> {
    await api.post(API_POST_SETUP, formData);

    return true;
  }

  return useMutation({
    mutationKey: [API_POST_SETUP],
    mutationFn: fn,
    ...options,
  });
}

export function postLogin(options: object) {
  async function fn(formData: ILoginFormData): Promise<string> {
    const { data } = await api.post(API_POST_LOGIN, formData);

    return data.token;
  }

  return useMutation({
    mutationKey: [API_POST_LOGIN],
    mutationFn: fn,
    ...options,
  });
}
