import { useQuery, useMutation } from 'mhz-helpers';
import { API_AUTH_CHECK, API_AUTH_LOGIN } from 'mhz-contracts';

import { checkAuthApi, loginApi } from '@/auth/services/api';

export function checkAuth() {
  return useQuery({ queryKey: [API_AUTH_CHECK], queryFn: checkAuthApi });
}

export function login(options: object) {
  return useMutation({ mutationKey: [API_AUTH_LOGIN], mutationFn: loginApi, ...options });
}
