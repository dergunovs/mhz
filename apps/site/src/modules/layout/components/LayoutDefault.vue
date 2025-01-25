<template>
  <div :class="$style.layout">
    <TheHeader />

    <div :class="$style.container">
      <main :class="$style.main">
        <div :class="$style.inner">
          <RouterView />
        </div>

        <TheFooter />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheHeader from '@/layout/components/TheHeader.vue';
import TheFooter from '@/layout/components/TheFooter.vue';
</script>

<style module lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

.container {
  display: flex;
  height: calc(100vh - 64px);
  margin-top: 64px;
  overflow-y: auto;
}

.main {
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;
}

.inner {
  flex: 1;
  padding: 32px 64px;
}

@media (max-width: $notebook) {
  .inner {
    padding: 32px;
  }
}

@media (max-width: $tablet) {
  .inner {
    padding: 32px 16px;
  }
}
</style>
