<template>
  <div :class="$style.container">
    <div>Fields</div>

    <div
      v-for="field in props.fields"
      :key="field._id"
      :class="$style.fields"
      :data-disabled="isShowCategoryFieldForm"
      data-test="category-field-list-field"
    >
      <div :class="$style.field" :key="field.title">
        <div>
          <span>
            <span data-test="category-field-list-field-title">{{ field.title }}</span>
            , type:
            <span data-test="category-field-list-field-type">{{ field.fieldType }}</span>
          </span>
          <span v-if="field.fieldType === 'number'">
            , units:
            <span data-test="category-field-list-field-units">{{ field.fieldUnits }}</span>
          </span>
        </div>

        <UiButton
          @click="emit('edit', field)"
          :isDisabled="isShowCategoryFieldForm"
          layout="plain"
          data-test="category-field-list-field-edit"
          >Edit</UiButton
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UiButton } from 'mhz-ui';
import { ICategoryField } from 'mhz-contracts';

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
