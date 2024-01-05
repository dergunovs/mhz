<template>
  <div>
    <ImageLogo />

    <h2>Login</h2>

    <form @submit.prevent="submit" :class="$style.form">
      <UiField label="E-mail" isRequired :error="error('email')">
        <UiInput v-model="formData.email" isFocus data-test="login-form-email" />
      </UiField>

      <UiField label="Password" isRequired :error="error('password')">
        <UiInput v-model="formData.password" type="password" data-test="login-form-password" />
      </UiField>

      <UiButton type="submit" data-test="login-form-button">Submit</UiButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import { UiButton, UiField, UiInput, toast } from 'mhz-ui';
import { useValidator, required, email, useAuth, setAuthHeader } from 'mhz-helpers';
import { ILoginData } from 'mhz-contracts';

import ImageLogo from '@/layout/icons/logo.svg';
import { login } from '@/auth/services';
import { TOKEN_NAME } from '@/auth/constants';
import { URL_MAIN } from '@/common/constants';

const { auth } = useAuth();

const formData = ref<ILoginData>({
  email: '',
  password: '',
  role: 'manager',
});

const { mutate: mutateLogin } = login({
  onSuccess: (user: { token: string }) => {
    auth(user.token, URL_MAIN, setAuthHeader, TOKEN_NAME);
    toast.success('Welcome!');
  },
});

const rules = computed(() => {
  return {
    email: [required, email],
    password: required,
  };
});

const { error, isValid } = useValidator(formData, rules);

function submit() {
  if (isValid()) mutateLogin(formData.value);
}
</script>

<style module lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 300px;
}
</style>
