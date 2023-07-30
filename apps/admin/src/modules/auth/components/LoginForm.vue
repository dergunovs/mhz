<template>
  <div>
    <h2>Login</h2>

    <form @submit.prevent="submit" :class="$style.form">
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

import { UiButton, UiField, UiInput, toast } from 'mhz-ui';
import { useValidator, required, email } from 'mhz-validate';

import { postLogin } from '@/auth/services';
import { useAuth } from '@/auth/composables';

const { login } = useAuth();

const formData = ref({
  email: '',
  password: '',
});

const { mutate } = postLogin({
  onSuccess: (token?: string) => {
    if (token) login(token);
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
