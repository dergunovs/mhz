<template>
  <div>
    <PageTitle>Edit category</PageTitle>

    <CategoryForm v-if="category" :category="category" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import PageTitle from '@/layout/components/PageTitle.vue';
import CategoryForm from '@/category/components/CategoryForm.vue';

import { getCategory } from '@/category/services';

const route = useRoute();

const categoryId = computed(() => route.params.id.toString());

const { data: category } = getCategory(categoryId);
</script>
