<template>
  <div>
    <PageTitle :links="links">{{ category?.title }}</PageTitle>

    <CategoryCard v-if="category" :category="category" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import PageTitle from '@/layout/components/PageTitle.vue';
import CategoryCard from '@/category/components/CategoryCard.vue';

import { getCategory } from '@/category/services';
import { URL_MAIN } from '@/common/constants';
import { URL_CATEGORY } from '@/category/constants';

const route = useRoute();

const categoryId = computed(() => route.params.id.toString());

const { data: category } = getCategory(categoryId);

const links = computed(() => [
  { url: URL_MAIN, title: 'Main' },
  { url: `${URL_CATEGORY}`, title: 'Categories' },
  { url: `${URL_CATEGORY}/${category.value?._id}`, title: category.value?.title },
]);
</script>
