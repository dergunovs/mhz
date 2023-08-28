<template>
  <header :class="$style.header">
    <RouterLink :to="URL_MAIN">
      <ImageLogo :class="$style.logo" />
    </RouterLink>

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
import { UiButton } from 'mhz-ui';
import { isAuth, logout } from 'mhz-helpers';

import ImageLogo from '@/common/assets/images/logo.svg';
import { URL_MAIN } from '@/common/constants';
import { URL_LOGIN, URL_SIGN_UP, TOKEN_NAME } from '@/auth/constants';
import { deleteAuthHeader } from '@/common/services/api';
import { URL_CUSTOMER, URL_FAVOURITES } from '@/customer/constants';
import { URL_CART } from '@/cart/constants';
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

.logo {
  display: block;
  width: 150px;
}

.buttons {
  display: flex;
  gap: 16px;
}
</style>
