<template>
  <form @submit.prevent="submit" :class="$style.form">
    <UiField label="E-mail" isRequired>
      <UiInput v-model="formData.email" />
    </UiField>

    <UiField label="Пароль" isRequired>
      <UiInput v-model="formData.password" />
    </UiField>

    <UiButton type="submit">Войти</UiButton>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { UiButton, UiField, UiInput } from 'mhz-ui';

import { postLogin } from '@/auth/services';
import { useAuth } from '@/auth/composables';

const { login } = useAuth();

const formData = ref({
  email: '',
  password: '',
});

const { mutate } = postLogin(formData, {
  onSuccess: (token?: string) => {
    if (token) login(token);
  },
});

async function submit() {
  try {
    mutate();
  } catch (error) {
    alert(`Исправьте ошибки валидации`);
  }
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
