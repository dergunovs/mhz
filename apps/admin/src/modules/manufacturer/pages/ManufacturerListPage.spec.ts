import { DefineComponent } from 'vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { IManufacturer } from 'mhz-contracts';
import { dataTest } from 'mhz-helpers';

import ManufacturerListPage from './ManufacturerListPage.vue';

import { mockQueryReply, wrapperFactory } from '@/common/test';
import * as manufacturerServices from '@/manufacturer/services';
import { MANUFACTURERS } from '@/manufacturer/fixtures';

const spyGetManufacturers = vi
  .spyOn(manufacturerServices, 'getManufacturers')
  .mockReturnValue(mockQueryReply(MANUFACTURERS));

const manufacturerList = dataTest('manufacturer-list-page-list');

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(ManufacturerListPage, {});
});

enableAutoUnmount(afterEach);

describe('ManufacturerListPage', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(ManufacturerListPage)).toBeTruthy();
  });

  it('matches snapshot', async () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('gets manufacturers and passes them to list props', async () => {
    expect(spyGetManufacturers).toBeCalledTimes(1);

    expect(
      wrapper.findComponent<DefineComponent<{ manufacturers: IManufacturer[] }>>(manufacturerList).vm.$props
        .manufacturers
    ).toEqual(MANUFACTURERS.data);
  });
});
