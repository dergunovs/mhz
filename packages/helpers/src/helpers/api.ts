import axios from 'axios';

export const api = axios;

export function setBaseURL(url: string) {
  axios.defaults.baseURL = url;
}

export function setAuthHeader(token: string) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export function deleteAuthHeader() {
  api.defaults.headers.common['Authorization'] = ``;
}

export function handleError(error: unknown) {
  return axios.isAxiosError(error) ? error.response?.data.message : '';
}
