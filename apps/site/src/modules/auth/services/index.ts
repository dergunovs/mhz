import { api, useMutation, useQuery } from 'mhz-helpers';
import { API_AUTH_CHECK, API_AUTH_LOGIN, IBaseReply, ILoginData, IUserToken } from 'mhz-contracts';

export function checkAuth(options: object) {
  async function fn() {
    const { data } = await api.get<IBaseReply>(API_AUTH_CHECK);

    return data;
  }

  return useQuery({ queryKey: [API_AUTH_CHECK], queryFn: fn, ...options });
}

export function login(options: object) {
  async function fn(formData: ILoginData) {
    const { data } = await api.post<IUserToken>(API_AUTH_LOGIN, formData);

    return data;
  }

  return useMutation({ mutationKey: [API_AUTH_LOGIN], mutationFn: fn, ...options });
}
