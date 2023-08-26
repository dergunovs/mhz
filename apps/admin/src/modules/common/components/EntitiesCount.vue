<template>
  <div>
    {{ count }}
  </div>
</template>

<script setup lang="ts">
import { getEntitiesCount } from '@/common/services';

const { data: count } = getEntitiesCount();
</script>
