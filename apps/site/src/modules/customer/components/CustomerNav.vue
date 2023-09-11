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
  gap: 4px;
  width: 200px;
}

.item {
  width: 100%;
  padding: 8px 16px;
  text-decoration: none;
  background-color: var(--color-gray-light);

  &:global(.router-link-active) {
    font-weight: 700;
    color: var(--color-primary-dark);
  }
}
</style>
