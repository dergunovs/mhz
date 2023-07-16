import { readonly, ref } from 'vue';
import { useRouter } from 'vue-router';

import { setAuthHeader, deleteAuthHeader } from '@/common/services/api';
import { URL_LOGIN } from '@/auth/constants';
import { URL_MAIN } from '@/common/constants';

const isAuthLocal = ref(false);

export const isAuth = readonly(isAuthLocal);

export function setAuth(auth: boolean) {
  isAuthLocal.value = auth;
}

export function logout() {
  deleteCookieToken();
  deleteAuthHeader();
  window.location.href = `${URL_LOGIN}?logout=1`;
}

export function setCookieToken(token: string) {
  document.cookie = `mhz_token=${token};Secure;samesite=strict;`;
}

export function getCookieToken(): string | undefined {
  const { mhz_token } = Object.fromEntries(document.cookie.split('; ').map((v) => v.split('=')));

  return mhz_token;
}

export function deleteCookieToken() {
  document.cookie = `mhz_token=;expires=${new Date(0).toUTCString()}`;
}

export function useAuth() {
  const router = useRouter();

  function login(token: string) {
    setCookieToken(token);
    setAuthHeader(token);
    setAuth(true);

    router.push(URL_MAIN);
  }

  return {
    login,
  };
}
