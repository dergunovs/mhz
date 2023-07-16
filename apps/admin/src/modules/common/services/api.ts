import axios from 'axios';

import { logout } from '@/auth/composables';

axios.defaults.baseURL = import.meta.env.VITE_API;

export const api = axios;

export function setAuthHeader(token: string) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export function deleteAuthHeader() {
  api.defaults.headers.common['Authorization'] = ``;
}

export function handleError(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 403) logout();
    alert(error.response?.data.message);
  }
}
