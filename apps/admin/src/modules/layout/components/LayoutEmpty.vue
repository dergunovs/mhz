<template>
  <div :class="$style.layout">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'LayoutEmpty' });
</script>

<style module lang="scss">
.layout {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100dvh;
}
</style>
