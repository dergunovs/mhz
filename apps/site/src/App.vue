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
import { TOKEN_NAME, URL_LOGIN, AUTH_URLS } from '@/auth/constants';
import { URL_MAIN } from '@/common/constants';
import { getCustomerFavouriteProducts } from '@/customer/services';

const route = useRoute();
const router = useRouter();

useHead({
  meta: [{ name: 'version', content: import.meta.env.VITE_VERSION }],
});

const isLoaded = ref(false);

const layoutComponent = computed(() => (route.meta.layout === 'empty' ? LayoutEmpty : LayoutDefault));

const isLoginPage = window.location.pathname === URL_LOGIN;
const isAuthPages = AUTH_URLS.includes(window.location.pathname);

const token = getCookieToken(TOKEN_NAME);

const { refetch } = getCustomerFavouriteProducts({ enabled: false });

if (!isLoginPage && token) {
  setAuthHeader(token);

  checkAuth({
    onSuccess: () => {
      setAuth(true);
      refetch();
    },
  });
}

if (isAuthPages && !token) router.push(URL_MAIN);

onMounted(async () => {
  await router.isReady();
  isLoaded.value = true;
});
</script>
