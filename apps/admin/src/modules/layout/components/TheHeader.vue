<template>
  <header :class="$style.header">
    <div>Лого</div>
    <Button @click="logout">Выйти</Button>
  </header>
</template>

<script setup lang="ts">
import { Button } from 'ant-design-vue';

import { logout } from '@/auth/composables';
</script>

<style module lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: var(--color-primary-light);
}
</style>
