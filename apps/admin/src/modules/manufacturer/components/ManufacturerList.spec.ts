import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { dataTest } from 'mhz-helpers';

import ManufacturerList from './ManufacturerList.vue';

import { wrapperFactory } from '@/common/test';
import { URL_MANUFACTURER_EDIT } from '@/manufacturer/constants';
import { MANUFACTURERS } from '@/manufacturer/fixtures';

const manufacturerListRow = dataTest('manufacturer-list-row');
const manufacturerListLink = dataTest('manufacturer-list-link');

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(ManufacturerList, {
    props: {
      manufacturers: MANUFACTURERS.data,
    },
  });
});

enableAutoUnmount(afterEach);

describe('ManufacturerList', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(ManufacturerList)).toBeTruthy();
  });

  it('matches snapshot', async () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('shows rows if manufacturers props', async () => {
    expect(wrapper.findAll(manufacturerListRow).length).toEqual(MANUFACTURERS.data.length);

    await wrapper.setProps({ manufacturers: [] });

    expect(wrapper.find(manufacturerListRow).exists()).toBe(false);
  });

  it('generated link to manufacturer', async () => {
    const LINK = `${URL_MANUFACTURER_EDIT}/${MANUFACTURERS.data[0]._id}`;

    expect(wrapper.find(manufacturerListLink).attributes('to')).toEqual(LINK);
  });

  it('shows manufacturer content in cells', async () => {
    expect(wrapper.find(manufacturerListLink).text()).toEqual(MANUFACTURERS.data[0].title);
  });
});
