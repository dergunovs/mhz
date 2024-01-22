import { useQuery, useMutation } from 'mhz-helpers';
import { API_AUTH_CHECK, API_AUTH_LOGIN, API_AUTH_SETUP } from 'mhz-contracts';

import { checkAuthApi, loginApi, setupApi } from '@/auth/services/api';

export function checkAuth() {
  return useQuery({ queryKey: [API_AUTH_CHECK], queryFn: checkAuthApi });
}

export function setup(options: object) {
  return useMutation({ mutationKey: [API_AUTH_SETUP], mutationFn: setupApi, ...options });
}

export function login(options: object) {
  return useMutation({ mutationKey: [API_AUTH_LOGIN], mutationFn: loginApi, ...options });
}
