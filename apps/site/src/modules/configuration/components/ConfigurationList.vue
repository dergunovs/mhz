<template>
  <div :class="$style.list">
    <ConfigurationElement
      v-for="configuration in props.configurations"
      :key="configuration._id"
      :configuration="configuration"
    />
  </div>
</template>

<script setup lang="ts">
import { IConfiguration } from 'mhz-contracts';

import ConfigurationElement from '@/configuration/components/ConfigurationElement.vue';

interface IProps {
  configurations: IConfiguration[];
}

const props = defineProps<IProps>();
</script>

<style module lang="scss">
.list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
