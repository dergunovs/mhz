<template>
  <form @submit.prevent="props.categoryField ? update() : submit()" :class="$style.form">
    <div :class="$style.fields">
      <UiField label="Field title" isRequired :error="error('title')">
        <UiInput v-model="formData.title" />
      </UiField>

      <UiField label="Field type" isRequired :error="error('fieldType')">
        <UiSelect v-model="formData.fieldType" :options="fieldTypeOptions" />
      </UiField>

      <UiField label="Field value" isRequired :error="error('fieldValue')">
        <input v-if="formData.fieldType === 'boolean'" v-model="formData.fieldValue" type="checkbox" />
        <UiInput v-else v-model="formData.fieldValue" :type="formData.fieldType" />
      </UiField>

      <UiField v-if="formData.fieldType === 'number'" label="Field units" isRequired :error="error('fieldUnits')">
        <UiInput v-model="formData.fieldUnits" />
      </UiField>
    </div>

    <div :class="$style.buttons">
      <div :class="$style.buttonsInner">
        <UiButton type="submit" :isDisabled="isLoadingPost || isLoadingUpdate">
          {{ props.categoryField ? 'Update Field' : 'Submit Field' }}
        </UiButton>

        <UiButton @click="emit('hide')" layout="secondary" :isDisabled="isLoadingPost || isLoadingUpdate">
          Cancel
        </UiButton>
      </div>

      <UiButton
        v-if="props.categoryField?._id"
        @click="mutateDelete(props.categoryField._id)"
        layout="secondary"
        :isDisabled="isLoadingPost || isLoadingUpdate"
      >
        Delete
      </UiButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';

import { useQueryClient } from '@tanstack/vue-query';

import { UiField, UiInput, UiButton, UiSelect, toast } from 'mhz-ui';
import { ICategoryField } from 'mhz-types';
import { useValidator, required } from 'mhz-validate';
import { clone } from 'mhz-helpers';

import { API_CATEGORY_FIELD } from '@/category/constants';
import { postCategoryField, updateCategoryField, deleteCategoryField } from '@/category/services';

interface IProps {
  categoryField?: ICategoryField;
}

const props = defineProps<IProps>();
const emit = defineEmits(['hide']);

const fieldTypeOptions = ['string', 'number', 'boolean'];

const queryClient = useQueryClient();

const formData = ref<ICategoryField>({
  title: '',
  fieldType: 'string',
  fieldValue: '',
  fieldUnits: '',
});

const categoryFieldId = computed(() => props.categoryField?._id);

watch(
  () => formData.value.fieldType,
  () => {
    if (formData.value.fieldType === 'string') formData.value.fieldValue = '';
    if (formData.value.fieldType === 'number') formData.value.fieldValue = 0;
    if (formData.value.fieldType === 'boolean') formData.value.fieldValue = false;

    if (formData.value.fieldType !== 'number') formData.value.fieldUnits = '';
  }
);

const { mutate: mutatePost, isLoading: isLoadingPost } = postCategoryField({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_CATEGORY_FIELD, 1], exact: true });
    toast.success('Category field added');
    emit('hide');
  },
});

const { mutate: mutateUpdate, isLoading: isLoadingUpdate } = updateCategoryField(categoryFieldId, {
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_CATEGORY_FIELD, props.categoryField?._id], exact: true });
    await queryClient.refetchQueries({ queryKey: [API_CATEGORY_FIELD, 1], exact: true });
    toast.success('Category field updated');
    emit('hide');
  },
});

const { mutate: mutateDelete } = deleteCategoryField({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_CATEGORY_FIELD, 1], exact: true });
    toast.success('Category field deleted');
    emit('hide');
  },
});

const rules = computed(() => {
  return {
    title: required,
    fieldType: required,
    fieldValue: required,
    fieldUnits: formData.value.fieldType === 'number' && required,
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
  if (props.categoryField) formData.value = clone(props.categoryField);
});
</script>

<style module lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  background-color: var(--color-gray-light);
  border-radius: 16px;
}

.fields {
  display: flex;
  flex-direction: row;
  gap: 16px;
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
