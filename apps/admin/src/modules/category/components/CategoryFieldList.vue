<template>
  <div :class="$style.container">
    <div>Fields</div>

    <div v-for="field in props.fields" :key="field._id" :class="$style.fields" :data-disabled="isShowCategoryFieldForm">
      <div :class="$style.field" :key="field.title">
        <div>
          <span>{{ field.title }}, type: {{ field.fieldType }}</span>
          <span v-if="field.fieldType === 'number'">, units: {{ field.fieldUnits }}</span>
        </div>

        <UiButton @click="emit('edit', field)" :isDisabled="isShowCategoryFieldForm" layout="plain">Edit</UiButton>
      </div>
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
.container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.fields {
  display: flex;
  flex-direction: column;

  &[data-disabled='true'] {
    pointer-events: none;
  }
}

.field {
  display: flex;
  gap: 8px;
}
</style>
