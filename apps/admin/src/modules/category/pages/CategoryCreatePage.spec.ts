import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';

import CategoryCreatePage from './CategoryCreatePage.vue';

import { wrapperFactory } from '@/common/test';

describe('CategoryCreatePage', async () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = wrapperFactory(CategoryCreatePage, {});
  });

  enableAutoUnmount(afterEach);

  it('exists', async () => {
    expect(wrapper.findComponent(CategoryCreatePage)).toBeTruthy();
  });
});
