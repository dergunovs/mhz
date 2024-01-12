import { DefineComponent } from 'vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount, flushPromises } from '@vue/test-utils';
import { API_BANNER, IBanner, IBaseReply } from 'mhz-contracts';
import { toast } from 'mhz-ui';
import * as helpers from 'mhz-helpers';

import BannerForm from './BannerForm.vue';

import { wrapperFactory, mockQueryReply, mockMutationReply, router } from '@/common/test';
import { BANNERS } from '@/banner/fixtures';
import { PRODUCTS } from '@/product/fixtures';
import { URL_BANNER } from '@/banner/constants';
import * as productServices from '@/product/services';
import * as bannerServices from '@/banner/services';

const spyGetProducts = vi.spyOn(productServices, 'getProducts').mockReturnValue(mockQueryReply(PRODUCTS));

let onSuccessPost: () => void;
const spyMutatePost = vi.fn();

vi.spyOn(bannerServices, 'postBanner').mockImplementation((options: { onSuccess?: () => void }) => {
  if (options.onSuccess) onSuccessPost = options.onSuccess;

  return mockMutationReply<IBaseReply, IBanner>(spyMutatePost);
});

let onSuccessUpdate: () => void;
const spyMutateUpdate = vi.fn();

vi.spyOn(bannerServices, 'updateBanner').mockImplementation((options: { onSuccess?: () => void }) => {
  if (options.onSuccess) onSuccessUpdate = options.onSuccess;

  return mockMutationReply<IBaseReply, IBanner>(spyMutateUpdate);
});

let onSuccessDelete: () => void;
const spyMutateDelete = vi.fn();

vi.spyOn(bannerServices, 'deleteBanner').mockImplementation((options: { onSuccess?: () => void }) => {
  if (options.onSuccess) onSuccessDelete = options.onSuccess;

  return mockMutationReply<IBaseReply, string | undefined>(spyMutateDelete);
});

const spyRefetchQueries = vi.fn();
const spyRemoveQueries = vi.fn();

vi.spyOn(helpers, 'useQueryClient').mockReturnValue({
  refetchQueries: spyRefetchQueries,
  removeQueries: spyRemoveQueries,
} as unknown as helpers.QueryClient);

const spyRouterPush = vi.spyOn(router, 'push');
const spyToastSuccess = vi.spyOn(toast, 'success');

const BANNER = BANNERS.data[0];
const QUERY_KEY = { queryKey: [API_BANNER] };

let wrapper: VueWrapper;

const bannerForm = '[data-test="banner-form"]';
const bannerFormText = '[data-test="banner-form-text"]';
const bannerFormColor = '[data-test="banner-form-color"]';
const bannerFormProduct = '[data-test="banner-form-product"]';
const bannerFormIsActive = '[data-test="banner-form-is-active"]';
const bannerFormImagePreview = '[data-test="banner-form-image-preview"]';
const bannerFormButtons = '[data-test="banner-form-buttons"]';

beforeEach(() => {
  wrapper = wrapperFactory(BannerForm, {
    props: {
      banner: BANNER,
    },
  });
});

enableAutoUnmount(afterEach);

describe('BannerForm', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(BannerForm)).toBeTruthy();
  });

  it('shows banner content in fields if props is passed', async () => {
    expect(wrapper.findComponent(bannerFormText).attributes('modelvalue')).toBe(BANNER.text);
    expect(wrapper.findComponent(bannerFormColor).attributes('modelvalue')).toBe(BANNER.color);
    expect(wrapper.findComponent(bannerFormProduct).attributes('data-product-id')).toBe(BANNER.product._id);
    expect(wrapper.findComponent(bannerFormIsActive).attributes('modelvalue')).toBe(BANNER.isActive.toString());
    expect(wrapper.findComponent(bannerFormImagePreview).attributes('urls')).toBe(BANNER.imageUrl);
  });

  it('shows image preview if banner has image', async () => {
    expect(wrapper.findComponent(bannerFormImagePreview).exists()).toBe(true);

    await wrapper.setProps({ banner: undefined });

    expect(wrapper.findComponent(bannerFormImagePreview).exists()).toBe(true);
  });

  it('gets products to fill the select options', async () => {
    expect(spyGetProducts).toBeCalledTimes(1);
  });

  it('updates banner', async () => {
    const NEW_BANNER_TEXT = 'yo';

    await wrapper.findComponent(bannerFormText).setValue(NEW_BANNER_TEXT);

    await wrapper.find(bannerForm).trigger('submit');

    expect(spyMutateUpdate).toBeCalledTimes(1);
    expect(spyMutateUpdate).toBeCalledWith({ ...BANNER, text: NEW_BANNER_TEXT });

    onSuccessUpdate();

    expect(spyRefetchQueries).toBeCalledTimes(1);
    expect(spyRefetchQueries).toBeCalledWith(QUERY_KEY);

    await flushPromises();

    expect(spyToastSuccess).toBeCalledTimes(1);
  });

  it('deletes banner', async () => {
    wrapper.findComponent<DefineComponent>(bannerFormButtons).vm.$emit('delete', BANNER._id);

    expect(spyMutateDelete).toBeCalledTimes(1);
    expect(spyMutateDelete).toBeCalledWith(BANNER._id);

    onSuccessDelete();

    expect(spyRemoveQueries).toBeCalledTimes(1);
    expect(spyRemoveQueries).toBeCalledWith(QUERY_KEY);

    expect(spyRefetchQueries).toBeCalledTimes(1);
    expect(spyRefetchQueries).toBeCalledWith(QUERY_KEY);

    await flushPromises();

    expect(spyToastSuccess).toBeCalledTimes(1);

    expect(spyRouterPush).toBeCalledTimes(1);
    expect(spyRouterPush).toBeCalledWith(URL_BANNER);
  });

  it('creates banner', async () => {
    wrapper.unmount();

    const wrapperWithoutBanner = wrapperFactory(BannerForm, {});

    const NEW_BANNER = {
      color: '#000',
      imageUrl: 'pic.jpg',
      isActive: false,
      product: PRODUCTS.data[0],
      text: 'new text',
    };

    await wrapperWithoutBanner.findComponent(bannerFormColor).setValue(NEW_BANNER.color);
    await wrapperWithoutBanner.findComponent(bannerFormIsActive).setValue(NEW_BANNER.isActive);
    await wrapperWithoutBanner.findComponent(bannerFormText).setValue(NEW_BANNER.text);

    wrapperWithoutBanner.vm.formData.imageUrl = NEW_BANNER.imageUrl;
    wrapperWithoutBanner.vm.formData.product = NEW_BANNER.product;

    await wrapperWithoutBanner.find(bannerForm).trigger('submit');

    expect(spyMutatePost).toBeCalledTimes(1);
    expect(spyMutatePost).toBeCalledWith(NEW_BANNER);

    onSuccessPost();

    expect(spyRefetchQueries).toBeCalledTimes(1);
    expect(spyRefetchQueries).toBeCalledWith(QUERY_KEY);

    await flushPromises();

    expect(spyToastSuccess).toBeCalledTimes(1);

    expect(spyRouterPush).toBeCalledTimes(1);
    expect(spyRouterPush).toBeCalledWith(URL_BANNER);
  });
});
