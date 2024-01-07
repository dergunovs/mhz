import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import * as helpers from 'mhz-helpers';

import LoginPage from './LoginPage.vue';

import { wrapperFactory } from '@/common/test';
import { URL_MAIN } from '@/common/constants';

const spyRedirectIfAuth = vi.fn();
const spyAuth = vi.spyOn(helpers, 'useAuth').mockReturnValue({ auth: vi.fn(), redirectIfAuth: spyRedirectIfAuth });

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(LoginPage, {});
});

enableAutoUnmount(afterEach);

describe('LoginPage', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(LoginPage)).toBeTruthy();
  });

  it('redirects to main page if authorized', async () => {
    expect(spyAuth).toBeCalledTimes(1);
    expect(spyRedirectIfAuth).toBeCalledTimes(1);

    expect(spyRedirectIfAuth).toBeCalledWith(URL_MAIN);
  });
});
