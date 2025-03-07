import { DefineComponent } from 'vue';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { dataTest } from 'mhz-helpers';

import BannerList from './BannerList.vue';

import { wrapperFactory } from '@/common/test';
import { URL_BANNER_EDIT } from '@/banner/constants';
import { BANNERS } from '@/banner/fixtures';

const MODELVALUE = { value: '_id', isAsc: true };

const bannerListTable = dataTest('banner-list-table');
const bannerListRow = dataTest('banner-list-row');
const bannerListLink = dataTest('banner-list-link');

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(BannerList, {
    props: {
      banners: BANNERS.data,
      modelValue: MODELVALUE,
    },
  });
});

enableAutoUnmount(afterEach);

describe('BannerList', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(BannerList)).toBeTruthy();
  });

  it('matches snapshot', async () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('shows rows if banner props', async () => {
    expect(wrapper.findAll(bannerListRow).length).toEqual(BANNERS.data.length);

    await wrapper.setProps({ banners: [] });

    expect(wrapper.find(bannerListRow).exists()).toBe(false);
  });

  it('generated link to banner', async () => {
    const LINK = `${URL_BANNER_EDIT}/${BANNERS.data[0]._id}`;

    expect(wrapper.find(bannerListLink).attributes('to')).toEqual(LINK);
  });

  it('shows banner content in cells', async () => {
    expect(wrapper.find(bannerListLink).text()).toEqual(BANNERS.data[0].product.title);
  });

  it('passes modelValue props to table', async () => {
    expect(wrapper.findComponent<DefineComponent>(bannerListTable).vm.$attrs.modelValue).toEqual(MODELVALUE);
  });

  it('emits sort option by table emit', async () => {
    wrapper.findComponent<DefineComponent>(bannerListTable).vm.$emit('update:modelValue', MODELVALUE);

    expect(wrapper.emitted()['update:modelValue']).toHaveLength(1);
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([MODELVALUE]);
  });

  it('emits reset by table reset', async () => {
    wrapper.findComponent<DefineComponent>(bannerListTable).vm.$emit('reset', MODELVALUE.value);

    expect(wrapper.emitted()['reset']).toHaveLength(1);
    expect(wrapper.emitted()['reset'][0]).toEqual([MODELVALUE.value]);
  });
});
