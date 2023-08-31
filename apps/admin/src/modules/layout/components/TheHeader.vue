<template>
  <header :class="$style.header">
    <div :class="$style.logoAndSearch">
      <RouterLink :to="URL_MAIN">
        <ImageLogo :class="$style.logo" />
      </RouterLink>

      <UiSearch v-model="searchQuery" :searchScheme="SEARCH_SCHEME" :results="results" :isSuccess="isSuccess" />
    </div>

    <UiButton @click="logout(URL_LOGIN, deleteAuthHeader, TOKEN_NAME)" layout="plain">Logout</UiButton>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import { UiButton, UiSearch } from 'mhz-ui';
import { logout } from 'mhz-helpers';

import ImageLogo from '@/common/assets/images/logo.svg';
import { SEARCH_SCHEME, URL_MAIN } from '@/common/constants';
import { TOKEN_NAME, URL_LOGIN } from '@/auth/constants';
import { deleteAuthHeader } from '@/common/services/api';
import { search } from '@/common/services';

const searchQuery = ref('');

const { data: results, refetch, isSuccess } = search(searchQuery, true);

watch(
  () => searchQuery.value,
  () => {
    if (searchQuery.value.length > 2) refetch();
  }
);
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
