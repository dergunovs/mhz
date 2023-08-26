<template>
  <header :class="$style.header">
    <RouterLink :to="URL_MAIN">
      <ImageLogo :class="$style.logo" />
    </RouterLink>

    <UiButton v-if="isAuth" @click="logout" layout="plain">Logout</UiButton>

    <div v-else :class="$style.buttons">
      <RouterLink :to="URL_SIGN_UP">Sign up</RouterLink>
      <RouterLink :to="URL_LOGIN">Login</RouterLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { UiButton } from 'mhz-ui';

import ImageLogo from '@/common/assets/images/logo.svg';
import { URL_MAIN } from '@/common/constants';
import { isAuth, logout } from '@/auth/composables';
import { URL_LOGIN, URL_SIGN_UP } from '@/auth/constants';
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

.buttons {
  display: flex;
  gap: 16px;
}
</style>
