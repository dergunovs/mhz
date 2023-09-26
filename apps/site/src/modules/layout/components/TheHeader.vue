<template>
  <header :class="$style.header">
    <div :class="$style.main">
      <RouterLink :to="URL_MAIN">
        <IconLogo :class="$style.logo" />
      </RouterLink>

      <UiButton @click="isShowCatalog = !isShowCatalog" layout="secondary" :icon="IconCatalog">Catalog</UiButton>

      <CategoryCatalogPopup v-if="isShowCatalog" v-model="isShowCatalog" />

      <TheSearch />
    </div>

    <div :class="$style.buttons">
      <template v-if="isAuth">
        <RouterLink :to="URL_CUSTOMER_ORDERS">Profile</RouterLink>
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
import { ref } from 'vue';

import { UiButton } from 'mhz-ui';
import { isAuth, logout, deleteAuthHeader } from 'mhz-helpers';

import TheSearch from '@/layout/components/TheSearch.vue';
import CategoryCatalogPopup from '@/category/components/CategoryCatalogPopup.vue';
import IconLogo from '@/layout/icons/logoText.svg';
import IconCatalog from '@/layout/icons/catalog.svg?component';

import { URL_MAIN } from '@/common/constants';
import { URL_LOGIN, URL_SIGN_UP, TOKEN_NAME } from '@/auth/constants';
import { URL_CUSTOMER_ORDERS } from '@/customer/constants';
import { URL_CART } from '@/cart/constants';

const isShowCatalog = ref(false);
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
