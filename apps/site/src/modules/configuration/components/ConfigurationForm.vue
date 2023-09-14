<template>
  <form @submit.prevent="handleSubmit" :class="$style.form">
    <div :class="$style.fields">
      <UiField label="Title" isRequired :error="error('title')">
        <UiInput v-model="formData.title" />
      </UiField>

      <UiCheckbox v-model="formData.isShared" isSwitcher labelSwitcher="Share configuration" />

      <UiField v-if="formData.isShared" label="Link">
        <UiInput isDisabled :modelValue="link" isCopy />
      </UiField>

      <div>
        <b>Summary price: {{ price }} {{ CURRENCY }}</b>
      </div>

      <UiButton type="submit">Save configuration</UiButton>
    </div>

    <div :class="$style.categories">
      <div v-for="category in props.categories" :key="category._id" :class="$style.category">
        <button
          @click="updateCategory(`${category._id}`)"
          type="button"
          :class="$style.title"
          :data-current="props.currentCategory === category._id"
        >
          <img
            :src="`${PATH_UPLOAD}/${category.iconUrl}`"
            :class="$style.icon"
            width="32"
            height="32"
            loading="lazy"
            crossorigin="anonymous"
          />

          {{ category.title }}
        </button>

        <div :class="$style.choosen">
          <div>Choosen:</div>
          <div v-if="formData.parts[category.title as keyof IConfigurationParts]">
            {{ formData.parts[category.title as keyof IConfigurationParts]?.title }} -
            {{ formData.parts[category.title as keyof IConfigurationParts]?.price }} {{ CURRENCY }}
          </div>

          <div v-else>-</div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

import { UiButton, UiCheckbox, UiField, UiInput } from 'mhz-ui';
import { ICategory, IConfiguration, IConfigurationParts, IProduct } from 'mhz-types';
import { clone, required, useValidator } from 'mhz-helpers';

import { getCurrentCustomer } from '@/customer/services';
import { CURRENCY, PATH_UPLOAD } from '@/common/constants';

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

const price = computed(() => Object.values(formData.value.parts).reduce((acc, product) => acc + product.price, 0));

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
  gap: 32px;
  align-items: flex-start;
}

.fields {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 16px;
  width: 240px;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  row-gap: 16px;
  align-items: flex-start;
  width: 100%;
}

.category {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 25%;
}

.icon {
  width: 32px;
  height: 32px;
}

.title {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 0;
  font-size: 1rem;
  cursor: pointer;
  background: none;
  border: 0;

  &[data-current='true'] {
    color: var(--color-primary);
  }
}

.choosen {
  font-size: 0.875rem;
  line-height: 1.3;
  color: var(--color-gray-dark-extra);
}
</style>
