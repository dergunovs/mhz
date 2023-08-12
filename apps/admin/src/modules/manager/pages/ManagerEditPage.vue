<template>
  <div>
    <PageTitle>Edit manager</PageTitle>

    <ManagerForm v-if="manager" :manager="manager" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import PageTitle from '@/layout/components/PageTitle.vue';
import ManagerForm from '@/manager/components/ManagerForm.vue';

import { getManager } from '@/manager/services';

const route = useRoute();

const managerId = computed(() => route.params.id.toString());

const { data: manager } = getManager(managerId);
</script>
