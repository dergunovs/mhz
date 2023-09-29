<template>
  <div>
    <PageTitle :links="links">{{ title }}</PageTitle>

    <BannerForm />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';

import PageTitle from '@/layout/components/PageTitle.vue';
import BannerForm from '@/banner/components/BannerForm.vue';

import { URL_BANNER, URL_BANNER_CREATE } from '@/banner/constants';
import { URL_MAIN } from '@/common/constants';

const title = 'Add banner';

const links = [
  { url: URL_MAIN, title: 'Main' },
  { url: URL_BANNER, title: 'Banners' },
  { url: URL_BANNER_CREATE, title },
];

useHead({
  title,
});
</script>
