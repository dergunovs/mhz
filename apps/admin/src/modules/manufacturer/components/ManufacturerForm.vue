<template>
  <form @submit.prevent="submit" :class="$style.form">
    <UiField label="Название" isRequired :error="error('title')">
      <UiInput v-model="formData.title" />
    </UiField>

    <UiField label="Описание" isRequired :error="error('description')">
      <UiInput v-model="formData.description" />
    </UiField>

    <UiField label="Логотип" isRequired :error="error('logoUrl')">
      <UiInput v-model="formData.logoUrl" />
    </UiField>

    <UiField label="Страна" isRequired :error="error('country')">
      <UiInput v-model="formData.country" />
    </UiField>

    <UiButton type="submit" :isDisabled="isLoading">Отправить</UiButton>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import { useQueryClient } from '@tanstack/vue-query';

import { UiField, UiInput, UiButton } from 'mhz-ui';
import { IManufacturer } from 'mhz-types';
import { useValidator, required } from 'mhz-validate';

import { API_MANUFACTURER, URL_MANUFACTURER } from '@/manufacturer/constants';
import { postManufacturer } from '@/manufacturer/services';

const queryClient = useQueryClient();

const router = useRouter();

const formData = ref<IManufacturer>({
  title: '',
  description: '',
  logoUrl: '',
  country: '',
});

const { mutate, isLoading } = postManufacturer({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_MANUFACTURER], exact: true });
    router.push(URL_MANUFACTURER);
  },
});

const rules = computed(() => {
  return {
    title: required,
    description: required,
    logoUrl: required,
    country: required,
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
}
</style>
