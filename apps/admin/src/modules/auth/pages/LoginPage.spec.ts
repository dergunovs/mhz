import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';

import LoginPage from './LoginPage.vue';

import { wrapperFactory } from '@/common/test';

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(LoginPage, {});
});

enableAutoUnmount(afterEach);

describe('LoginPage', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(LoginPage)).toBeTruthy();
  });

  it('matches snapshot', async () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
