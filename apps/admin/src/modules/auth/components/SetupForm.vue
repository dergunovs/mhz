<template>
  <div>
    <ImageLogo />

    <h2>Add first manager</h2>

    <form @submit.prevent="submit" :class="$style.form" data-test="setup-form">
      <UiField label="First name" isRequired :error="error('firstName')">
        <UiInput v-model="formData.firstName" isFocus data-test="setup-form-first-name" />
      </UiField>

      <UiField label="Last name" isRequired :error="error('lastName')">
        <UiInput v-model="formData.lastName" data-test="setup-form-last-name" />
      </UiField>

      <UiField label="E-mail" isRequired :error="error('email')">
        <UiInput v-model="formData.email" data-test="setup-form-email" />
      </UiField>

      <UiField label="Password" isRequired :error="error('password')">
        <UiInput v-model="formData.password" type="password" data-test="setup-form-password" />
      </UiField>

      <UiButton type="submit">Submit</UiButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { UiButton, UiField, UiInput, toast } from 'mhz-ui';
import { useValidator, required, email } from 'mhz-helpers';
import { ISignUpData } from 'mhz-contracts';

import ImageLogo from '@/layout/icons/logo.svg';
import { setup } from '@/auth/services';
import { URL_LOGIN } from '@/auth/constants';

const router = useRouter();

const formData = ref<ISignUpData>({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
});

const { mutate: mutateSetup } = setup({
  onSuccess: () => {
    toast.success('Manager successfully added!');
    router.push(URL_LOGIN);
  },
});

const { error, isValid } = useValidator(formData, {
  firstName: [required('en')],
  lastName: [required('en')],
  email: [required('en'), email('en')],
  password: [required('en')],
});

function submit() {
  if (isValid()) mutateSetup(formData.value);
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
