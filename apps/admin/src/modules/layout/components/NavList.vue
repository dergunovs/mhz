<template>
  <nav :class="$style.nav">
    <NavItem v-for="item in NAV_ITEMS" :key="item._id" :navItem="item" data-test="nav-list-item" />
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
  height: calc(100dvh - 64px);
  padding: 32px 16px;
  overflow-y: auto;
}
</style>
