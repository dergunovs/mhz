<template>
  <form @submit.prevent="handleSubmit" :class="$style.form">
    <div v-if="!props.configuration || props.isAuthor" :class="$style.fields">
      <UiField label="Title" isRequired :error="error('title')">
        <UiInput v-model="formData.title" />
      </UiField>

      <template v-if="props.configuration">
        <UiCheckbox v-model="formData.isShared" label="Share configuration" />

        <UiField v-if="formData.isShared" label="Link">
          <UiInput isDisabled :modelValue="link" isCopy />
        </UiField>
      </template>

      <div>
        <b>Summary price: {{ price }} {{ CURRENCY }}</b>
      </div>

      <UiButton :isDisabled="isPending" type="submit">{{ props.configuration ? 'Update' : 'Save' }}</UiButton>

      <UiButton v-if="props.configuration" @click="handleAddToCart" :isDisabled="isPending">Add to cart</UiButton>

      <UiButton @click="router.push(URL_CUSTOMER_CONFIGURATIONS)" :isDisabled="isPending" layout="secondary">
        Back
      </UiButton>

      <UiButton v-if="props.configuration" @click="isShowConfirm = true" :isDisabled="isPending" layout="secondary">
        Delete
      </UiButton>
    </div>

    <ConfigurationCategoryList
      :isAuthor="props.isAuthor"
      :categories="categories"
      :currentCategory="currentCategory"
      :choosenParts="formData.parts"
      :errors="validation.errors"
      :errorMessages="validation.messages"
      @update="(id) => emit('update', id)"
      @remove="(title) => removeProduct(title)"
    />

    <UiModal v-model="isShowConfirm" isConfirm @confirm="mutateDelete(props.configuration?._id)" lang="en">
      Confirm delete?
    </UiModal>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { UiButton, UiCheckbox, UiField, UiInput, UiModal, toast } from 'mhz-ui';
import { clone, required, useValidator, useQueryClient } from 'mhz-helpers';
import {
  API_CUSTOMER_CART,
  API_CONFIGURATION,
  ICategory,
  IConfiguration,
  IConfigurationParts,
  IProduct,
} from 'mhz-contracts';

import ConfigurationCategoryList from '@/configuration/components/ConfigurationCategoryList.vue';

import { postConfiguration, updateConfiguration, deleteConfiguration } from '@/configuration/services';
import { addToCart, getCurrentCustomer } from '@/customer/services';
import { CURRENCY } from '@/common/constants';
import { URL_CUSTOMER_CONFIGURATIONS } from '@/customer/constants';
import { URL_CART } from '@/cart/constants';
import { useConfigurationCheck } from '@/configuration/composables';

interface IProps {
  categories: ICategory[];
  currentCategory: string;
  choosenProduct?: IProduct;
  configuration?: IConfiguration;
  isAuthor?: boolean;
}

const props = defineProps<IProps>();
const emit = defineEmits<{ update: [id: string] }>();

const isEnableGetCustomer = computed(() => props.isAuthor || false);

const router = useRouter();

const queryClient = useQueryClient();

const { data: customer } = getCurrentCustomer({ enabled: isEnableGetCustomer });

const formData = ref<IConfiguration>({
  title: '',
  isShared: false,
  parts: {} as IConfigurationParts,
});

const isShowConfirm = ref(false);

const link = computed(() => window.location.href.split('?')[0]);

const price = computed(() => {
  return formData.value.parts
    ? Object.values(formData.value.parts).reduce((acc, product) => acc + product?.price, 0)
    : 0;
});

const { mutate: mutatePost, isPending } = postConfiguration({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_CONFIGURATION] });
    toast.success('Configuration added');
    router.push(URL_CUSTOMER_CONFIGURATIONS);
  },
});

const { mutate: mutateUpdate } = updateConfiguration({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_CONFIGURATION] });
    toast.success('Configuration updated');
  },
});

const { mutate: mutateDelete } = deleteConfiguration({
  onSuccess: async () => {
    queryClient.removeQueries({ queryKey: [API_CONFIGURATION] });
    await queryClient.refetchQueries({ queryKey: [API_CONFIGURATION] });
    toast.success('Configuration deleted');
    router.push(URL_CUSTOMER_CONFIGURATIONS);
  },
});

const { mutate: mutateAddToCart } = addToCart({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_CUSTOMER_CART] });
    toast.success('Added products to cart');
  },
});

function handleAddToCart() {
  if (!props.configuration?.parts) return;

  const productIds = Object.values(props.configuration?.parts).map((part: IProduct) => part._id);

  mutateAddToCart(productIds);
  router.push(URL_CART);
}

function removeProduct(categoryTitle: keyof IConfigurationParts) {
  delete formData.value.parts?.[categoryTitle];
}

const { error, isValid } = useValidator(formData, {
  title: [required('en')],
});

const { validation } = useConfigurationCheck(formData);

function handleSubmit() {
  if (formData.value.parts && !Object.keys(formData.value.parts).length) {
    toast.error('Choose at least one PC part');

    return;
  }

  if (validation.value.errors.length) {
    toast.error('Please correct compability errors');

    return;
  }

  if (isValid()) {
    if (props.configuration) {
      mutateUpdate(formData.value);
    } else {
      formData.value.customer = clone(customer.value);
      mutatePost(formData.value);
    }
  }
}

watch(
  () => props.choosenProduct,
  () => {
    if (props.choosenProduct && formData.value.parts) {
      const key = props.choosenProduct.category.title as keyof IConfigurationParts;

      formData.value.parts[key] = props.choosenProduct;
    }
  }
);

onMounted(() => {
  if (props.configuration) formData.value = clone(props.configuration);
});
</script>

<style module lang="scss">
.form {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

.fields {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  gap: 12px;
  width: 240px;
}

@media (max-width: $notebook) {
  .form {
    gap: 16px;
    margin-bottom: 16px;
  }

  .fields {
    width: 200px;
  }
}

@media (max-width: $notebook) {
  .form {
    flex-direction: column;
  }

  .fields {
    width: 100%;
  }
}
</style>
