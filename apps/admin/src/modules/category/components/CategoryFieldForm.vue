<template>
  <form
    @submit.prevent="props.categoryField ? update() : submit()"
    :class="$style.form"
    data-test="category-field-form"
  >
    <div :class="$style.fields">
      <UiField label="Field title" isRequired :error="error('title')">
        <UiInput v-model="formData.title" isFocus data-test="category-field-form-title" />
      </UiField>

      <UiField label="Field type" isRequired :error="error('fieldType')">
        <UiSelect
          v-model="formData.fieldType"
          :options="CATEGORY_FIELD_TYPE_OPTIONS"
          lang="en"
          data-test="category-field-form-type"
        />
      </UiField>

      <UiField v-if="formData.fieldType === 'number'" label="Field units" isRequired :error="error('fieldUnits')">
        <UiInput v-model="formData.fieldUnits" data-test="category-field-form-units" />
      </UiField>
    </div>

    <div :class="$style.buttons">
      <div :class="$style.buttonsInner">
        <UiButton type="submit">
          {{ props.categoryField ? 'Update Field' : 'Submit Field' }}
        </UiButton>

        <UiButton @click="emit('hide')" layout="secondary" data-test="category-field-form-cancel">Cancel</UiButton>
      </div>

      <UiButton
        v-if="props.categoryField?._id"
        @click="remove"
        layout="secondary"
        data-test="category-field-form-delete"
      >
        Delete
      </UiButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';

import { UiField, UiInput, UiButton, UiSelect } from 'mhz-ui';
import { ICategoryField } from 'mhz-contracts';
import { clone, createTempId, useValidator, required } from 'mhz-helpers';

import { CATEGORY_FIELD_TYPE_OPTIONS } from '@/category/constants';

interface IProps {
  categoryField?: ICategoryField;
}

const props = defineProps<IProps>();

const emit = defineEmits<{
  add: [field: ICategoryField];
  update: [field: ICategoryField];
  delete: [id: string];
  hide: [];
}>();

const formData = ref<ICategoryField>({
  title: '',
  fieldType: 'string',
  fieldValue: '',
  fieldUnits: undefined,
});

const categoryFieldId = computed(() => props.categoryField?._id);

watch(
  () => formData.value.fieldType,
  () => {
    if (formData.value.fieldType === 'string') formData.value.fieldValue = '';
    if (formData.value.fieldType === 'number') formData.value.fieldValue = '';
    if (formData.value.fieldType === 'boolean') formData.value.fieldValue = false;

    if (formData.value.fieldType !== 'number') formData.value.fieldUnits = undefined;
  }
);

const { error, isValid } = useValidator(
  formData,
  { title: [required], fieldType: [required], fieldUnits: formData.value.fieldType === 'number' ? [required] : [] },
  'en'
);

function submit() {
  if (isValid()) {
    if (!props.categoryField?._id) formData.value._id = createTempId();
    emit('add', formData.value);
    emit('hide');
  }
}

function update() {
  if (isValid()) {
    if (!props.categoryField?._id) formData.value._id = createTempId();
    emit('update', formData.value);
    emit('hide');
  }
}

function remove() {
  if (isValid() && categoryFieldId.value) {
    emit('delete', categoryFieldId.value);
    emit('hide');
  }
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
