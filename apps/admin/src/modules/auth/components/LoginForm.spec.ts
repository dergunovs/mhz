import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { ILoginData, IUserToken } from 'mhz-contracts';
import { toast } from 'mhz-ui';
import * as helpers from 'mhz-helpers';

import LoginForm from './LoginForm.vue';

import { TOKEN_NAME } from '@/auth/constants';
import { URL_MAIN } from '@/common/constants';

import { wrapperFactory, mockMutationReply } from '@/common/test';
import * as authServices from '@/auth/services';

const EMAIL = 'a@b.ru';
const PASSWORD = 'qwerty';
const ROLE = 'manager';
const TOKEN = 'b87dfnyte97bhrevber9vu9e';
const ID = '97fdb9eubhe';

let onSuccessLogin: (data: IUserToken) => void;
const spyMutateLogin = vi.fn();

vi.spyOn(authServices, 'login').mockImplementation((options: { onSuccess?: (data: IUserToken) => void }) => {
  if (options.onSuccess) onSuccessLogin = options.onSuccess;

  return mockMutationReply<IUserToken, ILoginData>(spyMutateLogin);
});

const spyAuth = vi.fn();

vi.spyOn(helpers, 'useAuth').mockReturnValue({ auth: spyAuth, redirectIfAuth: () => undefined });

const spySetAuthHeaders = vi.spyOn(helpers, 'setAuthHeader');

const spyToastSuccess = vi.spyOn(toast, 'success');

let wrapper: VueWrapper;

const loginFormEmail = '[data-test="login-form-email"]';
const loginFormPassword = '[data-test="login-form-password"]';
const loginFormButton = '[data-test="login-form-button"]';

beforeEach(() => {
  wrapper = wrapperFactory(LoginForm, {});
});

enableAutoUnmount(afterEach);

describe('LoginForm', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(LoginForm)).toBeTruthy();
  });

  it('handles login by form submit', async () => {
    await wrapper.findComponent(loginFormEmail).setValue(EMAIL);
    await wrapper.findComponent(loginFormPassword).setValue(PASSWORD);

    await wrapper.find(loginFormButton).trigger('click');

    expect(spyMutateLogin).toBeCalledTimes(1);
    expect(spyMutateLogin).toBeCalledWith({ email: EMAIL, password: PASSWORD, role: ROLE });

    onSuccessLogin({ _id: ID, email: EMAIL, role: ROLE, token: TOKEN });

    expect(spyAuth).toBeCalledTimes(1);
    expect(spyAuth).toBeCalledWith(TOKEN, URL_MAIN, spySetAuthHeaders, TOKEN_NAME);

    expect(spyToastSuccess).toBeCalledTimes(1);
  });
});
