<template>
  <div>
    <PageTitle :links="links">{{ title }}</PageTitle>

    <CategoryForm />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';

import PageTitle from '@/layout/components/PageTitle.vue';
import CategoryForm from '@/category/components/CategoryForm.vue';

import { URL_CATEGORY, URL_CATEGORY_CREATE } from '@/category/constants';
import { URL_MAIN } from '@/common/constants';

const title = 'Add category';

const links = [
  { url: URL_MAIN, title: 'Main' },
  { url: URL_CATEGORY, title: 'Categories' },
  { url: URL_CATEGORY_CREATE, title },
];

useHead({
  title,
});
</script>
