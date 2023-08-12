<template>
  <form @submit.prevent="props.manager ? update() : submit()" :class="$style.form">
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

    <div :class="$style.buttons">
      <div :class="$style.buttonsInner">
        <UiButton type="submit" :isDisabled="isLoadingPost || isLoadingUpdate">
          {{ props.manager ? 'Update' : 'Submit' }}
        </UiButton>

        <UiButton @click="router.go(-1)" layout="secondary" :isDisabled="isLoadingPost || isLoadingUpdate">
          Back
        </UiButton>
      </div>

      <UiButton
        v-if="props.manager?._id"
        @click="mutateDelete(props.manager._id)"
        layout="secondary"
        :isDisabled="isLoadingPost || isLoadingUpdate"
      >
        Delete
      </UiButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { useQueryClient } from '@tanstack/vue-query';

import { UiField, UiInput, UiButton, toast } from 'mhz-ui';
import { IManager } from 'mhz-types';
import { useValidator, required } from 'mhz-validate';
import { clone } from 'mhz-helpers';

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

onMounted(() => {
  if (props.manager) formData.value = clone(props.manager);
});
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

.buttonsInner {
  display: flex;
  gap: 16px;
}
</style>
