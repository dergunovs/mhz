<template>
  <div :class="$style.layout">
    <TheHeader />

    <main :class="$style.main">
      <div :class="$style.contentBlock">
        <RouterView :class="$style.content" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import TheHeader from '@/layout/components/TheHeader.vue';
</script>

<style module lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  display: flex;
  height: calc(100vh - 64px);
  margin-top: 64px;
  overflow-y: auto;
}

.contentBlock {
  flex: 1;
  height: calc(100vh - 64px);
  overflow-y: auto;
  background-color: var(--color-gray-light);
}

.content {
  min-height: calc(100vh - 128px);
  padding: 32px;
  margin: 32px;
  overflow: hidden;
  background-color: var(--color-white);
  border-radius: 16px;
}
</style>
