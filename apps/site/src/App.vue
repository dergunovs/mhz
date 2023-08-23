<template>
  <div>
    <component v-if="isLoaded" :is="layoutComponent" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHead } from '@vueuse/head';

import LayoutDefault from '@/layout/components/LayoutDefault.vue';
import LayoutEmpty from '@/layout/components/LayoutEmpty.vue';

const route = useRoute();
const router = useRouter();

useHead({
  meta: [{ name: 'version', content: import.meta.env.VITE_VERSION }],
});

const isLoaded = ref(false);

const layoutComponent = computed(() => (route.meta.layout === 'empty' ? LayoutEmpty : LayoutDefault));

onMounted(async () => {
  await router.isReady();
  isLoaded.value = true;
});
</script>
