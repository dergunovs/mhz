<template>
  <div :class="$style.page">
    <PageTitle>{{ title }}</PageTitle>

    <div>
      <ConfigurationAuthor v-if="!isAuthor && configurationData?.data" :configuration="configurationData.data" />

      <ConfigurationForm
        v-if="configurationData?.data && categories && currentCategory"
        @update="updateCategory"
        :configuration="configurationData.data"
        :categories="categories"
        :currentCategory="currentCategory"
        :choosenProduct="choosenProduct"
        :isAuthor="isAuthor"
      />

      <div v-if="isAuthor" :class="$style.products">
        <FullscreenFilters v-slot="{ hide }">
          <ProductCatalogFilter
            v-if="priceRange && filters"
            :filtersInitial="filters"
            :filtersBase="data?.filters"
            :priceRange="priceRange"
            :key="currentCategory"
            isCategory
            @update="updateQuery"
            @hide="hide"
          />
        </FullscreenFilters>

        <div :class="$style.container">
          <div v-if="!products?.length && !isLoading">No such products. Please, change your filters</div>

          <ProductCatalogSort v-else v-model="query.sort" :page="query.page" @reset="(value) => resetQuery(value)" />

          <ProductCatalogList v-if="products?.length" :products="products" isConfiguration @choice="handleChoice" />

          <UiPagination
            v-show="products?.length"
            :page="query.page"
            :total="total"
            @update="(value) => setQueryPage(setPaginationPage(value, query.page))"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';

import { UiPagination } from 'mhz-ui';
import { clone, usePage, usePagination } from 'mhz-helpers';
import { IProduct } from 'mhz-contracts';

import PageTitle from '@/layout/components/PageTitle.vue';
import FullscreenFilters from '@/layout/components/FullscreenFilters.vue';
import ConfigurationForm from '@/configuration/components/ConfigurationForm.vue';
import ConfigurationAuthor from '@/configuration/components/ConfigurationAuthor.vue';
import ProductCatalogList from '@/product/components/ProductCatalogList.vue';
import ProductCatalogSort from '@/product/components/ProductCatalogSort.vue';
import ProductCatalogFilter from '@/product/components/ProductCatalogFilter.vue';

import { getProductFilters, getProductPriceRange, getProducts } from '@/product/services';
import { getCategories } from '@/category/services';
import { getConfiguration } from '@/configuration/services';

const currentCategory = ref<string>();
const choosenProduct = ref<IProduct>();

const route = useRoute();

const configurationId = computed(() => route.params.configuration);

const { data: configurationData } = getConfiguration(configurationId.value);

const isCurrentCategory = ref(false);

const { data: categories } = getCategories();

watch(
  () => categories.value,
  () => getProductsAfterCategorySelect()
);

const isAuthor = computed(() => !!configurationData.value?.isConfigurationEditable && isCurrentCategory.value);

const { query, setQueryPage, resetQuery, setQueryFilter } = usePage({ category: [currentCategory.value] });

const { data, isLoading } = getProducts(query, 'category', isAuthor);

const { data: products, setPaginationPage, total } = usePagination(data);

const { data: priceRange } = getProductPriceRange('category', currentCategory, isAuthor);
const { data: filters } = getProductFilters('category', currentCategory, isAuthor);

function updateCategory(id?: string) {
  currentCategory.value = id;
  setQueryFilter({ category: [id] });
}

function updateQuery(filtersToSet: object) {
  setQueryFilter({ ...filtersToSet, category: [currentCategory.value] });
}

function handleChoice(choice: IProduct) {
  choosenProduct.value = clone(choice);
  document.querySelector('main')?.scrollTo(0, 0);
}

function getProductsAfterCategorySelect() {
  updateCategory(categories.value?.find((category) => category.title === 'Motherboard')?._id);
  isCurrentCategory.value = true;
}

onMounted(() => {
  getProductsAfterCategorySelect();
});

const title = 'PC configuration';

useHead({
  title,
});
</script>

<style module lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-height: calc(100vh - 128px);
}

.container {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 32px;
}

.products {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

@media (max-width: $notebook) {
  .products {
    gap: 16px;
  }
}

@media (max-width: $mobile) {
  .products {
    flex-direction: column;
  }

  .container {
    width: 100%;
  }
}
</style>
