<template>
  <div>
    <div>
      <b>Author:</b>
      {{ props.configuration.customer?.firstName }}
      {{ props.configuration.customer?.lastName }}
    </div>

    <div>
      <b>Created:</b>
      {{ formatDateTime(props.configuration.dateCreated) }}
    </div>

    <div>
      <b>Summary price:</b>
      {{ price }} {{ CURRENCY }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { formatDateTime } from 'mhz-helpers';
import { IConfiguration } from 'mhz-types';

import { CURRENCY } from '@/common/constants';

interface IProps {
  configuration: IConfiguration;
}

const props = defineProps<IProps>();

const price = computed(() => Object.values(props.configuration.parts).reduce((acc, product) => acc + product.price, 0));
</script>
