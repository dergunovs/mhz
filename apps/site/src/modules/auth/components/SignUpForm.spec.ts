import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { IBaseReply, ISignUpData } from 'mhz-contracts';
import { toast } from 'mhz-ui';
import { dataTest } from 'mhz-helpers';

import SignUpForm from './SignUpForm.vue';

import { mockMutationReply, wrapperFactory, router } from '@/common/test';
import * as customerServices from '@/customer/services';
import { URL_LOGIN } from '@/auth/constants';

const FIRST_NAME = 'John';
const LAST_NAME = 'Doe';
const EMAIL = 'a@b.ru';
const PASSWORD = 'qwerty';

let onSuccessSignUp: () => void;
const spyMutateSignUp = vi.fn();

vi.spyOn(customerServices, 'postCustomer').mockImplementation((options: { onSuccess?: () => void }) => {
  if (options.onSuccess) onSuccessSignUp = options.onSuccess;

  return mockMutationReply<IBaseReply, ISignUpData>(spyMutateSignUp);
});

const spyToastSuccess = vi.spyOn(toast, 'success');
const spyRouterPush = vi.spyOn(router, 'push');

const signupForm = dataTest('signup-form');
const signupFormFirstName = dataTest('signup-form-first-name');
const signupFormLastName = dataTest('signup-form-last-name');
const signupFormEmail = dataTest('signup-form-email');
const signupFormPassword = dataTest('signup-form-password');

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(SignUpForm, {});
});

enableAutoUnmount(afterEach);

describe('SignUpForm', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(SignUpForm)).toBeTruthy();
  });

  it('handles signup by form submit', async () => {
    expect(spyMutateSignUp).toBeCalledTimes(0);
    expect(spyToastSuccess).toBeCalledTimes(0);
    expect(spyRouterPush).toBeCalledTimes(0);

    await wrapper.findComponent(signupFormFirstName).setValue(FIRST_NAME);
    await wrapper.findComponent(signupFormLastName).setValue(LAST_NAME);
    await wrapper.findComponent(signupFormEmail).setValue(EMAIL);
    await wrapper.findComponent(signupFormPassword).setValue(PASSWORD);

    await wrapper.find(signupForm).trigger('submit');

    expect(spyMutateSignUp).toBeCalledTimes(1);
    expect(spyMutateSignUp).toBeCalledWith({
      firstName: FIRST_NAME,
      lastName: LAST_NAME,
      email: EMAIL,
      password: PASSWORD,
    });

    onSuccessSignUp();

    expect(spyToastSuccess).toBeCalledTimes(1);

    expect(spyRouterPush).toBeCalledTimes(1);
    expect(spyRouterPush).toBeCalledWith(URL_LOGIN);
  });
});
