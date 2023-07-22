<template>
  <div :class="$style.container">
    <TheHeader v-if="isAuth" />

    <main :class="$style.main">
      <TheNav v-if="isAuth" />

      <Suspense>
        <RouterView :class="$style.content" />
      </Suspense>
    </main>
  </div>
</template>

<script setup lang="ts">
import TheHeader from '@/layout/components/TheHeader.vue';
import TheNav from '@/layout/components/TheNav.vue';

import { getCheckAuth } from '@/auth/services';
import { getCookieToken, isAuth, setAuth } from '@/auth/composables';
import { setAuthHeader } from '@/common/services/api';
import { URL_LOGIN } from '@/auth/constants';

const isLoginPageAfterLogout = window.location.pathname === URL_LOGIN && window.location.search === '?logout=1';

const token = getCookieToken();

if (!isLoginPageAfterLogout && token) {
  setAuthHeader(token);

  getCheckAuth({
    onSuccess: () => {
      setAuth(true);
    },
  });
}
</script>

<style module lang="scss">
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  display: flex;
  gap: 32px;
}

.content {
  flex: 1;
  padding: 32px;
  background-color: var(--color-gray-light);
}
</style>
