import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';

import CategoryCreatePage from './CategoryCreatePage.vue';

import { wrapperFactory } from '@/common/test';

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(CategoryCreatePage, {});
});

enableAutoUnmount(afterEach);

describe('CategoryCreatePage', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(CategoryCreatePage)).toBeTruthy();
  });
});
