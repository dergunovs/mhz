import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';

import ProductCreatePage from './ProductCreatePage.vue';

import { wrapperFactory } from '@/common/test';

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(ProductCreatePage, {});
});

enableAutoUnmount(afterEach);

describe('ProductCreatePage', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(ProductCreatePage)).toBeTruthy();
  });
});
