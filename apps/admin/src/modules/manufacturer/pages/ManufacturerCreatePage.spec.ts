import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';

import ManufacturerCreatePage from './ManufacturerCreatePage.vue';

import { wrapperFactory } from '@/common/test';

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(ManufacturerCreatePage, {});
});

enableAutoUnmount(afterEach);

describe('ManufacturerCreatePage', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(ManufacturerCreatePage)).toBeTruthy();
  });

  it('matches snapshot', async () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
