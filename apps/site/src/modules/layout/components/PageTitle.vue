<template>
  <div :class="$style.container">
    <UiBreadcrumbs v-if="props.links?.length" :links="props.links" />

    <h1>
      <slot></slot>
    </h1>
  </div>
</template>

<script setup lang="ts">
import { UiBreadcrumbs } from 'mhz-ui';

interface IProps {
  links?: { url: string; title?: string }[];
}

const props = defineProps<IProps>();
</script>

<style module lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 8px;

  h1 {
    margin: 0;
  }
}
</style>
