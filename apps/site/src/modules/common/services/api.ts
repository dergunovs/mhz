import axios from 'axios';

import { toast } from 'mhz-ui';

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
    toast.error(error.response?.data.message);
  }
}
