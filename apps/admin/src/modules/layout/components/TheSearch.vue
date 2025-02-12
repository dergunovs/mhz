<template>
  <div>
    <UiSearch
      v-model="searchQuery"
      :searchScheme="SEARCH_SCHEME"
      :results="results"
      :isSuccess="isSuccess"
      lang="en"
      data-test="search"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import { UiSearch } from 'mhz-ui';

import { SEARCH_SCHEME } from '@/layout/constants';
import { search } from '@/common/services';

const searchQuery = ref('');

const { data: results, refetch, isSuccess } = search(searchQuery);

watch(
  () => searchQuery.value,
  () => {
    if (searchQuery.value.length > 2) refetch();
  }
);
</script>
