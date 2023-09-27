<template>
  <header :class="$style.header">
    <div :class="$style.main">
      <RouterLink :to="URL_MAIN" aria-label="Logo">
        <IconLogo :class="$style.logo" />
      </RouterLink>

      <UiButton @click="isShowCatalog = !isShowCatalog" layout="secondary" :icon="IconCatalog">Catalog</UiButton>

      <CategoryCatalogPopup v-if="isShowCatalog" v-model="isShowCatalog" />

      <TheSearch />
    </div>

    <div :class="$style.buttons">
      <template v-if="isAuth">
        <UiButton @click="$router.push(URL_CUSTOMER_ORDERS)" layout="plain" :icon="IconProfile">Profile</UiButton>

        <CartHeaderButton />

        <UiButton @click="logout(URL_MAIN, deleteAuthHeader, TOKEN_NAME)" layout="plain" :icon="IconLogout">
          Logout
        </UiButton>
      </template>

      <template v-else>
        <UiButton @click="$router.push(URL_SIGN_UP)" layout="plain" :icon="IconSignUp">Sign up</UiButton>

        <UiButton @click="$router.push(URL_LOGIN)" layout="plain" :icon="IconLogin">Login</UiButton>
      </template>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { UiButton } from 'mhz-ui';
import { isAuth, logout, deleteAuthHeader } from 'mhz-helpers';

import TheSearch from '@/layout/components/TheSearch.vue';
import CartHeaderButton from '@/cart/components/CartHeaderButton.vue';
import CategoryCatalogPopup from '@/category/components/CategoryCatalogPopup.vue';

import IconLogo from '@/layout/icons/logoText.svg';
import IconCatalog from '@/layout/icons/catalog.svg?component';
import IconProfile from '@/layout/icons/profile.svg?component';
import IconLogout from '@/layout/icons/logout.svg?component';
import IconSignUp from '@/layout/icons/signup.svg?component';
import IconLogin from '@/layout/icons/login.svg?component';

import { URL_MAIN } from '@/common/constants';
import { URL_LOGIN, URL_SIGN_UP, TOKEN_NAME } from '@/auth/constants';
import { URL_CUSTOMER_ORDERS } from '@/customer/constants';

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
  gap: 32px;
}
</style>
