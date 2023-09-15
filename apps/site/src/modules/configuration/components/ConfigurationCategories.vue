<template>
  <div :class="$style.categories">
    <div
      v-for="category in sortedCategories"
      :key="category._id"
      :class="$style.category"
      :data-current="props.currentCategory === category._id"
    >
      <component
        :is="props.isAuthor ? 'button' : 'div'"
        @click="updateCategory(`${category._id}`)"
        type="button"
        :class="$style.title"
        :data-editable="props.isAuthor"
      >
        <img
          :src="`${PATH_UPLOAD}/${category.iconUrl}`"
          :class="$style.icon"
          width="32"
          height="32"
          loading="lazy"
          crossorigin="anonymous"
        />

        {{ category.title }}
      </component>

      <div :class="$style.choosen">
        <div v-if="currentProduct(category)">
          <a
            :href="`${URL_PRODUCT}/${currentProduct(category)?._id}`"
            :class="$style.link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ currentProduct(category)?.title }}
          </a>

          <div :class="$style.price">{{ currentProduct(category)?.price }} {{ CURRENCY }}</div>

          <ConfigurationCategoryFields :product="currentProduct(category)" />

          <UiButton @click="emit('remove', category.title)" layout="plain">Remove</UiButton>
        </div>

        <div v-else>Not choosen</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { ICategory, IConfigurationParts } from 'mhz-types';
import { UiButton } from 'mhz-ui';
import { clone } from 'mhz-helpers';

import ConfigurationCategoryFields from '@/configuration/components/ConfigurationCategoryFields.vue';

import { CURRENCY, PATH_UPLOAD } from '@/common/constants';
import { URL_PRODUCT } from '@/product/constants';
import { CONFIGURATION_CATEGORIES_ORDER } from '@/configuration/constants';

interface IProps {
  categories: ICategory[];
  currentCategory: string;
  choosenParts: IConfigurationParts;
  isAuthor?: boolean;
}

const props = defineProps<IProps>();
const emit = defineEmits(['update', 'remove']);

const sortedCategories = computed(() => {
  return clone(props.categories).sort(
    (a, b) => CONFIGURATION_CATEGORIES_ORDER.indexOf(a.title) - CONFIGURATION_CATEGORIES_ORDER.indexOf(b.title)
  );
});

function updateCategory(id: string) {
  if (props.isAuthor) emit('update', id);
}

function currentProduct(category: ICategory) {
  return props.choosenParts[category.title as keyof IConfigurationParts];
}
</script>

<style module lang="scss">
.categories {
  display: flex;
  flex-wrap: wrap;
  row-gap: 8px;
  align-items: flex-start;
  width: 100%;
}

.category {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 25%;
  padding: 8px;
  border-radius: 8px;

  &[data-current='true'] {
    background-color: var(--color-gray-light-extra);
  }
}

.icon {
  width: 32px;
  height: 32px;
}

.title {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 0;
  font-size: 1rem;
  cursor: pointer;
  background: none;
  border: 0;

  &:hover:not([data-editable='false']) {
    text-decoration: underline;
  }

  &[data-editable='false'] {
    cursor: default;
  }
}

.choosen {
  font-size: 0.875rem;
  line-height: 1.3;
  color: var(--color-gray-dark-extra);
}

.link {
  font-size: 1rem;
}

.price {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-black);
}
</style>
