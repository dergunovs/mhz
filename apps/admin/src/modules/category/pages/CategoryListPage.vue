<template>
  <div>
    <PageTitle>Categories</PageTitle>

    <div :class="$style.page">
      <RouterLink :to="URL_CATEGORY_CREATE">Add category</RouterLink>

      <CategoryList :categories="categories" v-model="query.sort" @reset="(value) => resetQuery(value)" />

      <UiPagination
        v-if="categories?.length"
        :page="query.page"
        :total="total"
        @update="(value) => setQueryPage(setPage(value, query.page))"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { UiPagination } from 'mhz-ui';
import { usePagination, usePage } from 'mhz-helpers';

import PageTitle from '@/layout/components/PageTitle.vue';
import CategoryList from '@/category/components/CategoryList.vue';

import { getCategories } from '@/category/services';
import { URL_CATEGORY, URL_CATEGORY_CREATE } from '@/category/constants';

const { query, resetQuery, setQueryPage } = usePage(URL_CATEGORY, 'title');

const { data } = getCategories(query);

const { data: categories, total, setPage } = usePagination(data);
</script>

<style module lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
