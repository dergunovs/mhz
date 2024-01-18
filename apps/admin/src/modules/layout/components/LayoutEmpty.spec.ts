import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';

import LayoutEmpty from './LayoutEmpty.vue';

import { wrapperFactory } from '@/common/test';

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(LayoutEmpty, {});
});

enableAutoUnmount(afterEach);

describe('LayoutEmpty', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(LayoutEmpty)).toBeTruthy();
  });
});
