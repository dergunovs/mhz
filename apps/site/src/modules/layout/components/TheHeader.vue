<template>
  <header :class="$style.header">
    <RouterLink :to="URL_MAIN">
      <ImageLogo :class="$style.logo" />
    </RouterLink>

    <UiButton layout="plain">Sign up</UiButton>
  </header>
</template>

<script setup lang="ts">
import { UiButton } from 'mhz-ui';

import ImageLogo from '@/common/assets/images/logo.svg';
import { URL_MAIN } from '@/common/constants';
</script>

<style module lang="scss">
.header {
  position: fixed;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  padding: 16px 32px;
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-gray);
}

.logo {
  display: block;
  width: 150px;
}
</style>
