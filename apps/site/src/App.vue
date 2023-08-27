<template>
  <div>
    <component v-if="isLoaded" :is="layoutComponent" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHead } from '@vueuse/head';

import { getCookieToken, setAuth } from 'mhz-helpers';

import LayoutDefault from '@/layout/components/LayoutDefault.vue';
import LayoutEmpty from '@/layout/components/LayoutEmpty.vue';

import { checkAuth } from '@/auth/services';
import { setAuthHeader } from '@/common/services/api';
import { TOKEN_NAME, URL_LOGIN } from '@/auth/constants';

const route = useRoute();
const router = useRouter();

useHead({
  meta: [{ name: 'version', content: import.meta.env.VITE_VERSION }],
});

const isLoaded = ref(false);

const layoutComponent = computed(() => (route.meta.layout === 'empty' ? LayoutEmpty : LayoutDefault));

const isLoginPage = window.location.pathname === URL_LOGIN;

const token = getCookieToken(TOKEN_NAME);

if (!isLoginPage && token) {
  setAuthHeader(token);

  checkAuth({
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
