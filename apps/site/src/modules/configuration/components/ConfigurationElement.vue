<template>
  <div>
    <RouterLink :to="`${URL_CONFIGURATION}/${props.configuration._id}`">{{ props.configuration.title }}</RouterLink>

    <div>Date: {{ formatDateTime(props.configuration.dateCreated) }}</div>
  </div>
</template>

<script setup lang="ts">
import { formatDateTime } from 'mhz-helpers';
import { IConfiguration } from 'mhz-types';

import { URL_CONFIGURATION } from '@/configuration/constants';

interface IProps {
  configuration: IConfiguration;
}

const props = defineProps<IProps>();
</script>
