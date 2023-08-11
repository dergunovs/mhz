<template>
  <div>
    <PageTitle>Categories</PageTitle>

    <div :class="$style.page">
      <RouterLink :to="URL_CATEGORY_CREATE">Add category</RouterLink>

      <CategoryList :categories="categories" />

      <UiPagination v-if="categories?.length" :page="page" :total="total" @update="updatePage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { UiPagination } from 'mhz-ui';
import { usePagination } from 'mhz-helpers';

import PageTitle from '@/layout/components/PageTitle.vue';
import CategoryList from '@/category/components/CategoryList.vue';

import { getCategories } from '@/category/services';
import { URL_CATEGORY_CREATE } from '@/category/constants';

const page = ref(1);

const { data } = getCategories(page);

const { data: categories, total, setPage } = usePagination(data);

function updatePage(pageToSet: number) {
  page.value = setPage(pageToSet, page.value);
}
</script>

<style module lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
