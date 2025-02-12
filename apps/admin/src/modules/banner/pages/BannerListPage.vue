<template>
  <div>
    <PageTitle :links="links">{{ title }}</PageTitle>

    <div :class="$style.page">
      <RouterLink :to="URL_BANNER_CREATE">Add banner</RouterLink>

      <BannerList
        :banners="banners"
        v-model="query.sort"
        @reset="(value) => resetQuery(value)"
        data-test="banner-list-page-list"
      />

      <UiPagination
        v-show="banners?.length"
        :page="query.page"
        :total="total"
        @update="(value) => setQueryPage(setPaginationPage(value, query.page))"
        lang="en"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';

import { UiPagination } from 'mhz-ui';
import { usePagination, usePage } from 'mhz-helpers';

import PageTitle from '@/layout/components/PageTitle.vue';
import BannerList from '@/banner/components/BannerList.vue';

import { getBanners } from '@/banner/services';
import { URL_BANNER, URL_BANNER_CREATE } from '@/banner/constants';
import { URL_MAIN } from '@/common/constants';

const { query, resetQuery, setQueryPage } = usePage();

const { data } = getBanners(query);

const { data: banners, total, setPaginationPage } = usePagination(data);

const title = 'Banners';

const links = [
  { url: URL_MAIN, title: 'Main' },
  { url: URL_BANNER, title },
];

useHead({
  title,
});
</script>

<style module lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
