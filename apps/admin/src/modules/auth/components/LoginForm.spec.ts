import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { ILoginData, IUserToken } from 'mhz-contracts';
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

const spyLogin = vi
  .spyOn(authServices, 'login')
  .mockImplementation((options: { onSuccess?: (data: IUserToken) => void }) => {
    if (options.onSuccess) onSuccessLogin = options.onSuccess;

    return mockMutationReply<IUserToken, ILoginData>();
  });

const spySetAuthHeaders = vi.spyOn(helpers, 'setAuthHeader').mockImplementation(vi.fn());

const spyAuth = vi.fn();

const spyHelpers = vi.spyOn(helpers, 'useAuth').mockImplementation(() => {
  return { auth: spyAuth, redirectIfAuth: () => undefined };
});

let wrapper: VueWrapper;

const loginFormEmail = '[data-test="login-form-email"]';
const loginFormPassword = '[data-test="login-form-password"]';

beforeEach(() => {
  wrapper = wrapperFactory(LoginForm, {});
});

enableAutoUnmount(afterEach);

describe('LoginForm', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(LoginForm)).toBeTruthy();
  });

  it('sends login data', async () => {
    await wrapper.find(loginFormEmail).setValue(EMAIL);
    await wrapper.find(loginFormPassword).setValue(PASSWORD);

    onSuccessLogin({ _id: ID, email: EMAIL, role: ROLE, token: TOKEN });

    expect(spyLogin).toBeCalledTimes(1);
    expect(spyHelpers).toBeCalledTimes(1);

    expect(spyAuth).toBeCalledWith(TOKEN, URL_MAIN, spySetAuthHeaders, TOKEN_NAME);
  });
});
