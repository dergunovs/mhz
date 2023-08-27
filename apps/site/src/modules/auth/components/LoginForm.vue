<template>
  <div>
    <h2>Login</h2>

    <form @submit.prevent="submit" :class="$style.form">
      <UiField label="E-mail" isRequired :error="error('email')">
        <UiInput v-model="formData.email" isFocus />
      </UiField>

      <UiField label="Password" isRequired :error="error('password')">
        <UiInput v-model="formData.password" type="password" />
      </UiField>

      <UiButton type="submit">Submit</UiButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import { UiButton, UiField, UiInput, toast } from 'mhz-ui';
import { useValidator, required, email, useAuth } from 'mhz-helpers';

import { login } from '@/auth/services';
import { URL_MAIN } from '@/common/constants';
import { setAuthHeader } from '@/common/services/api';
import { TOKEN_NAME } from '@/auth/constants';

const { auth } = useAuth();

const formData = ref({
  email: '',
  password: '',
});

const { mutate } = login({
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
  if (isValid()) mutate(formData.value);
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
