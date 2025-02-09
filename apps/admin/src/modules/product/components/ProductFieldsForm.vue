<template>
  <div :class="$style.container">
    <h3>Specs</h3>

    <div v-for="field in formData" :key="field._id" data-test="product-fields-form-field">
      <UiCheckbox
        v-if="field.fieldType === 'boolean'"
        v-model="field.fieldValue"
        :label="field.title"
        data-test="product-fields-form-boolean"
      />

      <UiField v-else :label="field.fieldUnits ? `${field.title}, ${field.fieldUnits}` : field.title">
        <UiInput v-model="field.fieldValue" data-test="product-fields-form-value" />
      </UiField>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import { UiCheckbox, UiField, UiInput } from 'mhz-ui';
import { ICategoryField } from 'mhz-contracts';
import { deleteTempId } from 'mhz-helpers';

interface IProps {
  fields: ICategoryField[];
  updates: number;
}

const props = defineProps<IProps>();
const emit = defineEmits<{ update: [formData: ICategoryField[]] }>();

const formData = ref<ICategoryField[]>([]);

watch(
  () => props.updates,
  () => {
    getFields();
  }
);

watch(
  () => formData.value,
  () => {
    emit('update', formData.value);
  },
  { deep: true }
);

function getFields() {
  formData.value = deleteTempId(props.fields, true);
}

onMounted(() => {
  getFields();
});
</script>

<style module lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}
</style>
