<template>
  <form @submit.prevent="props.category?._id ? update() : submit()" :class="$style.form">
    <UiField label="Title" isRequired :error="error('title')">
      <UiInput v-model="formData.title" isFocus />
    </UiField>

    <UiField label="Description" isRequired :error="error('description')">
      <UiEditor v-model="formData.description" />
    </UiField>

    <CategoryFieldList
      v-if="formData.fields?.length"
      :fields="formData.fields"
      :isShowCategoryFieldForm="isShowCategoryFieldForm"
      @edit="editCategoryField"
    />

    <UiButton @click="showCategoryField" v-if="!isShowCategoryFieldForm" layout="secondary">
      Add Category Field
    </UiButton>

    <CategoryFieldForm
      v-if="isShowCategoryFieldForm"
      :categoryField="editableCategoryField"
      @add="addCategoryField"
      @update="updateCategoryField"
      @delete="deleteCategoryField"
      @hide="isShowCategoryFieldForm = false"
    />

    <UiUpload
      label="Upload icon"
      :file="iconFile"
      isSingle
      isRequired
      :isDisabled="!!formData.iconUrl"
      :extensions="['svg']"
      :error="error('iconUrl')"
      @add="addIconFile"
      @remove="removeIconFile"
      @upload="mutateUploadFile(iconFile)"
    />

    <ImagePreview v-if="formData.iconUrl" :urls="[formData.iconUrl]" @delete="formData.iconUrl = ''" />

    <FormButtons :id="props.category?._id" :isLoading="isLoadingPost || isLoadingUpdate" @delete="handleDelete" />
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { UiField, UiInput, UiButton, UiUpload, toast, UiEditor } from 'mhz-ui';
import { clone, deleteTempId, useValidator, required, useQueryClient } from 'mhz-helpers';
import { API_CATEGORY, ICategory, ICategoryField } from 'mhz-contracts';

import CategoryFieldForm from '@/category/components/CategoryFieldForm.vue';
import CategoryFieldList from '@/category/components/CategoryFieldList.vue';
import ImagePreview from '@/common/components/ImagePreview.vue';
import FormButtons from '@/common/components/FormButtons.vue';

import { postCategory, updateCategory, deleteCategory } from '@/category/services';
import { uploadFile } from '@/common/services';
import { URL_CATEGORY } from '@/category/constants';

interface IProps {
  category?: ICategory;
}

const props = defineProps<IProps>();

const queryClient = useQueryClient();

const router = useRouter();

const formData = ref<ICategory>({
  title: '',
  description: '',
  iconUrl: '',
  fields: [],
});

const isShowCategoryFieldForm = ref(false);

const editableCategoryField = ref<ICategoryField>();

const { mutate: mutatePost, isPending: isLoadingPost } = postCategory({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_CATEGORY] });
    toast.success('Category added');
    router.push(URL_CATEGORY);
  },
});

const { mutate: mutateUpdate, isPending: isLoadingUpdate } = updateCategory({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_CATEGORY] });
    toast.success('Category updated');
  },
});

const { mutate: mutateDelete } = deleteCategory({
  onSuccess: async () => {
    queryClient.removeQueries({ queryKey: [API_CATEGORY] });
    await queryClient.refetchQueries({ queryKey: [API_CATEGORY] });
    toast.success('Category deleted');
    router.push(URL_CATEGORY);
  },
});

const rules = computed(() => {
  return {
    title: required,
    description: required,
    iconUrl: required,
  };
});

const { error, isValid } = useValidator(formData, rules);

function showCategoryField() {
  editableCategoryField.value = undefined;
  isShowCategoryFieldForm.value = true;
}

function editCategoryField(field: ICategoryField) {
  editableCategoryField.value = field;
  isShowCategoryFieldForm.value = true;
}

function addCategoryField(field: ICategoryField) {
  formData.value.fields?.push(field);
}

function updateCategoryField(fieldToUpdate: ICategoryField) {
  formData.value.fields = formData.value.fields?.map((field) =>
    field._id === fieldToUpdate._id ? fieldToUpdate : field
  );
}

function deleteCategoryField(fieldId: string) {
  formData.value.fields = formData.value.fields?.filter((field) => field._id !== fieldId);
}

function submit() {
  if (isValid()) {
    if (formData.value.fields) formData.value.fields = deleteTempId(formData.value.fields);
    mutatePost(formData.value);
  }
}

function update() {
  if (isValid()) {
    if (formData.value.fields) formData.value.fields = deleteTempId(formData.value.fields);
    mutateUpdate(formData.value);
  }
}

function handleDelete(id: string) {
  mutateDelete(id);
}

const iconFile = ref<File>();

function addIconFile(file: File) {
  iconFile.value = file;
}

function removeIconFile() {
  iconFile.value = undefined;
}

const { mutate: mutateUploadFile } = uploadFile({
  onSuccess: (data: string) => {
    formData.value.iconUrl = data;
    removeIconFile();
    toast.success('Icon added');
  },
});

onMounted(() => {
  if (props.category) formData.value = clone(props.category);
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
