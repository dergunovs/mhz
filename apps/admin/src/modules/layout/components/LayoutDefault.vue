<template>
  <div :class="$style.layout">
    <TheHeader />

    <main :class="$style.main">
      <NavList />

      <div :class="$style.contentBlock">
        <RouterView :class="$style.content" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import TheHeader from '@/layout/components/TheHeader.vue';
import NavList from '@/layout/components/NavList.vue';
</script>

<style module lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  display: flex;
  height: calc(100vh - 80px);
  margin-top: 80px;
  overflow-y: auto;
}

.contentBlock {
  flex: 1;
  height: calc(100vh - 80px);
  overflow-y: auto;
  background-color: var(--color-gray-light);
}

.content {
  min-height: calc(100vh - 80px - 64px);
  padding: 32px;
  margin: 32px;
  overflow: hidden;
  background-color: var(--color-white);
  border-radius: 24px;
  box-shadow: 0 0 24px -4px var(--color-gray-transparent);
}
</style>
