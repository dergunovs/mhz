import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';

import MainPage from './MainPage.vue';

import { wrapperFactory } from '@/common/test';

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(MainPage, {});
});

enableAutoUnmount(afterEach);

describe('MainPage', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(MainPage)).toBeTruthy();
  });
});
