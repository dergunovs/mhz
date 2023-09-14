<template>
  <form @submit.prevent="handleSubmit" :class="$style.form">
    <div :class="$style.categories">
      <div v-for="category in props.categories" :key="category._id" :class="$style.category">
        <img
          :src="`${PATH_UPLOAD}/${category.iconUrl}`"
          :class="$style.icon"
          width="32"
          height="32"
          loading="lazy"
          crossorigin="anonymous"
        />

        <button
          @click="updateCategory(`${category._id}`)"
          type="button"
          :class="$style.title"
          :data-current="props.currentCategory === category._id"
        >
          {{ category.title }}
        </button>
      </div>
    </div>

    <div :class="$style.fields">
      <UiField label="Title" isRequired :error="error('title')">
        <UiInput v-model="formData.title" />
      </UiField>

      <UiCheckbox v-model="formData.isShared" isSwitcher labelSwitcher="Share configuration" />

      <UiField v-if="formData.isShared" label="Link">
        <UiInput isDisabled :modelValue="link" isCopy />
      </UiField>

      <UiButton type="submit">Save configuration</UiButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

import { UiButton, UiCheckbox, UiField, UiInput } from 'mhz-ui';
import { ICategory, IConfiguration, IConfigurationParts, IProduct } from 'mhz-types';
import { clone, required, useValidator } from 'mhz-helpers';

import { getCurrentCustomer } from '@/customer/services';
import { PATH_UPLOAD } from '@/common/constants';

interface IProps {
  categories: ICategory[];
  currentCategory: string;
  choosenProduct?: IProduct;
}

const props = defineProps<IProps>();
const emit = defineEmits(['update']);

const { data: customer } = getCurrentCustomer();

const formData = ref<IConfiguration>({
  title: '',
  isShared: false,
  customer: undefined,
  parts: {} as IConfigurationParts,
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

function updateCategory(id: string) {
  emit('update', id);
}

watch(
  () => props.choosenProduct,
  () => {
    if (props.choosenProduct) {
      const key = props.choosenProduct.category.title as keyof IConfigurationParts;

      formData.value.parts[key] = props.choosenProduct;
    }
  }
);
</script>

<style module lang="scss">
.form {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 24px;
  width: 240px;
  padding-right: 16px;
  border-right: 1px solid var(--color-gray);
}

.categories {
  display: flex;
  flex-direction: column;
}

.category {
  display: flex;
  gap: 8px;
  align-items: center;
}

.icon {
  width: 32px;
  height: 32px;
}

.title {
  font-size: 1rem;
  cursor: pointer;
  background: none;
  border: 0;

  &[data-current='true'] {
    color: var(--color-primary);
  }
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
