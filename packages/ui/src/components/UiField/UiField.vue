<template>
  <div :class="$style.field">
    <label>
      <span data-test="ui-field-label">{{ props.label }}</span>
      <span v-if="props.isRequired" :class="$style.error" data-test="ui-field-required">*</span>
    </label>

    <div data-test="ui-field">
      <slot></slot>
    </div>

    <div v-if="!!props.error" :class="$style.error" data-test="ui-field-error">{{ props.error }}</div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  label?: string;
  error?: string | false;
  isRequired?: boolean;
}

const props = defineProps<IProps>();
</script>

<style module lang="scss">
.field {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.error {
  color: var(--color-error);
}
</style>
