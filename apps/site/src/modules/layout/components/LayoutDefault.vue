<template>
  <div :class="$style.layout">
    <TheHeader />

    <div :class="$style.container">
      <main :class="$style.main">
        <RouterView />
      </main>
    </div>
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

.container {
  display: flex;
  height: calc(100vh - 64px);
  margin-top: 64px;
  overflow-y: auto;
}

.main {
  flex: 1;
  height: calc(100vh - 64px);
  min-height: calc(100vh - 128px);
  padding: 32px 64px;
  overflow-y: auto;
}

@media (max-width: $notebook) {
  .main {
    padding: 32px;
  }
}
</style>
