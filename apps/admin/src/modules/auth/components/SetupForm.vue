<template>
  <div>
    <h2>Add first manager</h2>

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
import { useRouter } from 'vue-router';

import { UiButton, UiField, UiInput, toast } from 'mhz-ui';
import { useValidator, required, email } from 'mhz-helpers';

import { setup } from '@/auth/services';
import { URL_LOGIN } from '@/auth/constants';

const router = useRouter();

const formData = ref({
  email: '',
  password: '',
});

const { mutate } = setup({
  onSuccess: () => {
    toast.success('Manager successfully added!');
    router.push(URL_LOGIN);
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
