import { DefineComponent } from 'vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { IBanner } from 'mhz-contracts';

import BannerEditPage from './BannerEditPage.vue';

import { mockQueryReply, wrapperFactory } from '@/common/test';
import * as bannerServices from '@/banner/services';
import { BANNERS } from '@/banner/fixtures';

const BANNER = BANNERS.data[0];

const spyGetBanner = vi.spyOn(bannerServices, 'getBanner').mockReturnValue(mockQueryReply(BANNER));

const bannerEditPageForm = '[data-test="banner-edit-page-form"]';

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(BannerEditPage, {});
});

enableAutoUnmount(afterEach);

describe('BannerEditPage', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(BannerEditPage)).toBeTruthy();
  });

  it('gets banner and passes it to form props', async () => {
    expect(spyGetBanner).toBeCalledTimes(1);

    expect(wrapper.findComponent<DefineComponent<{ banner: IBanner }>>(bannerEditPageForm).vm.$props.banner).toEqual(
      BANNER
    );
  });
});
