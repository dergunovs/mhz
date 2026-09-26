import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';

import LoginPage from './LoginPage.vue';

import { wrapperFactory } from '@/common/test';

describe('LoginPage', async () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = wrapperFactory(LoginPage, {});
  });

  enableAutoUnmount(afterEach);

  it('exists', async () => {
    expect(wrapper.findComponent(LoginPage)).toBeTruthy();
  });

  it('matches snapshot', async () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
