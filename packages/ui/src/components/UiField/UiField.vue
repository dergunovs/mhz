<template>
  <label @click.prevent :class="$style.field">
    <span>
      <span>{{ props.label }}</span>
      <span v-if="props.isRequired" :class="$style.error">*</span>
    </span>

    <slot></slot>

    <div v-show="!!props.error" :class="$style.error">{{ props.error }}</div>
  </label>
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
  flex-direction: column;
  flex-grow: 1;
  gap: 4px;
  width: 100%;
}

.error {
  color: var(--color-error);
}
</style>
