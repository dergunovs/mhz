<template>
  <div :class="$style.page">
    <div>
      <UiButton @click="router.push(URL_CUSTOMER_CONFIGURATION_CREATE)">Create PC configuration</UiButton>
    </div>

    <ConfigurationList v-if="configurations" :configurations="configurations" />

    <UiPagination
      v-show="configurations?.length"
      :page="query.page"
      :total="total"
      @update="(value) => setQueryPage(setPaginationPage(value, query.page))"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import { UiButton, UiPagination } from 'mhz-ui';
import { usePagination, usePage } from 'mhz-helpers';

import ConfigurationList from '@/configuration/components/ConfigurationList.vue';

import { getConfigurations } from '@/configuration/services';
import { URL_CUSTOMER_CONFIGURATION_CREATE } from '@/customer/constants';

const router = useRouter();

const { query, setQueryPage } = usePage();

const { data } = getConfigurations(query);

const { data: configurations, total, setPaginationPage } = usePagination(data);
</script>

<style module lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
