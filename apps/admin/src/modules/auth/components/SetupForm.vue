<template>
  <div>
    <ImageLogo />

    <h2>Add first manager</h2>

    <form @submit.prevent="submit" :class="$style.form">
      <UiField label="First name" isRequired :error="error('firstName')">
        <UiInput v-model="formData.firstName" isFocus />
      </UiField>

      <UiField label="Last name" isRequired :error="error('lastName')">
        <UiInput v-model="formData.lastName" />
      </UiField>

      <UiField label="E-mail" isRequired :error="error('email')">
        <UiInput v-model="formData.email" />
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

const rules = computed(() => {
  return {
    firstName: required,
    lastName: required,
    email: [required, email],
    password: required,
  };
});

const { error, isValid } = useValidator(formData, rules);

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
