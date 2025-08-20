<template>
  <div>
    <ImageLogo />

    <h2>Sign up</h2>

    <form @submit.prevent="submit" :class="$style.form" data-test="signup-form">
      <p>We remind you that this is not a real online store. You can use any data.</p>

      <UiField label="First name" isRequired :error="error('firstName')">
        <UiInput v-model="formData.firstName" isFocus data-test="signup-form-first-name" />
      </UiField>

      <UiField label="Last name" isRequired :error="error('lastName')">
        <UiInput v-model="formData.lastName" data-test="signup-form-last-name" />
      </UiField>

      <UiField label="E-mail" isRequired :error="error('email')">
        <UiInput v-model="formData.email" data-test="signup-form-email" />
      </UiField>

      <UiField label="Password" isRequired :error="error('password')">
        <UiInput v-model="formData.password" type="password" data-test="signup-form-password" />
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
import { postCustomer } from '@/customer/services';
import { URL_LOGIN } from '@/auth/constants';

const router = useRouter();

const formData = ref<ISignUpData>({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
});

const { mutate: mutatePostCustomer } = postCustomer({
  onSuccess: () => {
    toast.success('Successfully registered! Please login!');
    router.push(URL_LOGIN);
  },
});

const { error, isValid } = useValidator(
  formData,
  { firstName: [required], lastName: [required], email: [required, email], password: [required] },
  'en'
);

function submit() {
  if (isValid()) mutatePostCustomer(formData.value);
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
