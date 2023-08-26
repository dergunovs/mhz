<template>
  <div :class="$style.container">
    <UiInput v-model="searchQuery" :appendIcon="IconSearch" placeholder="Search" />

    <div :class="$style.resultsBlock">
      <div v-if="searchQuery.length > 0 && searchQuery.length < 3 && !isResults" :class="$style.results">
        Please enter 3 or more symbols
      </div>

      <div v-if="searchQuery.length > 2 && !isResults" :class="$style.results">No results</div>

      <div v-if="searchQuery.length > 2 && isResults" :class="$style.results">
        <div v-if="results?.products.length" :class="$style.resultsInner">
          <div>Products:</div>
          <RouterLink
            v-for="product in results.products"
            :key="product._id"
            :to="`${URL_PRODUCT_EDIT}/${product._id}`"
            @click="clearSearch"
          >
            {{ product.title }}
          </RouterLink>
        </div>

        <div v-if="results?.categories.length" :class="$style.resultsInner">
          <div>Categories:</div>
          <RouterLink
            v-for="category in results.categories"
            :key="category._id"
            :to="`${URL_CATEGORY_EDIT}/${category._id}`"
            @click="clearSearch"
          >
            {{ category.title }}
          </RouterLink>
        </div>

        <div v-if="results?.manufacturers.length" :class="$style.resultsInner">
          <div>Manufacturers:</div>
          <RouterLink
            v-for="manufacturer in results.manufacturers"
            :key="manufacturer._id"
            :to="`${URL_MANUFACTURER_EDIT}/${manufacturer._id}`"
            @click="clearSearch"
          >
            {{ manufacturer.title }}
          </RouterLink>
        </div>

        <div v-if="results?.managers.length" :class="$style.resultsInner">
          <div>Managers:</div>
          <RouterLink
            v-for="manager in results.managers"
            :key="manager._id"
            :to="`${URL_MANAGER_EDIT}/${manager._id}`"
            @click="clearSearch"
          >
            {{ manager.firstName }} {{ manager.lastName }}
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import { UiInput } from 'mhz-ui';
import { debounce } from 'perfect-debounce';

import IconSearch from '@/layout/icons/search.svg?component';
import { search } from '@/common/services';
import { URL_PRODUCT_EDIT } from '@/product/constants';
import { URL_CATEGORY_EDIT } from '@/category/constants';
import { URL_MANUFACTURER_EDIT } from '@/manufacturer/constants';
import { URL_MANAGER_EDIT } from '@/manager/constants';

const searchQuery = ref('');

const { data: results, refetch } = search(searchQuery, { enabled: false });

const debounced = debounce(async () => {
  refetch();
}, 300);

watch(
  () => searchQuery.value,
  async () => {
    if (searchQuery.value.length > 2) await debounced();
  }
);

function clearSearch() {
  searchQuery.value = '';
}

const isResults = computed(() => {
  return results.value
    ? results.value.categories.length +
        results.value.managers.length +
        results.value.manufacturers.length +
        results.value.managers.length >
        0
    : false;
});
</script>

<style module lang="scss">
.container {
  position: relative;
  width: 320px;
}

.resultsBlock {
  position: absolute;
  z-index: 2;
  width: 100%;
  margin-top: 8px;
  background-color: var(--color-white);
  border-radius: 16px;
}

.results {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 320px;
  padding: 16px;
  overflow-y: auto;
  border-radius: 16px;
  box-shadow: 0 0 16px -8px var(--color-black-transparent);
}

.resultsInner {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
