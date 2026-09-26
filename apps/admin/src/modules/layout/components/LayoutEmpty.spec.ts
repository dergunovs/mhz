import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';

import LayoutEmpty from './LayoutEmpty.vue';

import { wrapperFactory } from '@/common/test';

describe('LayoutEmpty', async () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = wrapperFactory(LayoutEmpty, {});
  });

  enableAutoUnmount(afterEach);

  it('exists', async () => {
    expect(wrapper.findComponent(LayoutEmpty)).toBeTruthy();
  });

  it('matches snapshot', async () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
