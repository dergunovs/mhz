<template>
  <div :class="$style.container">
    <UiButton @click="toast.success('Success!')">toast.success()</UiButton>
    <UiButton @click="toast.error('Error!')">toast.error()</UiButton>
    <UiButton @click="toast.info('Info! А вот тут очень много текста. Как он влезет?')">toast.info()</UiButton>
  </div>
</template>

<script setup lang="ts">
import UiButton from '../UiButton/UiButton.vue';

import toast from './toast';
</script>

<style module lang="scss">
.container {
  display: flex;
  gap: 16px;
}
</style>
