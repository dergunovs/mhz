import { DefineComponent } from 'vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount, flushPromises } from '@vue/test-utils';
import { IManufacturer, IBaseReply, API_MANUFACTURER } from 'mhz-contracts';
import { toast } from 'mhz-ui';
import * as helpers from 'mhz-helpers';
import { dataTest } from 'mhz-helpers';

import ManufacturerForm from './ManufacturerForm.vue';

import { wrapperFactory, mockMutationReply, router } from '@/common/test';
import { MANUFACTURERS } from '@/manufacturer/fixtures';
import { URL_MANUFACTURER } from '@/manufacturer/constants';
import * as manufacturerServices from '@/manufacturer/services';

const MANUFACTURER = MANUFACTURERS.data[0];

let onSuccessPost: () => void;
const spyMutatePost = vi.fn();

vi.spyOn(manufacturerServices, 'postManufacturer').mockImplementation((options: { onSuccess?: () => void }) => {
  if (options.onSuccess) onSuccessPost = options.onSuccess;

  return mockMutationReply<IBaseReply, IManufacturer>(spyMutatePost);
});

let onSuccessUpdate: () => void;
const spyMutateUpdate = vi.fn();

vi.spyOn(manufacturerServices, 'updateManufacturer').mockImplementation((options: { onSuccess?: () => void }) => {
  if (options.onSuccess) onSuccessUpdate = options.onSuccess;

  return mockMutationReply<IBaseReply, IManufacturer>(spyMutateUpdate);
});

let onSuccessDelete: () => void;
const spyMutateDelete = vi.fn();

vi.spyOn(manufacturerServices, 'deleteManufacturer').mockImplementation((options: { onSuccess?: () => void }) => {
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

const QUERY_KEY = { queryKey: [API_MANUFACTURER] };

const manufacturerForm = dataTest('manufacturer-form');
const manufacturerFormTitle = dataTest('manufacturer-form-title');
const manufacturerFormDescription = dataTest('manufacturer-form-description');
const manufacturerFormCountry = dataTest('manufacturer-form-country');
const manufacturerFormLogo = dataTest('manufacturer-form-logo');
const manufacturerFormButtons = dataTest('manufacturer-form-buttons');

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(ManufacturerForm, {
    props: {
      manufacturer: MANUFACTURER,
    },
  });
});

enableAutoUnmount(afterEach);

describe('ManufacturerForm', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(manufacturerForm)).toBeTruthy();
  });

  it('matches snapshot', async () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('shows manufacturer content in fields if props is passed', async () => {
    expect(wrapper.findComponent(manufacturerFormTitle).attributes('modelvalue')).toBe(MANUFACTURER.title);
    expect(wrapper.findComponent(manufacturerFormDescription).attributes('modelvalue')).toBe(MANUFACTURER.description);
    expect(wrapper.findComponent(manufacturerFormCountry).attributes('modelvalue')).toBe(MANUFACTURER.country);
    expect(wrapper.findComponent(manufacturerFormLogo).attributes('urls')).toBe(MANUFACTURER.logoUrl);
  });

  it('shows icon preview if manufacturer has fields', async () => {
    expect(wrapper.findComponent(manufacturerFormLogo).exists()).toBe(true);

    await wrapper.setProps({ manufacturer: undefined });

    expect(wrapper.findComponent(manufacturerFormLogo).exists()).toBe(true);
  });

  it('updates manufacturer', async () => {
    expect(spyMutateUpdate).toBeCalledTimes(0);
    expect(spyRefetchQueries).toBeCalledTimes(0);
    expect(spyToastSuccess).toBeCalledTimes(0);

    const NEW_MANUFACTURER_TITLE = 'yo';

    await wrapper.findComponent(manufacturerFormTitle).setValue(NEW_MANUFACTURER_TITLE);

    await wrapper.find(manufacturerForm).trigger('submit');

    expect(spyMutateUpdate).toBeCalledTimes(1);
    expect(spyMutateUpdate).toBeCalledWith({ ...MANUFACTURER, title: NEW_MANUFACTURER_TITLE });

    onSuccessUpdate();

    expect(spyRefetchQueries).toBeCalledTimes(1);
    expect(spyRefetchQueries).toBeCalledWith(QUERY_KEY);

    await flushPromises();

    expect(spyToastSuccess).toBeCalledTimes(1);
  });

  it('deletes manufacturer', async () => {
    expect(spyMutateDelete).toBeCalledTimes(0);
    expect(spyRemoveQueries).toBeCalledTimes(0);
    expect(spyRefetchQueries).toBeCalledTimes(0);
    expect(spyToastSuccess).toBeCalledTimes(0);
    expect(spyRouterPush).toBeCalledTimes(0);

    wrapper.findComponent<DefineComponent>(manufacturerFormButtons).vm.$emit('delete', MANUFACTURER._id);

    expect(spyMutateDelete).toBeCalledTimes(1);
    expect(spyMutateDelete).toBeCalledWith(MANUFACTURER._id);

    onSuccessDelete();

    expect(spyRemoveQueries).toBeCalledTimes(1);
    expect(spyRemoveQueries).toBeCalledWith(QUERY_KEY);

    expect(spyRefetchQueries).toBeCalledTimes(1);
    expect(spyRefetchQueries).toBeCalledWith(QUERY_KEY);

    await flushPromises();

    expect(spyToastSuccess).toBeCalledTimes(1);

    expect(spyRouterPush).toBeCalledTimes(1);
    expect(spyRouterPush).toBeCalledWith(URL_MANUFACTURER);
  });

  it('creates manufacturer', async () => {
    wrapper.unmount();

    expect(spyMutatePost).toBeCalledTimes(0);
    expect(spyRefetchQueries).toBeCalledTimes(0);
    expect(spyToastSuccess).toBeCalledTimes(0);
    expect(spyRouterPush).toBeCalledTimes(0);

    const wrapperWithoutManufacturer = wrapperFactory(ManufacturerForm, {});

    const NEW_MANUFACTURER = {
      title: 'hi',
      description: 'text',
      country: 'Russia',
      logoUrl: 'pic.jpg',
    };

    await wrapperWithoutManufacturer.findComponent(manufacturerFormTitle).setValue(NEW_MANUFACTURER.title);
    await wrapperWithoutManufacturer.findComponent(manufacturerFormDescription).setValue(NEW_MANUFACTURER.description);
    await wrapperWithoutManufacturer.findComponent(manufacturerFormCountry).setValue(NEW_MANUFACTURER.country);

    wrapperWithoutManufacturer.vm.formData.logoUrl = NEW_MANUFACTURER.logoUrl;

    await wrapperWithoutManufacturer.find(manufacturerForm).trigger('submit');

    expect(spyMutatePost).toBeCalledTimes(1);
    expect(spyMutatePost).toBeCalledWith(NEW_MANUFACTURER);

    onSuccessPost();

    expect(spyRefetchQueries).toBeCalledTimes(1);
    expect(spyRefetchQueries).toBeCalledWith(QUERY_KEY);

    await flushPromises();

    expect(spyToastSuccess).toBeCalledTimes(1);

    expect(spyRouterPush).toBeCalledTimes(1);
    expect(spyRouterPush).toBeCalledWith(URL_MANUFACTURER);
  });
});
