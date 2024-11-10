import { readonly, ref } from 'vue';
import { useRouter } from 'vue-router';

const isAuthLocal = ref(false);

export const isAuth = readonly(isAuthLocal);

export function setAuth(auth: boolean) {
  isAuthLocal.value = auth;
}

export function logout(url: string, deleteAuthHeader: () => void, tokenName: string) {
  deleteCookieToken(tokenName);
  deleteAuthHeader();
  window.location.href = url;
}

export function setCookieToken(token: string, tokenName: string) {
  document.cookie = `${tokenName}=${token};Secure;samesite=strict;`;
}

export function getCookieToken(tokenName: string): string | undefined {
  const { [tokenName]: token } = Object.fromEntries(document.cookie.split('; ').map((v) => v.split('=')));

  return token;
}

export function deleteCookieToken(tokenName: string) {
  document.cookie = `${tokenName}=;expires=${new Date(0).toUTCString()}`;
}

export function useAuth() {
  const router = useRouter();

  function auth(token: string, setAuthHeader: (token: string) => void, tokenName: string) {
    setCookieToken(token, tokenName);
    setAuthHeader(token);
    setAuth(true);
  }

  function redirectIfAuth(url: string) {
    if (isAuth.value) router.push(url);
  }

  return {
    auth,
    redirectIfAuth,
  };
}
