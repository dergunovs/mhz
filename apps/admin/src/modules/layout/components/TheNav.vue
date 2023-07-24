<template>
  <nav :class="$style.nav">
    <NavItem v-for="item in NAV_ITEMS" :key="item._id" :navItem="item" />
  </nav>
</template>

<script setup lang="ts">
import NavItem from '@/layout/components/NavItem.vue';

import { NAV_ITEMS } from '@/layout/constants';
</script>

<style module lang="scss">
.nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 216px;
  height: calc(100vh - 80px);
  padding: 32px;
  background-color: var(--color-gray-light-extra);
}
</style>
