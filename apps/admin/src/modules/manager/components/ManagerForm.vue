<template>
  <form @submit.prevent="props.manager?._id ? update() : submit()" :class="$style.form" data-test="manager-form">
    <UiField label="First name" isRequired :error="error('firstName')">
      <UiInput v-model="formData.firstName" isFocus data-test="manager-form-first-name" />
    </UiField>

    <UiField label="Last name" isRequired :error="error('lastName')">
      <UiInput v-model="formData.lastName" data-test="manager-form-last-name" />
    </UiField>

    <UiField label="Email" isRequired :error="error('email')">
      <UiInput v-model="formData.email" data-test="manager-form-email" />
    </UiField>

    <UiField v-if="!props.manager?._id" label="Password" isRequired :error="error('password')">
      <UiInput v-model="formData.password" data-test="manager-form-password" />
    </UiField>

    <FormButtons
      :id="props.manager?._id"
      :isLoading="isLoadingPost || isLoadingUpdate"
      @delete="handleDelete"
      data-test="manager-form-buttons"
    />
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { UiField, UiInput, toast } from 'mhz-ui';
import { clone, useValidator, required, useQueryClient, email } from 'mhz-helpers';
import { API_MANAGER, IManager } from 'mhz-contracts';

import FormButtons from '@/common/components/FormButtons.vue';

import { URL_MANAGER } from '@/manager/constants';
import { postManager, updateManager, deleteManager } from '@/manager/services';

interface IProps {
  manager?: IManager;
}

const props = defineProps<IProps>();

const queryClient = useQueryClient();

const router = useRouter();

const formData = ref<IManager>({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
});

const { mutate: mutatePost, isPending: isLoadingPost } = postManager({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_MANAGER] });
    toast.success('Manager added');
    router.push(URL_MANAGER);
  },
});

const { mutate: mutateUpdate, isPending: isLoadingUpdate } = updateManager({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_MANAGER] });
    toast.success('Manager updated');
  },
});

const { mutate: mutateDelete } = deleteManager({
  onSuccess: async () => {
    queryClient.removeQueries({ queryKey: [API_MANAGER] });
    await queryClient.refetchQueries({ queryKey: [API_MANAGER] });
    toast.success('Manager deleted');
    router.push(URL_MANAGER);
  },
});

const { error, isValid } = useValidator(formData, {
  firstName: [required('en')],
  lastName: [required('en')],
  email: [required('en'), email('en')],
  password: !props.manager?._id && [required('en')],
});

function submit() {
  if (isValid()) mutatePost(formData.value);
}

function update() {
  if (isValid()) mutateUpdate(formData.value);
}

function handleDelete(id: string) {
  mutateDelete(id);
}

onMounted(() => {
  if (props.manager) formData.value = clone(props.manager);
});
</script>

<style module lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
}
</style>
