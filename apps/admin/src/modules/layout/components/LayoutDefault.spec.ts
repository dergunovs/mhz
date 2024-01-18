import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';

import LayoutDefault from './LayoutDefault.vue';

import { wrapperFactory } from '@/common/test';

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(LayoutDefault, {});
});

enableAutoUnmount(afterEach);

describe('LayoutDefault', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(LayoutDefault)).toBeTruthy();
  });
});
