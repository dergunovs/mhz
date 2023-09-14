<template>
  <div>
    <PageTitle :links="links">{{ title }}</PageTitle>

    <div :class="$style.page">
      <RouterLink :to="URL_CATEGORY_CREATE">Add category</RouterLink>

      <CategoryList :categories="categories" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';

import PageTitle from '@/layout/components/PageTitle.vue';
import CategoryList from '@/category/components/CategoryList.vue';

import { getCategories } from '@/category/services';
import { URL_CATEGORY, URL_CATEGORY_CREATE } from '@/category/constants';
import { URL_MAIN } from '@/common/constants';

const { data: categories } = getCategories();

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
