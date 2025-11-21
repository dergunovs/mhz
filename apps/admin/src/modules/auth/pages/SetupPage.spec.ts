import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';

import SetupPage from './SetupPage.vue';

import { wrapperFactory } from '@/common/test';

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(SetupPage, {});
});

enableAutoUnmount(afterEach);

describe('SetupPage', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(SetupPage)).toBeTruthy();
  });

  it('matches snapshot', async () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
