<template>
  <header :class="$style.header">
    <div :class="$style.logoAndSearch">
      <RouterLink :to="URL_MAIN">
        <ImageLogo :class="$style.logo" />
      </RouterLink>

      <TheSearch />
    </div>

    <UiButton @click="logout(URL_LOGIN, deleteAuthHeader, TOKEN_NAME)" layout="plain">Logout</UiButton>
  </header>
</template>

<script setup lang="ts">
import { UiButton } from 'mhz-ui';
import { logout, deleteAuthHeader } from 'mhz-helpers';

import TheSearch from '@/layout/components/TheSearch.vue';
import ImageLogo from '@/common/assets/images/logo.svg';

import { URL_MAIN } from '@/common/constants';
import { TOKEN_NAME, URL_LOGIN } from '@/auth/constants';
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

.logoAndSearch {
  display: flex;
  gap: 64px;
  align-items: center;
}

.logo {
  display: block;
  width: 150px;
}
</style>
