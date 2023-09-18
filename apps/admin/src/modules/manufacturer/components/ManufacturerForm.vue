<template>
  <form @submit.prevent="props.manufacturer?._id ? update() : submit()" :class="$style.form">
    <UiField label="Title" isRequired :error="error('title')">
      <UiInput v-model="formData.title" isFocus />
    </UiField>

    <UiField label="Description" isRequired :error="error('description')">
      <UiEditor v-model="formData.description" />
    </UiField>

    <UiField label="Country" isRequired :error="error('country')">
      <UiSelect v-model="formData.country" :options="countries" isFilter />
    </UiField>

    <UiUpload
      label="Upload logo"
      :file="logoFile"
      isSingle
      isRequired
      :isDisabled="!!formData.logoUrl"
      :error="error('logoUrl')"
      :extensions="['png']"
      @add="addLogoFile"
      @remove="removeLogoFile"
      @upload="mutateUploadFile(logoFile)"
    />

    <ImagePreview v-if="formData.logoUrl" :urls="[formData.logoUrl]" @delete="formData.logoUrl = ''" />

    <FormButtons :id="props.manufacturer?._id" :isLoading="isLoadingPost || isLoadingUpdate" @delete="handleDelete" />
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { UiField, UiInput, UiUpload, toast, UiSelect, UiEditor } from 'mhz-ui';
import { IManufacturer } from 'mhz-types';
import { countries } from 'mhz-countries';
import { useQueryClient, clone, useValidator, required } from 'mhz-helpers';
import { API_MANUFACTURER } from 'mhz-contracts';

import ImagePreview from '@/common/components/ImagePreview.vue';
import FormButtons from '@/common/components/FormButtons.vue';

import { URL_MANUFACTURER } from '@/manufacturer/constants';
import { postManufacturer, updateManufacturer, deleteManufacturer } from '@/manufacturer/services';
import { uploadFile } from '@/common/services';

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
    await queryClient.refetchQueries({ queryKey: [API_MANUFACTURER] });
    toast.success('Manufacturer added');
    router.push(URL_MANUFACTURER);
  },
});

const { mutate: mutateUpdate, isLoading: isLoadingUpdate } = updateManufacturer(manufacturerId, {
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_MANUFACTURER] });
    toast.success('Manufacturer updated');
  },
});

const { mutate: mutateDelete } = deleteManufacturer({
  onSuccess: async () => {
    queryClient.removeQueries({ queryKey: [API_MANUFACTURER] });
    await queryClient.refetchQueries({ queryKey: [API_MANUFACTURER] });
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

function handleDelete(id: string) {
  mutateDelete(id);
}

const logoFile = ref<File>();

function addLogoFile(file: File) {
  logoFile.value = file;
}

function removeLogoFile() {
  logoFile.value = undefined;
}

const { mutate: mutateUploadFile } = uploadFile(
  {
    onSuccess: (data: string) => {
      formData.value.logoUrl = data;
      removeLogoFile();
      toast.success('Logo added');
    },
  },
  '500'
);

onMounted(() => {
  if (props.manufacturer) formData.value = clone(props.manufacturer);
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
