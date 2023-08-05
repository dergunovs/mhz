<template>
  <form @submit.prevent="props.manufacturer ? update() : submit()" :class="$style.form">
    <UiField label="Title" isRequired :error="error('title')">
      <UiInput v-model="formData.title" />
    </UiField>

    <UiField label="Description" isRequired :error="error('description')">
      <UiInput v-model="formData.description" />
    </UiField>

    <UiField label="Country" isRequired :error="error('country')">
      <UiSelect v-model="formData.country" :options="countries" isFilter />
    </UiField>

    <UiUpload
      label="Logo"
      :file="logoFile"
      isSingle
      isRequired
      :isDisabled="!!formData.logoUrl"
      :error="error('logoUrl')"
      @add="addLogoFile"
      @remove="removeLogoFile"
      @upload="mutateUploadFile(logoFile)"
    />

    <div v-if="formData.logoUrl">
      <div :class="$style.logo">
        <img :src="`${PATH_UPLOAD}/${formData.logoUrl}`" alt="Logo" />
      </div>

      <UiButton @click="deleteLogoFile" layout="plain">Delete</UiButton>
    </div>

    <div :class="$style.buttons">
      <div :class="$style.buttonsInner">
        <UiButton type="submit" :isDisabled="isLoadingPost || isLoadingUpdate">
          {{ props.manufacturer ? 'Update' : 'Submit' }}
        </UiButton>

        <UiButton @click="router.go(-1)" layout="secondary" :isDisabled="isLoadingPost || isLoadingUpdate">
          Back
        </UiButton>
      </div>

      <UiButton
        v-if="props.manufacturer?._id"
        @click="mutateDelete(props.manufacturer._id)"
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

import { UiField, UiInput, UiButton, UiUpload, toast, UiSelect } from 'mhz-ui';
import { IManufacturer } from 'mhz-types';
import { useValidator, required } from 'mhz-validate';
import { countries } from 'mhz-countries';
import { clone } from 'mhz-helpers';

import { API_MANUFACTURER, URL_MANUFACTURER } from '@/manufacturer/constants';
import { postManufacturer, updateManufacturer, deleteManufacturer } from '@/manufacturer/services';
import { uploadFile, deleteFile } from '@/common/services';
import { PATH_UPLOAD } from '@/common/constants';

interface IProps {
  manufacturer?: IManufacturer;
}

const props = defineProps<IProps>();

const queryClient = useQueryClient();

const router = useRouter();

const formData = ref<IManufacturer>({
  title: '',
  description: '',
  logoUrl: '',
  country: '',
});

const manufacturerId = computed(() => props.manufacturer?._id);

const { mutate: mutatePost, isLoading: isLoadingPost } = postManufacturer({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_MANUFACTURER], exact: true });
    toast.success('Manufacturer added');
    router.push(URL_MANUFACTURER);
  },
});

const { mutate: mutateUpdate, isLoading: isLoadingUpdate } = updateManufacturer(manufacturerId, {
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_MANUFACTURER, props.manufacturer?._id], exact: true });
    await queryClient.refetchQueries({ queryKey: [API_MANUFACTURER], exact: true });
    toast.success('Manufacturer updated');
  },
});

const { mutate: mutateDelete } = deleteManufacturer({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_MANUFACTURER], exact: true });
    toast.success('Manufacturer deleted');
    router.push(URL_MANUFACTURER);
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
  if (isValid()) mutatePost(formData.value);
}

function update() {
  if (isValid()) mutateUpdate(formData.value);
}

const { mutate: mutateDeleteFile } = deleteFile();

const logoFile = ref<File>();

function addLogoFile(file: File) {
  logoFile.value = file;
}

function removeLogoFile() {
  logoFile.value = undefined;
}

function deleteLogoFile() {
  mutateDeleteFile(formData.value.logoUrl);
  formData.value.logoUrl = '';
}

const { mutate: mutateUploadFile } = uploadFile({
  onSuccess: (data: string) => {
    formData.value.logoUrl = data;
    removeLogoFile();
    toast.success('Logo added');
  },
});

onMounted(() => {
  if (props.manufacturer) formData.value = clone(props.manufacturer);
});
</script>

<style module lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.logo {
  width: 200px;
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
