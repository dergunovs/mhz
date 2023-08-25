<template>
  <div>
    <PageTitle :links="links">{{ title }}</PageTitle>

    <ManagerForm v-if="manager" :manager="manager" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';

import PageTitle from '@/layout/components/PageTitle.vue';
import ManagerForm from '@/manager/components/ManagerForm.vue';

import { getManager } from '@/manager/services';
import { URL_MANAGER } from '@/manager/constants';
import { URL_MAIN } from '@/common/constants';

const route = useRoute();

const managerId = computed(() => route.params.id.toString());

const { data: manager } = getManager(managerId);

const title = 'Edit manager';

const links = computed(() => [
  { url: URL_MAIN, title: 'Main' },
  { url: URL_MANAGER, title: 'Managers' },
  { url: route.path, title: `${manager.value?.firstName} ${manager.value?.lastName}` },
]);

useHead({
  title,
});
</script>
