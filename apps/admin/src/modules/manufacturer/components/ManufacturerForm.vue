<template>
  <form
    @submit.prevent="props.manufacturer?._id ? update() : submit()"
    :class="$style.form"
    data-test="manufacturer-form"
  >
    <UiField label="Title" isRequired :error="error('title')">
      <UiInput v-model="formData.title" isFocus data-test="manufacturer-form-title" />
    </UiField>

    <UiField label="Description" isRequired :error="error('description')">
      <UiEditor v-model="formData.description" data-test="manufacturer-form-description" />
    </UiField>

    <UiField label="Country" isRequired :error="error('country')">
      <UiSelect
        v-model="formData.country"
        :options="countries"
        isFilter
        lang="en"
        data-test="manufacturer-form-country"
      />
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
      lang="en"
    />

    <ImagePreview
      v-if="formData.logoUrl"
      :urls="[formData.logoUrl]"
      @delete="formData.logoUrl = ''"
      data-test="manufacturer-form-logo"
    />

    <FormButtons
      :id="props.manufacturer?._id"
      :isLoading="isLoadingPost || isLoadingUpdate"
      @delete="handleDelete"
      data-test="manufacturer-form-buttons"
    />
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { UiField, UiInput, UiUpload, toast, UiSelect, UiEditor } from 'mhz-ui';
import { countries } from 'mhz-countries';
import { clone, useValidate, required, useQueryClient } from 'mhz-helpers';
import { API_MANUFACTURER, IManufacturer } from 'mhz-contracts';

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

const { mutate: mutatePost, isPending: isLoadingPost } = postManufacturer({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_MANUFACTURER] });
    toast.success('Manufacturer added');
    router.push(URL_MANUFACTURER);
  },
});

const { mutate: mutateUpdate, isPending: isLoadingUpdate } = updateManufacturer({
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

const { error, isValid } = useValidate(
  formData,
  { title: [required], description: [required], logoUrl: [required], country: [required] },
  'en'
);

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
  align-items: flex-start;
}
</style>
