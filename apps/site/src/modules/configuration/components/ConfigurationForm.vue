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

      <UiButton :isDisabled="isLoading" type="submit">{{ props.configuration ? 'Update' : 'Save' }}</UiButton>

      <UiButton @click="router.push(URL_CUSTOMER_CONFIGURATIONS)" :isDisabled="isLoading" layout="secondary">
        Back
      </UiButton>

      <UiButton v-if="props.configuration" @click="isShowConfirm = true" :isDisabled="isLoading" layout="secondary">
        Delete
      </UiButton>
    </div>

    <ConfigurationCategories
      :isAuthor="props.isAuthor"
      :categories="categories"
      :currentCategory="currentCategory"
      :choosenParts="formData.parts"
      @update="(id) => emit('update', id)"
      @remove="removeProduct"
    />

    <UiModal v-model="isShowConfirm" isConfirm @confirm="mutateDelete">Confirm delete?</UiModal>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { UiButton, UiCheckbox, UiField, UiInput, UiModal, toast } from 'mhz-ui';
import { ICategory, IConfiguration, IConfigurationParts, IProduct } from 'mhz-types';
import { clone, required, useValidator, useQueryClient } from 'mhz-helpers';

import ConfigurationCategories from '@/configuration/components/ConfigurationCategories.vue';

import { postConfiguration, updateConfiguration, deleteConfiguration } from '@/configuration/services';
import { getCurrentCustomer } from '@/customer/services';
import { CURRENCY } from '@/common/constants';
import { API_CONFIGURATION } from '@/configuration/constants';
import { URL_CUSTOMER_CONFIGURATIONS } from '@/customer/constants';

interface IProps {
  categories: ICategory[];
  currentCategory: string;
  choosenProduct?: IProduct;
  configuration?: IConfiguration;
  isAuthor?: boolean;
}

const props = defineProps<IProps>();
const emit = defineEmits(['update']);

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

const price = computed(() => Object.values(formData.value.parts).reduce((acc, product) => acc + product?.price, 0));

const rules = computed(() => {
  return {
    title: required,
  };
});

const { mutate: mutatePost, isLoading } = postConfiguration({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_CONFIGURATION] });
    toast.success('Configuration added');
    router.push(URL_CUSTOMER_CONFIGURATIONS);
  },
});

const { mutate: mutateUpdate } = updateConfiguration(
  {
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: [API_CONFIGURATION] });
      toast.success('Configuration updated');
    },
  },
  props.configuration?._id
);

const { mutate: mutateDelete } = deleteConfiguration(
  {
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: [API_CONFIGURATION] });
      await queryClient.refetchQueries({ queryKey: [API_CONFIGURATION] });
      toast.success('Configuration deleted');
      router.push(URL_CUSTOMER_CONFIGURATIONS);
    },
  },
  props.configuration?._id
);

function removeProduct(categoryTitle: keyof IConfigurationParts) {
  delete formData.value.parts[categoryTitle];
}

const { error, isValid } = useValidator(formData, rules);

function handleSubmit() {
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
    if (props.choosenProduct) {
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
  flex-direction: column;
  flex-shrink: 0;
  gap: 16px;
  width: 240px;
}
</style>