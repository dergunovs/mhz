<template>
  <form @submit.prevent="handleSubmit" :class="$style.form">
    <UiField label="Title" isRequired :error="error('title')">
      <UiInput v-model="formData.title" isFocus />
    </UiField>

    <UiCheckbox v-model="formData.isShared" isSwitcher labelSwitcher="Share configuration" />

    <UiField v-if="formData.isShared" label="Link">
      <UiInput isDisabled :modelValue="link" isCopy />
    </UiField>

    <UiButton type="submit">Save configuration</UiButton>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import { UiButton, UiCheckbox, UiField, UiInput } from 'mhz-ui';
import { IConfiguration } from 'mhz-types';
import { clone, required, useValidator } from 'mhz-helpers';

import { getCurrentCustomer } from '@/customer/services';

const { data: customer } = getCurrentCustomer();

const formData = ref<IConfiguration>({
  title: '',
  isShared: false,
  customer: undefined,
});

const link = computed(() => window.location.href);

const rules = computed(() => {
  return {
    title: required,
  };
});

const { error, isValid } = useValidator(formData, rules);

function handleSubmit() {
  if (isValid()) {
    formData.value.customer = clone(customer.value);
  }
}
</script>

<style module lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
  width: 400px;
}
</style>
