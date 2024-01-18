<template>
  <div :class="$style.container">
    <UiBreadcrumbs v-if="props.links?.length" :links="props.links" color="white" data-test="page-title-breadcrumbs" />

    <h1 data-test="page-title-header">
      <slot></slot>
    </h1>
  </div>
</template>

<script setup lang="ts">
import { UiBreadcrumbs } from 'mhz-ui';

import { IPageTitleLink } from '@/layout/interface';

interface IProps {
  links?: IPageTitleLink[];
}

const props = defineProps<IProps>();
</script>

<style module lang="scss">
.container {
  width: calc(100% + 64px);
  padding: 24px 32px;
  margin-top: -32px;
  margin-bottom: 32px;
  margin-left: -32px;
  color: var(--color-white);
  background: var(--gradient, linear-gradient(116deg, var(--color-primary) 0%, var(--color-success) 100%));

  h1 {
    margin: 0;
  }
}
</style>
