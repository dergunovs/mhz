<template>
  <div>
    <RouterLink :to="URL_CONFIGURATION_CREATE">Create PC configuration</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { URL_CONFIGURATION_CREATE } from '@/configuration/constants';
</script>
