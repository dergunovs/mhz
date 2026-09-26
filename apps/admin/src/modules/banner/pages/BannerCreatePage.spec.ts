import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';

import BannerCreatePage from './BannerCreatePage.vue';

import { wrapperFactory } from '@/common/test';

describe('BannerCreatePage', async () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = wrapperFactory(BannerCreatePage, {});
  });

  enableAutoUnmount(afterEach);

  it('exists', async () => {
    expect(wrapper.findComponent(BannerCreatePage)).toBeTruthy();
  });

  it('matches snapshot', async () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
