import { DefineComponent } from 'vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { IManufacturer } from 'mhz-contracts';
import { dataTest } from 'mhz-helpers';

import ManufacturerEditPage from './ManufacturerEditPage.vue';

import { mockQueryReply, wrapperFactory } from '@/common/test';
import * as manufacturerServices from '@/manufacturer/services';
import { MANUFACTURERS } from '@/manufacturer/fixtures';

const MANUFACTURER = MANUFACTURERS.data[0];

const spyGetManufacturer = vi
  .spyOn(manufacturerServices, 'getManufacturer')
  .mockReturnValue(mockQueryReply(MANUFACTURER));

const manufacturerEditPageForm = dataTest('manufacturer-edit-page-form');

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(ManufacturerEditPage, {});
});

enableAutoUnmount(afterEach);

describe('ManufacturerEditPage', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(ManufacturerEditPage)).toBeTruthy();
  });

  it('gets manufacturer and passes it to form props', async () => {
    expect(spyGetManufacturer).toBeCalledTimes(1);

    expect(
      wrapper.findComponent<DefineComponent<{ manufacturer: IManufacturer }>>(manufacturerEditPageForm).vm.$props
        .manufacturer
    ).toEqual(MANUFACTURER);
  });
});
