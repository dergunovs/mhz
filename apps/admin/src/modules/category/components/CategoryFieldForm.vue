<template>
  <form @submit.prevent="props.categoryField ? update() : submit()" :class="$style.form">
    <div :class="$style.fields">
      <UiField label="Field title" isRequired :error="error('title')">
        <UiInput v-model="formData.title" />
      </UiField>

      <UiField label="Field type" isRequired :error="error('fieldType')">
        <UiSelect v-model="formData.fieldType" :options="fieldTypeOptions" />
      </UiField>

      <UiField v-if="formData.fieldType === 'number'" label="Field units" isRequired :error="error('fieldUnits')">
        <UiInput v-model="formData.fieldUnits" />
      </UiField>
    </div>

    <div :class="$style.buttons">
      <div :class="$style.buttonsInner">
        <UiButton type="submit">
          {{ props.categoryField ? 'Update Field' : 'Submit Field' }}
        </UiButton>

        <UiButton @click="emit('hide')" layout="secondary">Cancel</UiButton>
      </div>

      <UiButton v-if="props.categoryField?._id" @click="remove" layout="secondary">Delete</UiButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';

import { UiField, UiInput, UiButton, UiSelect } from 'mhz-ui';
import { ICategoryField } from 'mhz-types';
import { useValidator, required } from 'mhz-validate';
import { clone } from 'mhz-helpers';

interface IProps {
  categoryField?: ICategoryField;
}

const props = defineProps<IProps>();
const emit = defineEmits(['add', 'update', 'delete', 'hide']);

const fieldTypeOptions = ['string', 'number', 'boolean'];

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
    if (formData.value.fieldType === 'number') formData.value.fieldValue = 0;
    if (formData.value.fieldType === 'boolean') formData.value.fieldValue = false;

    if (formData.value.fieldType !== 'number') formData.value.fieldUnits = undefined;
  }
);

const rules = computed(() => {
  return {
    title: required,
    fieldType: required,
    fieldUnits: formData.value.fieldType === 'number' && required,
  };
});

const { error, isValid } = useValidator(formData, rules);

function submit() {
  if (isValid()) {
    emit('add', formData.value);
    emit('hide');
  }
}

function update() {
  if (isValid()) {
    emit('update', formData.value);
    emit('hide');
  }
}

function remove() {
  if (isValid()) {
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
