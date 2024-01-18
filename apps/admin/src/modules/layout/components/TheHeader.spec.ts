import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import * as helpers from 'mhz-helpers';

import TheHeader from './TheHeader.vue';

import { wrapperFactory } from '@/common/test';
import { TOKEN_NAME, URL_LOGIN } from '@/auth/constants';

const spyLogout = vi.spyOn(helpers, 'logout');
const deleteAuthHeader = vi.spyOn(helpers, 'deleteAuthHeader');

const headerLogout = '[data-test="header-logout"]';

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(TheHeader, {});
});

enableAutoUnmount(afterEach);

describe('TheHeader', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(TheHeader)).toBeTruthy();
  });

  it('handles logout by button click', async () => {
    expect(spyLogout).toBeCalledTimes(0);

    await wrapper.findComponent(headerLogout).trigger('click');

    expect(spyLogout).toBeCalledTimes(1);
    expect(spyLogout).toBeCalledWith(URL_LOGIN, deleteAuthHeader, TOKEN_NAME);
  });
});
