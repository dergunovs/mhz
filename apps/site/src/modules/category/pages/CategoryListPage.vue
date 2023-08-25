<template>
  <div>
    <PageTitle :links="links">{{ title }}</PageTitle>

    <div :class="$style.page">
      <CategoryCatalogList v-if="categories?.length" :categories="categories" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';

import { usePagination, usePage } from 'mhz-helpers';

import PageTitle from '@/layout/components/PageTitle.vue';
import CategoryCatalogList from '@/category/components/CategoryCatalogList.vue';

import { getCategories } from '@/category/services';
import { URL_CATEGORY } from '@/category/constants';
import { URL_MAIN } from '@/common/constants';

const { query } = usePage();

const { data } = getCategories(query);

const { data: categories } = usePagination(data);

const title = 'Categories';

const links = [
  { url: URL_MAIN, title: 'Main' },
  { url: URL_CATEGORY, title },
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
