<template>
  <div :class="$style.categories">
    <div v-for="category in props.categories" :key="category._id" :class="$style.category">
      <component
        :is="props.isAuthor ? 'button' : 'div'"
        @click="updateCategory(`${category._id}`)"
        type="button"
        :class="$style.title"
        :data-editable="props.isAuthor"
        :data-current="props.currentCategory === category._id"
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
import { ICategory, IConfigurationParts } from 'mhz-types';
import { UiButton } from 'mhz-ui';

import ConfigurationCategoryFields from '@/configuration/components/ConfigurationCategoryFields.vue';

import { CURRENCY, PATH_UPLOAD } from '@/common/constants';
import { URL_PRODUCT } from '@/product/constants';

interface IProps {
  categories: ICategory[];
  currentCategory: string;
  choosenParts: IConfigurationParts;
  isAuthor?: boolean;
}

const props = defineProps<IProps>();
const emit = defineEmits(['update', 'remove']);

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
  row-gap: 16px;
  align-items: flex-start;
  width: 100%;
}

.category {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 25%;
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

  &[data-current='true']:not([data-editable='false']) {
    color: var(--color-primary);

    &:hover {
      text-decoration: underline;
    }
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
}
</style>
