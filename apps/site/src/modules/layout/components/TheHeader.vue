<template>
  <header :class="$style.header">
    <div :class="$style.main">
      <RouterLink :to="URL_MAIN">
        <ImageLogo :class="$style.logo" />
      </RouterLink>

      <UiButton @click="isShowCatalog = !isShowCatalog" layout="secondary">Catalog</UiButton>

      <CategoryCatalogPopup v-if="isShowCatalog" v-model="isShowCatalog" />

      <UiSearch v-model="searchQuery" :searchScheme="SEARCH_SCHEME" :results="results" :isSuccess="isSuccess" />
    </div>

    <div :class="$style.buttons">
      <template v-if="isAuth">
        <RouterLink :to="URL_FAVOURITES">Favourites</RouterLink>
        <RouterLink :to="URL_CUSTOMER">Profile</RouterLink>
        <RouterLink :to="URL_CART">Cart</RouterLink>
        <UiButton @click="logout(URL_MAIN, deleteAuthHeader, TOKEN_NAME)" layout="plain">Logout</UiButton>
      </template>

      <template v-else>
        <RouterLink :to="URL_SIGN_UP">Sign up</RouterLink>
        <RouterLink :to="URL_LOGIN">Login</RouterLink>
      </template>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import { UiButton, UiSearch } from 'mhz-ui';
import { isAuth, logout, deleteAuthHeader } from 'mhz-helpers';

import CategoryCatalogPopup from '@/category/components/CategoryCatalogPopup.vue';

import ImageLogo from '@/common/assets/images/logo.svg';
import { SEARCH_SCHEME, URL_MAIN } from '@/common/constants';
import { URL_LOGIN, URL_SIGN_UP, TOKEN_NAME } from '@/auth/constants';
import { URL_CUSTOMER, URL_FAVOURITES } from '@/customer/constants';
import { URL_CART } from '@/cart/constants';
import { search } from '@/common/services';

const isShowCatalog = ref(false);

const searchQuery = ref('');

const { data: results, refetch, isSuccess } = search(searchQuery);

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
  padding: 16px 64px;
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-gray);
}

.main {
  display: flex;
  gap: 32px;
  align-items: center;
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
