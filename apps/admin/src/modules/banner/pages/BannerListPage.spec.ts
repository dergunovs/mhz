import { DefineComponent } from 'vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { IBanner } from 'mhz-contracts';
import { dataTest } from 'mhz-helpers';

import BannerListPage from './BannerListPage.vue';

import { mockQueryReply, wrapperFactory } from '@/common/test';
import * as bannerServices from '@/banner/services';
import { BANNERS } from '@/banner/fixtures';

const spyGetBanners = vi.spyOn(bannerServices, 'getBanners').mockReturnValue(mockQueryReply(BANNERS));

const bannerList = dataTest('banner-list-page-list');

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(BannerListPage, {});
});

enableAutoUnmount(afterEach);

describe('BannerListPage', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(BannerListPage)).toBeTruthy();
  });

  it('matches snapshot', async () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('gets banners and passes them to list props', async () => {
    expect(spyGetBanners).toBeCalledTimes(1);

    expect(wrapper.findComponent<DefineComponent<{ banners: IBanner[] }>>(bannerList).vm.$props.banners).toEqual(
      BANNERS.data
    );
  });
});
