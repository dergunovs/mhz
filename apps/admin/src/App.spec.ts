import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { IBaseReply } from 'mhz-contracts';
import * as helpers from 'mhz-helpers';

import App from './App.vue';

import { mockQueryReply, wrapperFactory, router } from '@/common/test';
import { TOKEN_NAME } from '@/auth/constants';
import { URL_CATEGORY } from '@/category/constants';

import * as authServices from '@/auth/services';

const spyGetCookieToken = vi.spyOn(helpers, 'getCookieToken').mockImplementation((token: string) => token);
const spySetAuthHeader = vi.spyOn(helpers, 'setAuthHeader').mockImplementation(() => Promise.resolve());

const spyCheckAuth = vi
  .spyOn(authServices, 'checkAuth')
  .mockImplementation(() => mockQueryReply<IBaseReply>({ message: 'ok' }));

let wrapper: VueWrapper;

const layout = '[data-test="app-layout"]';

beforeEach(() => {
  wrapper = wrapperFactory(App, {});
});

enableAutoUnmount(afterEach);

describe('App', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(App)).toBeTruthy();
  });

  it('shows empty layout at login page after page load', async () => {
    expect(wrapper.find(layout).exists()).toBe(false);

    await new Promise((r) => {
      setTimeout(r, 10);
    });

    expect(wrapper.find(layout).attributes('data-layout')).toBe('LayoutEmpty');
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
