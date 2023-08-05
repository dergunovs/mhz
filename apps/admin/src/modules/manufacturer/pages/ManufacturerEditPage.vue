<template>
  <div>
    <PageTitle>Edit manufacturer</PageTitle>

    <ManufacturerForm v-if="manufacturer" :manufacturer="manufacturer" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import PageTitle from '@/layout/components/PageTitle.vue';
import ManufacturerForm from '@/manufacturer/components/ManufacturerForm.vue';

import { getManufacturer } from '@/manufacturer/services';

const route = useRoute();

const manufacturerId = computed(() => route.params.id.toString());

const { data: manufacturer } = getManufacturer(manufacturerId);
</script>
