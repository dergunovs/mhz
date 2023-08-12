<template>
  <form @submit.prevent="props.category ? update() : submit()" :class="$style.form">
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
      @update="updateFieldList"
    />

    <div>
      <UiButton @click="showCategoryField" v-if="!isShowCategoryFieldForm" layout="secondary">
        Add Category Field
      </UiButton>
    </div>

    <CategoryFieldForm
      v-if="isShowCategoryFieldForm"
      :categoryField="editableCategoryField"
      @add="addCategoryField"
      @update="updateCategoryField"
      @delete="deleteCategoryField"
      @hide="isShowCategoryFieldForm = false"
    />

    <UiUpload
      label="Icon"
      :file="iconFile"
      isSingle
      isRequired
      :isDisabled="!!formData.iconUrl"
      :extensions="['png']"
      :error="error('iconUrl')"
      @add="addIconFile"
      @remove="removeIconFile"
      @upload="mutateUploadFile(iconFile)"
    />

    <div v-if="formData.iconUrl">
      <div :class="$style.icon">
        <img :src="`${PATH_UPLOAD}/${formData.iconUrl}`" width="200" alt="Icon" loading="lazy" />
      </div>

      <UiButton @click="deleteIconFile" layout="plain">Delete</UiButton>
    </div>

    <div :class="$style.buttons">
      <div :class="$style.buttonsInner">
        <UiButton type="submit" :isDisabled="isLoadingPost || isLoadingUpdate">
          {{ props.category ? 'Update' : 'Submit' }}
        </UiButton>

        <UiButton @click="router.go(-1)" layout="secondary" :isDisabled="isLoadingPost || isLoadingUpdate">
          Back
        </UiButton>
      </div>

      <UiButton
        v-if="props.category?._id"
        @click="mutateDelete(props.category._id)"
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

import { UiField, UiInput, UiButton, UiUpload, toast, UiEditor } from 'mhz-ui';
import { ICategory, ICategoryField } from 'mhz-types';
import { useValidator, required } from 'mhz-validate';
import { clone, deleteTempId } from 'mhz-helpers';

import CategoryFieldForm from '@/category/components/CategoryFieldForm.vue';
import CategoryFieldList from '@/category/components/CategoryFieldList.vue';

import { API_CATEGORY, URL_CATEGORY } from '@/category/constants';
import { postCategory, updateCategory, deleteCategory } from '@/category/services';
import { uploadFile, deleteFile } from '@/common/services';
import { PATH_UPLOAD } from '@/common/constants';

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

const categoryId = computed(() => props.category?._id);

const { mutate: mutatePost, isLoading: isLoadingPost } = postCategory({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_CATEGORY, 1], exact: true });
    toast.success('Category added');
    router.push(URL_CATEGORY);
  },
});

const { mutate: mutateUpdate, isLoading: isLoadingUpdate } = updateCategory(categoryId, {
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_CATEGORY, props.category?._id], exact: true });
    await queryClient.refetchQueries({ queryKey: [API_CATEGORY, 1], exact: true });
    toast.success('Category updated');
  },
});

const { mutate: mutateDelete } = deleteCategory({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_CATEGORY, 1], exact: true });
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

function updateFieldList(fields: ICategoryField[]) {
  formData.value.fields = [...fields];
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

const { mutate: mutateDeleteFile } = deleteFile();

const iconFile = ref<File>();

function addIconFile(file: File) {
  iconFile.value = file;
}

function removeIconFile() {
  iconFile.value = undefined;
}

function deleteIconFile() {
  mutateDeleteFile(formData.value.iconUrl);
  formData.value.iconUrl = '';
}

const { mutate: mutateUploadFile } = uploadFile(
  {
    onSuccess: (data: string) => {
      formData.value.iconUrl = data;
      removeIconFile();
      toast.success('Icon added');
    },
  },
  '500'
);

onMounted(() => {
  if (props.category) formData.value = clone(props.category);
});
</script>

<style module lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.icon {
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
