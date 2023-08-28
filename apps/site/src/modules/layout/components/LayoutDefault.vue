<template>
  <div :class="$style.layout">
    <TheHeader />

    <div :class="$style.container">
      <main :class="$style.main">
        <RouterView />

        <CustomerWatchedProducts v-if="isShowWathedProducts" />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { isAuth } from 'mhz-helpers';

import TheHeader from '@/layout/components/TheHeader.vue';
import CustomerWatchedProducts from '@/customer/components/CustomerWatchedProducts.vue';

const route = useRoute();

const isShowWathedProducts = computed(
  () => isAuth.value && route.name && ['Product', 'Main'].includes(route.name.toString())
);
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
</style>
