<template>
  <div>
    <PageTitle :links="links">{{ title }}</PageTitle>

    <div :class="$style.page">
      <RouterLink :to="URL_MANAGER_CREATE">Add manager</RouterLink>

      <ManagerList :managers="managers" v-model="query.sort" @reset="(value) => resetQuery(value)" />

      <UiPagination
        v-show="managers?.length"
        :page="query.page"
        :total="total"
        @update="(value) => setQueryPage(setPage(value, query.page))"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';

import { UiPagination } from 'mhz-ui';
import { usePagination, usePage } from 'mhz-helpers';

import PageTitle from '@/layout/components/PageTitle.vue';
import ManagerList from '@/manager/components/ManagerList.vue';

import { getManagers } from '@/manager/services';
import { URL_MANAGER, URL_MANAGER_CREATE } from '@/manager/constants';
import { URL_MAIN } from '@/common/constants';

const { query, resetQuery, setQueryPage } = usePage();

const { data } = getManagers(query);

const { data: managers, total, setPage } = usePagination(data);

const title = 'Managers';

const links = [
  { url: URL_MAIN, title: 'Main' },
  { url: URL_MANAGER, title },
];

useHead({
  title,
});
</script>

<style module lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
