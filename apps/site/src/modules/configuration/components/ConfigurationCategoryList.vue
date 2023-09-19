<template>
  <div :class="$style.container">
    <div :class="$style.errorMessages">
      <div v-for="message in props.errorMessages" :key="message">
        {{ message }}
      </div>
    </div>

    <div :class="$style.categories">
      <ConfigurationCategory
        v-for="category in sortedCategories"
        :key="category._id"
        :category="category"
        :isAuthor="props.isAuthor"
        :currentCategory="props.currentCategory"
        :choosenParts="props.choosenParts"
        :errors="props.errors"
        @update="(id) => emit('update', id)"
        @remove="(title) => emit('remove', title)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { ICategory, IConfigurationParts } from 'mhz-contracts';
import { clone } from 'mhz-helpers';

import ConfigurationCategory from '@/configuration/components/ConfigurationCategory.vue';

import { CONFIGURATION_CATEGORIES_ORDER } from '@/configuration/constants';
import { IConfigurationError } from '@/configuration/interface';

interface IProps {
  categories: ICategory[];
  currentCategory: string;
  choosenParts: IConfigurationParts;
  isAuthor?: boolean;
  errors?: IConfigurationError[];
  errorMessages?: string[];
}

const props = defineProps<IProps>();
const emit = defineEmits(['update', 'remove']);

const sortedCategories = computed(() => {
  return clone(props.categories).sort(
    (a, b) => CONFIGURATION_CATEGORIES_ORDER.indexOf(a.title) - CONFIGURATION_CATEGORIES_ORDER.indexOf(b.title)
  );
});
</script>

<style module lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.errorMessages {
  color: var(--color-error);
}

.categories {
  display: flex;
  flex-wrap: wrap;
  row-gap: 8px;
  align-items: flex-start;
  width: 100%;
}
</style>
