<template>
  <div :class="$style.main">
    <TheHeader v-if="isAuth" />

    <Suspense>
      <RouterView :class="$style.content" />
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import TheHeader from '@/layout/components/TheHeader.vue';

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
.main {
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-height: 100vh;
}

.content {
  flex: 1;
  padding: 0 64px;
}
</style>
