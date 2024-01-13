<template>
  <div>
    <PageTitle :links="links">{{ title }}</PageTitle>

    <CategoryForm v-if="category" :category="category" data-test="category-edit-page-form" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';

import PageTitle from '@/layout/components/PageTitle.vue';
import CategoryForm from '@/category/components/CategoryForm.vue';

import { getCategory } from '@/category/services';
import { URL_MAIN } from '@/common/constants';
import { URL_CATEGORY } from '@/category/constants';

const route = useRoute();

const categoryId = computed(() => route.params.category);

const { data: category } = getCategory(categoryId);

const title = 'Edit category';

const links = computed(() => [
  { url: URL_MAIN, title: 'Main' },
  { url: URL_CATEGORY, title: 'Categories' },
  { url: route.path, title: category.value?.title || '' },
]);

useHead({
  title,
});
</script>
