<template>
  <div :class="[$style.search, !props.isMobileVisible && $style.hidden]">
    <UiSearch v-model="searchQuery" :searchScheme="SEARCH_SCHEME" :results="results" :isSuccess="isSuccess" lang="en" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import { UiSearch } from 'mhz-ui';

import { SEARCH_SCHEME } from '@/layout/constants';
import { search } from '@/common/services';

interface IProps {
  isMobileVisible: boolean;
}

const props = defineProps<IProps>();

const searchQuery = ref('');

const { data: results, refetch, isSuccess } = search(searchQuery);

watch(
  () => searchQuery.value,
  () => {
    if (searchQuery.value.length > 2) refetch();
  }
);
</script>

<style module lang="scss">
@media (max-width: $mobile) {
  .search {
    position: absolute;
    width: calc(100% - 32px);
    background-color: var(--color-white);
  }

  .hidden {
    display: none;
  }
}
</style>
