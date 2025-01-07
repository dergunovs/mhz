import { DefineComponent } from 'vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount, flushPromises } from '@vue/test-utils';
import { API_MANAGER, IManager, IBaseReply } from 'mhz-contracts';
import { toast } from 'mhz-ui';
import * as helpers from 'mhz-helpers';
import { dataTest } from 'mhz-helpers';

import ManagerForm from './ManagerForm.vue';

import { wrapperFactory, mockMutationReply, router } from '@/common/test';
import { MANAGERS } from '@/manager/fixtures';
import { URL_MANAGER } from '@/manager/constants';
import * as managerServices from '@/manager/services';

let onSuccessPost: () => void;
const spyMutatePost = vi.fn();

vi.spyOn(managerServices, 'postManager').mockImplementation((options: { onSuccess?: () => void }) => {
  if (options.onSuccess) onSuccessPost = options.onSuccess;

  return mockMutationReply<IBaseReply, IManager>(spyMutatePost);
});

let onSuccessUpdate: () => void;
const spyMutateUpdate = vi.fn();

vi.spyOn(managerServices, 'updateManager').mockImplementation((options: { onSuccess?: () => void }) => {
  if (options.onSuccess) onSuccessUpdate = options.onSuccess;

  return mockMutationReply<IBaseReply, IManager>(spyMutateUpdate);
});

let onSuccessDelete: () => void;
const spyMutateDelete = vi.fn();

vi.spyOn(managerServices, 'deleteManager').mockImplementation((options: { onSuccess?: () => void }) => {
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

const MANAGER = MANAGERS.data[0];
const QUERY_KEY = { queryKey: [API_MANAGER] };

const managerForm = dataTest('manager-form');
const managerFormFirstName = dataTest('manager-form-first-name');
const managerFormLastName = dataTest('manager-form-last-name');
const managerFormEmail = dataTest('manager-form-email');
const managerFormPassword = dataTest('manager-form-password');
const managerFormButtons = dataTest('manager-form-buttons');

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(ManagerForm, {
    props: {
      manager: MANAGER,
    },
  });
});

enableAutoUnmount(afterEach);

describe('ManagerForm', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(ManagerForm)).toBeTruthy();
  });

  it('shows manager content in fields if props is passed', async () => {
    expect(wrapper.findComponent(managerFormFirstName).attributes('modelvalue')).toBe(MANAGER.firstName);
    expect(wrapper.findComponent(managerFormLastName).attributes('modelvalue')).toBe(MANAGER.lastName);
    expect(wrapper.findComponent(managerFormEmail).attributes('modelvalue')).toBe(MANAGER.email);
  });

  it('updates manager', async () => {
    expect(spyMutateUpdate).toBeCalledTimes(0);
    expect(spyRefetchQueries).toBeCalledTimes(0);
    expect(spyToastSuccess).toBeCalledTimes(0);

    const NEW_MANAGER_EMAIL = 'new@email.com';

    await wrapper.findComponent(managerFormEmail).setValue(NEW_MANAGER_EMAIL);

    await wrapper.find(managerForm).trigger('submit');

    expect(spyMutateUpdate).toBeCalledTimes(1);
    expect(spyMutateUpdate).toBeCalledWith({ ...MANAGER, email: NEW_MANAGER_EMAIL });

    onSuccessUpdate();

    expect(spyRefetchQueries).toBeCalledTimes(1);
    expect(spyRefetchQueries).toBeCalledWith(QUERY_KEY);

    await flushPromises();

    expect(spyToastSuccess).toBeCalledTimes(1);
  });

  it('deletes manager', async () => {
    expect(spyMutateDelete).toBeCalledTimes(0);
    expect(spyRemoveQueries).toBeCalledTimes(0);
    expect(spyRefetchQueries).toBeCalledTimes(0);
    expect(spyToastSuccess).toBeCalledTimes(0);
    expect(spyRouterPush).toBeCalledTimes(0);

    wrapper.findComponent<DefineComponent>(managerFormButtons).vm.$emit('delete', MANAGER._id);

    expect(spyMutateDelete).toBeCalledTimes(1);
    expect(spyMutateDelete).toBeCalledWith(MANAGER._id);

    onSuccessDelete();

    expect(spyRemoveQueries).toBeCalledTimes(1);
    expect(spyRemoveQueries).toBeCalledWith(QUERY_KEY);

    expect(spyRefetchQueries).toBeCalledTimes(1);
    expect(spyRefetchQueries).toBeCalledWith(QUERY_KEY);

    await flushPromises();

    expect(spyToastSuccess).toBeCalledTimes(1);

    expect(spyRouterPush).toBeCalledTimes(1);
    expect(spyRouterPush).toBeCalledWith(URL_MANAGER);
  });

  it('creates manager', async () => {
    wrapper.unmount();

    expect(spyMutatePost).toBeCalledTimes(0);
    expect(spyRefetchQueries).toBeCalledTimes(0);
    expect(spyToastSuccess).toBeCalledTimes(0);
    expect(spyRouterPush).toBeCalledTimes(0);

    const wrapperWithoutManager = wrapperFactory(ManagerForm, {});

    const NEW_MANAGER = {
      firstName: 'Petr',
      lastName: 'Alekseev',
      email: 'new@mail.ru',
      password: 'qwerty',
    };

    await wrapperWithoutManager.findComponent(managerFormFirstName).setValue(NEW_MANAGER.firstName);
    await wrapperWithoutManager.findComponent(managerFormLastName).setValue(NEW_MANAGER.lastName);
    await wrapperWithoutManager.findComponent(managerFormEmail).setValue(NEW_MANAGER.email);
    await wrapperWithoutManager.findComponent(managerFormPassword).setValue(NEW_MANAGER.password);

    await wrapperWithoutManager.find(managerForm).trigger('submit');

    expect(spyMutatePost).toBeCalledTimes(1);
    expect(spyMutatePost).toBeCalledWith(NEW_MANAGER);

    onSuccessPost();

    expect(spyRefetchQueries).toBeCalledTimes(1);
    expect(spyRefetchQueries).toBeCalledWith(QUERY_KEY);

    await flushPromises();

    expect(spyToastSuccess).toBeCalledTimes(1);

    expect(spyRouterPush).toBeCalledTimes(1);
    expect(spyRouterPush).toBeCalledWith(URL_MANAGER);
  });
});
