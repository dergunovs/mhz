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
  gap: 16px;
  width: 216px;
  height: calc(100vh - 64px);
  padding: 32px;
}
</style>
