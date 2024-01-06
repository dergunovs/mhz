import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { IBaseReply, ISignUpData } from 'mhz-contracts';
import { toast } from 'mhz-ui';

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

const spySetup = vi.spyOn(authServices, 'setup').mockImplementation((options: { onSuccess?: () => void }) => {
  if (options.onSuccess) onSuccessSetup = options.onSuccess;

  return mockMutationReply<IBaseReply, ISignUpData>(spyMutateSetup);
});

const spyToastSuccess = vi.spyOn(toast, 'success');
const spyRouterPush = vi.spyOn(router, 'push');

let wrapper: VueWrapper;

const setupFormFirstName = '[data-test="setup-form-first-name"]';
const setupFormLastName = '[data-test="setup-form-last-name"]';
const setupFormEmail = '[data-test="setup-form-email"]';
const setupFormPassword = '[data-test="setup-form-password"]';
const setupFormButton = '[data-test="setup-form-button"]';

beforeEach(() => {
  wrapper = wrapperFactory(SetupForm, {});
});

enableAutoUnmount(afterEach);

describe('SetupForm', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(SetupForm)).toBeTruthy();
  });

  it('handles setup by form submit', async () => {
    await wrapper.findComponent(setupFormFirstName).setValue(FIRST_NAME);
    await wrapper.findComponent(setupFormLastName).setValue(LAST_NAME);
    await wrapper.findComponent(setupFormEmail).setValue(EMAIL);
    await wrapper.findComponent(setupFormPassword).setValue(PASSWORD);

    expect(spySetup).toBeCalledTimes(1);

    await wrapper.find(setupFormButton).trigger('click');

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
