<template>
  <div>
    <component v-if="isLoaded" :is="layoutComponent" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import LayoutDefault from '@/layout/components/LayoutDefault.vue';
import LayoutEmpty from '@/layout/components/LayoutEmpty.vue';

import { getCheckAuth } from '@/auth/services';
import { getCookieToken, setAuth } from '@/auth/composables';
import { setAuthHeader } from '@/common/services/api';
import { URL_LOGIN } from '@/auth/constants';

const route = useRoute();
const router = useRouter();

const isLoaded = ref(false);

const layoutComponent = computed(() => (route.meta.layout === 'empty' ? LayoutEmpty : LayoutDefault));

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

onMounted(async () => {
  await router.isReady();
  isLoaded.value = true;
});
</script>
