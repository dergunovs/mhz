import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';

import ManagerCreatePage from './ManagerCreatePage.vue';

import { wrapperFactory } from '@/common/test';

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(ManagerCreatePage, {});
});

enableAutoUnmount(afterEach);

describe('ManagerCreatePage', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(ManagerCreatePage)).toBeTruthy();
  });
});
