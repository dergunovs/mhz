<template>
  <div>
    <PageTitle>Managers</PageTitle>

    <div :class="$style.page">
      <RouterLink :to="URL_MANAGER_CREATE">Add manager</RouterLink>

      <ManagerList v-model="query.sort" @reset="(value) => resetQuery(value)" />

      <UiPagination
        v-if="managers?.length"
        :page="query.page"
        :total="total"
        @update="(value) => setQueryPage(setPage(value, query.page))"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { UiPagination } from 'mhz-ui';
import { usePagination, usePage } from 'mhz-helpers';

import PageTitle from '@/layout/components/PageTitle.vue';
import ManagerList from '@/manager/components/ManagerList.vue';

import { getManagers } from '@/manager/services';
import { URL_MANAGER, URL_MANAGER_CREATE } from '@/manager/constants';

const { query, resetQuery, setQueryPage } = usePage(URL_MANAGER, 'email');

const { data } = getManagers(query);

const { data: managers, total, setPage } = usePagination(data);
</script>

<style module lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
