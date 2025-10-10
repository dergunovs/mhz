<template>
  <form @submit.prevent="submit" :class="$style.form">
    <div :class="$style.fields">
      <UiField label="First name" isRequired :error="error('firstName')">
        <UiInput v-model="formData.firstName" isFocus />
      </UiField>

      <UiField label="Last name" isRequired :error="error('lastName')">
        <UiInput v-model="formData.lastName" />
      </UiField>

      <UiField label="Email" isRequired :error="error('email')">
        <UiInput v-model="formData.email" />
      </UiField>
    </div>

    <div :class="$style.buttons">
      <UiButton type="submit" :isDisabled="isPending">Update profile</UiButton>
      <UiButton @click="isShowConfirm = true" layout="secondary" :isDisabled="isPending">Delete</UiButton>
    </div>

    <UiModal v-model="isShowConfirm" isConfirm @confirm="mutateDelete" lang="en">Confirm delete?</UiModal>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { UiField, UiInput, UiButton, UiModal, toast } from 'mhz-ui';
import { clone, useValidate, required, email, logout, deleteAuthHeader, useQueryClient } from 'mhz-helpers';
import { API_CUSTOMER, ICustomer } from 'mhz-contracts';

import { updateCustomer, deleteCustomer } from '@/customer/services';
import { URL_MAIN } from '@/common/constants';
import { TOKEN_NAME } from '@/auth/constants';

interface IProps {
  customer?: ICustomer;
}

const props = defineProps<IProps>();

const queryClient = useQueryClient();

const formData = ref<Omit<ICustomer, 'password'>>({
  firstName: '',
  lastName: '',
  email: '',
});

const isShowConfirm = ref(false);

const { mutate: mutateUpdate, isPending } = updateCustomer({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_CUSTOMER] });
    toast.success('Profile updated');
  },
});

const { mutate: mutateDelete } = deleteCustomer({
  onSuccess: async () => {
    logout(URL_MAIN, deleteAuthHeader, TOKEN_NAME);
  },
});

const { error, isValid } = useValidate(
  formData,
  { firstName: [required], lastName: [required], email: [required, email] },
  'en'
);

function submit() {
  if (isValid()) mutateUpdate(formData.value);
}

onMounted(() => {
  if (props.customer) formData.value = clone(props.customer);
});
</script>

<style module lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.buttons {
  display: flex;
  gap: 16px;
}
</style>
