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

vi.spyOn(helpers, 'useAuth').mockReturnValue({ auth: spyAuth });

const spySetAuthHeaders = vi.spyOn(helpers, 'setAuthHeader');

const spyToastSuccess = vi.spyOn(toast, 'success');

const loginForm = dataTest('login-form');
const loginFormEmail = dataTest('login-form-email');
const loginFormPassword = dataTest('login-form-password');

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(LoginForm, {});
});

enableAutoUnmount(afterEach);

describe('LoginForm', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(LoginForm)).toBeTruthy();
  });

  it('matches snapshot', async () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('handles login by form submit', async () => {
    expect(spyMutateLogin).toBeCalledTimes(0);
    expect(spyAuth).toBeCalledTimes(0);
    expect(spyToastSuccess).toBeCalledTimes(0);

    await wrapper.findComponent(loginFormEmail).setValue(EMAIL);
    await wrapper.findComponent(loginFormPassword).setValue(PASSWORD);

    await wrapper.find(loginForm).trigger('submit');

    expect(spyMutateLogin).toBeCalledTimes(1);
    expect(spyMutateLogin).toBeCalledWith({ email: EMAIL, password: PASSWORD, role: ROLE });

    onSuccessLogin({ _id: ID, email: EMAIL, role: ROLE, token: TOKEN });

    expect(spyAuth).toBeCalledTimes(1);
    expect(spyAuth).toBeCalledWith(TOKEN, spySetAuthHeaders, TOKEN_NAME);

    expect(spyToastSuccess).toBeCalledTimes(1);
  });
});
