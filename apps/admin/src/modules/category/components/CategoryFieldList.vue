<template>
  <div>
    <div>Fields</div>
    <div v-for="(field, index) in props.fields" :key="`${field.title}-${index}`" :class="$style.field">
      <div>
        <span>{{ index + 1 }}. {{ field.title }}, type: {{ field.fieldType }}</span>
        <span v-if="field.fieldType === 'number'">, units: {{ field.fieldUnits }}</span>
      </div>

      <UiButton @click="emit('edit', field)" :isDisabled="isShowCategoryFieldForm" layout="plain">Edit</UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UiButton } from 'mhz-ui';
import { ICategoryField } from 'mhz-types';

interface IProps {
  fields: ICategoryField[];
  isShowCategoryFieldForm: boolean;
}

const props = defineProps<IProps>();
const emit = defineEmits(['edit']);
</script>

<style module lang="scss">
.field {
  display: flex;
  gap: 8px;
}
</style>
