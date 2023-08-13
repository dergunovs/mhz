<template>
  <form @submit.prevent="props.manager?._id ? update() : submit()" :class="$style.form">
    <UiField label="First name" isRequired :error="error('firstName')">
      <UiInput v-model="formData.firstName" isFocus />
    </UiField>

    <UiField label="Last name" isRequired :error="error('lastName')">
      <UiInput v-model="formData.lastName" />
    </UiField>

    <UiField label="Email" isRequired :error="error('email')">
      <UiInput v-model="formData.email" />
    </UiField>

    <UiField v-if="!props.manager?._id" label="Password" isRequired :error="error('password')">
      <UiInput v-model="formData.password" />
    </UiField>

    <FormButtons :id="props.manager?._id" :isLoading="isLoadingPost || isLoadingUpdate" @delete="handleDelete" />
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { useQueryClient } from '@tanstack/vue-query';

import { UiField, UiInput, toast } from 'mhz-ui';
import { IManager } from 'mhz-types';
import { useValidator, required } from 'mhz-validate';
import { clone } from 'mhz-helpers';

import FormButtons from '@/common/components/FormButtons.vue';

import { API_MANAGER, URL_MANAGER } from '@/manager/constants';
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

const managerId = computed(() => props.manager?._id);

const { mutate: mutatePost, isLoading: isLoadingPost } = postManager({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_MANAGER, 1], exact: true });
    toast.success('Manager added');
    router.push(URL_MANAGER);
  },
});

const { mutate: mutateUpdate, isLoading: isLoadingUpdate } = updateManager(managerId, {
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_MANAGER, props.manager?._id], exact: true });
    await queryClient.refetchQueries({ queryKey: [API_MANAGER, 1], exact: true });
    toast.success('Manager updated');
  },
});

const { mutate: mutateDelete } = deleteManager({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_MANAGER, 1], exact: true });
    toast.success('Manager deleted');
    router.push(URL_MANAGER);
  },
});

const rules = computed(() => {
  return {
    firstName: required,
    lastName: required,
    email: required,
    password: !props.manager?._id && required,
  };
});

const { error, isValid } = useValidator(formData, rules);

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
