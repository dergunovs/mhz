import { api, setAuth } from 'mhz-helpers';
import { API_AUTH_CHECK, API_AUTH_LOGIN, ILoginData, IBaseReply, IUserToken } from 'mhz-contracts';

export async function checkAuthApi() {
  const { data } = await api.get<IBaseReply>(API_AUTH_CHECK);

  if (data.message) setAuth(true);

  return data;
}

export async function loginApi(formData: ILoginData) {
  const { data } = await api.post<IUserToken>(API_AUTH_LOGIN, formData);

  return data;
}
