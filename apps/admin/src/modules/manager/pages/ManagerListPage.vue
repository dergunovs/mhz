<template>
  <div>
    <PageTitle>Managers</PageTitle>

    <div :class="$style.page">
      <RouterLink :to="URL_MANAGER_CREATE">Add manager</RouterLink>

      <ManagerList :managers="managers" />

      <UiPagination v-if="managers?.length" :page="page" :total="total" @update="updatePage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { UiPagination } from 'mhz-ui';
import { usePagination } from 'mhz-helpers';

import PageTitle from '@/layout/components/PageTitle.vue';
import ManagerList from '@/manager/components/ManagerList.vue';

import { getManagers } from '@/manager/services';
import { URL_MANAGER_CREATE } from '@/manager/constants';

const page = ref(1);

const { data } = getManagers(page);

const { data: managers, total, setPage } = usePagination(data);

function updatePage(pageToSet: number) {
  page.value = setPage(pageToSet, page.value);
}
</script>

<style module lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
