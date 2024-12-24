import { describe, it, expect, beforeEach, afterEach, vi, beforeAll } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { IBaseReply } from 'mhz-contracts';
import * as helpers from 'mhz-helpers';

import App from './App.vue';

import { mockQueryReply, wrapperFactory, router } from '@/common/test';
import { TOKEN_NAME } from '@/auth/constants';
import { URL_CATEGORY } from '@/category/constants';

import * as authServices from '@/auth/services';

const spyGetCookieToken = vi.spyOn(helpers, 'getCookieToken').mockImplementation((token: string) => token);
const spySetAuthHeader = vi.spyOn(helpers, 'setAuthHeader');
const spyCheckAuth = vi.spyOn(authServices, 'checkAuth').mockReturnValue(mockQueryReply<IBaseReply>({ message: 'ok' }));

const layout = '[data-test="app-layout"]';

let wrapper: VueWrapper;

beforeAll(async () => {
  router.push('/');
  await router.isReady();
});

beforeEach(() => {
  wrapper = wrapperFactory(App, {});
});

enableAutoUnmount(afterEach);

describe('App', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(App)).toBeTruthy();
  });

  it('gets token from cookies and not sets auth at login page', async () => {
    expect(spyGetCookieToken).toBeCalledTimes(1);
    expect(spyGetCookieToken).toBeCalledWith(TOKEN_NAME);

    expect(spySetAuthHeader).toBeCalledTimes(0);
    expect(spyCheckAuth).toBeCalledTimes(0);
  });

  it('shows default layout and sets auth if token exists and page is not login', async () => {
    wrapper.unmount();

    Object.defineProperty(window, 'location', {
      value: new URL(`http://localhost:3000${URL_CATEGORY}`),
      writable: true,
    });

    const wrapperNotLogin = wrapperFactory(App, {});

    router.push(URL_CATEGORY);
    await router.isReady();

    await new Promise((r) => {
      setTimeout(r, 10);
    });

    expect(spySetAuthHeader).toBeCalledTimes(1);
    expect(spySetAuthHeader).toBeCalledWith(TOKEN_NAME);

    expect(spyCheckAuth).toBeCalledTimes(1);

    expect(wrapperNotLogin.find(layout).attributes('data-layout')).toBe('LayoutDefault');
  });
});
