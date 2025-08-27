<template>
  <div>
    <component v-if="isLoaded" :is="layoutComponent" :data-layout="layoutComponent.name" data-test="app-layout" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHead } from '@unhead/vue';

import { getCookieToken, setAuthHeader } from 'mhz-helpers';

import LayoutDefault from '@/layout/components/LayoutDefault.vue';
import LayoutEmpty from '@/layout/components/LayoutEmpty.vue';

import { checkAuth } from '@/auth/services';
import { TOKEN_NAME, URL_LOGIN } from '@/auth/constants';

const route = useRoute();
const router = useRouter();

useHead({
  meta: [{ name: 'version', content: import.meta.env.VITE_VERSION }],
});

const isLoaded = ref(false);

const layoutComponent = computed(() => {
  return route.meta.layout === 'empty' ? LayoutEmpty : LayoutDefault;
});

const isLoginPage = globalThis.location.pathname === URL_LOGIN;

const token = getCookieToken(TOKEN_NAME);

if (!isLoginPage && token) {
  setAuthHeader(token);

  checkAuth();
}

onMounted(async () => {
  await router.isReady();
  isLoaded.value = true;
});
</script>
