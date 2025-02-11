import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { IBaseReply, ISignUpData } from 'mhz-contracts';
import { toast } from 'mhz-ui';
import { dataTest } from 'mhz-helpers';

import SetupForm from './SetupForm.vue';

import { mockMutationReply, wrapperFactory, router } from '@/common/test';
import * as authServices from '@/auth/services';
import { URL_LOGIN } from '@/auth/constants';

const FIRST_NAME = 'John';
const LAST_NAME = 'Doe';
const EMAIL = 'a@b.ru';
const PASSWORD = 'qwerty';

let onSuccessSetup: () => void;
const spyMutateSetup = vi.fn();

vi.spyOn(authServices, 'setup').mockImplementation((options: { onSuccess?: () => void }) => {
  if (options.onSuccess) onSuccessSetup = options.onSuccess;

  return mockMutationReply<IBaseReply, ISignUpData>(spyMutateSetup);
});

const spyToastSuccess = vi.spyOn(toast, 'success');
const spyRouterPush = vi.spyOn(router, 'push');

const setupForm = dataTest('setup-form');
const setupFormFirstName = dataTest('setup-form-first-name');
const setupFormLastName = dataTest('setup-form-last-name');
const setupFormEmail = dataTest('setup-form-email');
const setupFormPassword = dataTest('setup-form-password');

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(SetupForm, {});
});

enableAutoUnmount(afterEach);

describe('SetupForm', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(SetupForm)).toBeTruthy();
  });

  it('matches snapshot', async () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('handles setup by form submit', async () => {
    expect(spyMutateSetup).toBeCalledTimes(0);
    expect(spyToastSuccess).toBeCalledTimes(0);
    expect(spyRouterPush).toBeCalledTimes(0);

    await wrapper.findComponent(setupFormFirstName).setValue(FIRST_NAME);
    await wrapper.findComponent(setupFormLastName).setValue(LAST_NAME);
    await wrapper.findComponent(setupFormEmail).setValue(EMAIL);
    await wrapper.findComponent(setupFormPassword).setValue(PASSWORD);

    await wrapper.find(setupForm).trigger('submit');

    expect(spyMutateSetup).toBeCalledTimes(1);
    expect(spyMutateSetup).toBeCalledWith({
      firstName: FIRST_NAME,
      lastName: LAST_NAME,
      email: EMAIL,
      password: PASSWORD,
    });

    onSuccessSetup();

    expect(spyToastSuccess).toBeCalledTimes(1);

    expect(spyRouterPush).toBeCalledTimes(1);
    expect(spyRouterPush).toBeCalledWith(URL_LOGIN);
  });
});
