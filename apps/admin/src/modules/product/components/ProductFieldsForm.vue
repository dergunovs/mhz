<template>
  <div :class="$style.container">
    <h3>Specs</h3>

    <div v-for="field in formData" :key="field._id">
      <UiCheckbox v-if="field.fieldType === 'boolean'" v-model="field.fieldValue" :label="field.title" />

      <UiField v-else :label="field.fieldUnits ? `${field.title}, ${field.fieldUnits}` : field.title">
        <UiInput v-model="field.fieldValue" :type="field.fieldType" step="0.01" />
      </UiField>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import { UiCheckbox, UiField, UiInput } from 'mhz-ui';
import { ICategoryField } from 'mhz-types';
import { deleteId } from 'mhz-helpers';

interface IProps {
  fields: ICategoryField[];
  updates: number;
}

const props = defineProps<IProps>();
const emit = defineEmits(['update']);

const formData = ref<ICategoryField[]>([]);

watch(
  () => props.updates,
  () => getFields()
);

watch(
  () => formData.value,
  () => {
    emit('update', formData.value);
  }
);

function getFields() {
  formData.value = deleteId(props.fields);
}

onMounted(() => getFields());
</script>

<style module lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
