import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { ILoginData, IUserToken } from 'mhz-contracts';
import { toast } from 'mhz-ui';
import * as helpers from 'mhz-helpers';
import { dataTest } from 'mhz-helpers';

import LoginForm from './LoginForm.vue';

import { TOKEN_NAME } from '@/auth/constants';

import { wrapperFactory, mockMutationReply } from '@/common/test';
import * as authServices from '@/auth/services';

const EMAIL = 'a@b.ru';
const PASSWORD = 'qwerty';
const ROLE = 'customer';
const TOKEN = 'b87dfnyte97bhrevber9vu9e';
const ID = '97fdb9eubhe';

const spyMutateLogin = vi.fn();
const spyAuth = vi.fn();
const spySetAuthHeaders = vi.spyOn(helpers, 'setAuthHeader');
const spyToastSuccess = vi.spyOn(toast, 'success');

const loginForm = dataTest('login-form');
const loginFormEmail = dataTest('login-form-email');
const loginFormPassword = dataTest('login-form-password');

vi.spyOn(helpers, 'useAuth').mockReturnValue({ auth: spyAuth });

describe('LoginForm', () => {
  let wrapper: VueWrapper;
  let onSuccessLogin: (data: IUserToken) => void;

  vi.spyOn(authServices, 'login').mockImplementation((options: { onSuccess?: (data: IUserToken) => void }) => {
    if (options.onSuccess) onSuccessLogin = options.onSuccess;

    return mockMutationReply<IUserToken, ILoginData>(spyMutateLogin);
  });

  beforeEach(() => {
    wrapper = wrapperFactory(LoginForm, {});
  });

  enableAutoUnmount(afterEach);

  it('exists', () => {
    expect(wrapper.findComponent(LoginForm)).toBeTruthy();
  });

  it('handles login by form submit', async () => {
    expect(spyMutateLogin).toHaveBeenCalledTimes(0);
    expect(spyAuth).toHaveBeenCalledTimes(0);
    expect(spyToastSuccess).toHaveBeenCalledTimes(0);

    await wrapper.findComponent(loginFormEmail).setValue(EMAIL);
    await wrapper.findComponent(loginFormPassword).setValue(PASSWORD);

    await wrapper.find(loginForm).trigger('submit');

    expect(spyMutateLogin).toHaveBeenCalledTimes(1);
    expect(spyMutateLogin).toHaveBeenCalledWith({ email: EMAIL, password: PASSWORD, role: ROLE });

    onSuccessLogin({ _id: ID, email: EMAIL, role: ROLE, token: TOKEN });

    expect(spyAuth).toHaveBeenCalledTimes(1);
    expect(spyAuth).toHaveBeenCalledWith(TOKEN, spySetAuthHeaders, TOKEN_NAME);

    expect(spyToastSuccess).toHaveBeenCalledTimes(1);
  });
});
