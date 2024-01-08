<template>
  <div>
    <PageTitle :links="links">{{ title }}</PageTitle>

    <BannerForm v-if="banner" :banner="banner" data-test="banner-edit-page-form" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';

import PageTitle from '@/layout/components/PageTitle.vue';
import BannerForm from '@/banner/components/BannerForm.vue';

import { getBanner } from '@/banner/services';
import { URL_MAIN } from '@/common/constants';
import { URL_BANNER } from '@/banner/constants';

const route = useRoute();

const bannerId = computed(() => route.params.banner);

const { data: banner } = getBanner(bannerId);

const title = 'Edit banner';

const links = computed(() => [
  { url: URL_MAIN, title: 'Main' },
  { url: URL_BANNER, title: 'Banners' },
  { url: route.path, title: banner.value?.product.title || '' },
]);

useHead({
  title,
});
</script>
