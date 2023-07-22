<template>
  <nav :class="$style.nav">
    <RouterLink v-for="item in NAV_ITEMS" :key="item._id" :to="item.url" :class="$style.navItem">
      {{ item.title }}
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { NAV_ITEMS } from '@/layout/constants';
</script>

<style module lang="scss">
.nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 216px;
  height: calc(100vh - 64px);
  padding: 32px;
  background-color: var(--color-gray-light);
}
</style>
