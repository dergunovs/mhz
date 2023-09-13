<template>
  <nav :class="$style.nav">
    <RouterLink v-for="item in CUSTOMER_NAV" :key="item._id" :to="item.url" :class="$style.item">
      {{ item.title }}
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { CUSTOMER_NAV } from '@/customer/constants';
</script>

<style module lang="scss">
.nav {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 8px;
  width: 200px;
}

.item {
  width: 100%;
  padding: 12px 24px;
  color: var(--color-black);
  text-decoration: none;
  background-color: var(--color-gray-light);
  border-radius: 16px;

  &:global(.router-link-active) {
    color: var(--color-primary);
  }
}
</style>
