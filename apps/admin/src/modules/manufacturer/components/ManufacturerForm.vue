<template>
  <form @submit.prevent="submit" :class="$style.form">
    <UiField label="Название" isRequired :error="error('title')">
      <UiInput v-model="formData.title" />
    </UiField>

    <UiField label="Описание" isRequired :error="error('description')">
      <UiInput v-model="formData.description" />
    </UiField>

    <UiField label="Страна" isRequired :error="error('country')">
      <UiInput v-model="formData.country" />
    </UiField>

    <UiUpload
      label="Логотип"
      :files="logoFile"
      isSingle
      isRequired
      :isDisabled="!!formData.logoUrl"
      :error="error('logoUrl')"
      @add="addLogoFile"
      @remove="removeLogoFile"
      @upload="uploadLogoFile"
    />

    <div v-if="formData.logoUrl">
      {{ formData.logoUrl }} <UiButton @click="formData.logoUrl = ''" layout="plain">Удалить</UiButton>
    </div>

    <div :class="$style.buttons">
      <UiButton type="submit" :isDisabled="isLoading">Отправить</UiButton>
      <UiButton @click="$router.go(-1)" layout="secondary" :isDisabled="isLoading">Назад</UiButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import { useQueryClient } from '@tanstack/vue-query';

import { UiField, UiInput, UiButton, UiUpload, toast } from 'mhz-ui';
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
    toast.success('Производитель добавлен');
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

const logoFile = ref<File[]>([]);

function addLogoFile(file: File) {
  logoFile.value = [file];
}

function removeLogoFile() {
  logoFile.value = [];
}

function uploadLogoFile() {
  formData.value.logoUrl = logoFile.value[0].name;
  removeLogoFile();
}
</script>

<style module lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.buttons {
  display: flex;
  justify-content: space-between;
}
</style>
