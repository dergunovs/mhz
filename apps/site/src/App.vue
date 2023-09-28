<template>
  <component v-if="isLoaded" :is="layoutComponent" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHead } from '@unhead/vue';

import { getCookieToken, setAuth, setAuthHeader } from 'mhz-helpers';

import LayoutDefault from '@/layout/components/LayoutDefault.vue';
import LayoutEmpty from '@/layout/components/LayoutEmpty.vue';

import { checkAuth } from '@/auth/services';
import { TOKEN_NAME, AUTH_URLS } from '@/auth/constants';
import { URL_MAIN } from '@/common/constants';
import { getCustomerFavouriteProducts, getCustomerCart } from '@/customer/services';

const route = useRoute();
const router = useRouter();

useHead({
  meta: [{ name: 'version', content: import.meta.env.VITE_VERSION }],
});

const isLoaded = ref(false);

const layoutComponent = computed(() => (route.meta.layout === 'empty' ? LayoutEmpty : LayoutDefault));

const isAuthPages = AUTH_URLS.includes(window.location.pathname);

const token = getCookieToken(TOKEN_NAME);

const { refetch: getFavouriteProducts } = getCustomerFavouriteProducts(ref(false));
const { refetch: getCart } = getCustomerCart(ref(false));

if (token) {
  setAuthHeader(token);

  checkAuth({
    onSuccess: () => {
      setAuth(true);
      getFavouriteProducts();
      getCart();
    },
  });
}

if (isAuthPages && !token) router.push(URL_MAIN);

onMounted(async () => {
  await router.isReady();
  isLoaded.value = true;
});
</script>
