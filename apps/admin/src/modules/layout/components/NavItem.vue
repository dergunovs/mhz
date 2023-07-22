<template>
  <RouterLink :to="props.navItem.url" :class="$style.navItem">
    <component :is="props.navItem.icon" :class="$style.icon" />
    {{ props.navItem.title }}
  </RouterLink>
</template>

<script setup lang="ts">
import { INavItem } from '@/layout/interface';

interface IProps {
  navItem: INavItem;
}

const props = defineProps<IProps>();
</script>

<style module lang="scss">
.navItem {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 8px 0;
  color: var(--color-black);
  text-decoration: none;

  &:hover,
  &:global(.router-link-active) {
    color: var(--color-primary);
  }
}

.icon {
  flex-shrink: 0;
}
</style>
