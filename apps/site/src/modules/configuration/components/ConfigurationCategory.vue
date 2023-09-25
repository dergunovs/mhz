<template>
  <div :class="$style.category" :data-current="props.currentCategory === props.category._id && props.isAuthor">
    <component
      :is="props.isAuthor ? 'button' : 'div'"
      @click="updateCategory(props.category._id)"
      type="button"
      :class="$style.title"
      :data-editable="props.isAuthor"
    >
      <img
        :src="`${PATH_UPLOAD}/${props.category.iconUrl}`"
        :class="$style.icon"
        width="24"
        height="24"
        crossorigin="anonymous"
      />

      {{ props.category.title }}
    </component>

    <div :class="$style.choosen">
      <div v-if="currentProduct(props.category)">
        <a
          :href="`${URL_PRODUCT}/${currentProduct(props.category)?._id}`"
          :class="$style.link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ currentProduct(props.category)?.title }}
        </a>

        <div :class="$style.priceBlock">
          <span :class="$style.price">{{ currentProduct(props.category)?.price }} {{ CURRENCY }}</span>

          <button
            v-if="props.isAuthor"
            @click="emit('remove', props.category.title)"
            type="button"
            :class="$style.remove"
          >
            Remove
          </button>
        </div>

        <ConfigurationCategoryFields :product="currentProduct(props.category)" :errors="props.errors" />
      </div>

      <button v-else @click="updateCategory(props.category._id)" :class="$style.notChoosen" type="button">
        Not choosen
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ICategory, IConfigurationParts } from 'mhz-contracts';

import ConfigurationCategoryFields from '@/configuration/components/ConfigurationCategoryFields.vue';

import { CURRENCY, PATH_UPLOAD } from '@/common/constants';
import { URL_PRODUCT } from '@/product/constants';
import { IConfigurationError } from '@/configuration/interface';

interface IProps {
  category: ICategory;
  currentCategory: string;
  isAuthor?: boolean;
  choosenParts?: IConfigurationParts;
  errors?: IConfigurationError[];
}

const props = defineProps<IProps>();
const emit = defineEmits(['update', 'remove']);

function updateCategory(id?: string) {
  if (props.isAuthor && id) emit('update', id);
}

function currentProduct(category: ICategory) {
  return props.choosenParts?.[category.title as keyof IConfigurationParts];
}
</script>

<style module lang="scss">
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

.title {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 0;
  font-size: 1rem;
  font-weight: 700;
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

.link {
  font-size: 0.875rem;
}

.priceBlock {
  display: flex;
  gap: 8px;
}

.price {
  font-weight: 700;
}

.remove {
  padding: 0;
  font-size: 0.875rem;
  text-decoration: underline;
  cursor: pointer;
  background: none;
  border: none;
}

.notChoosen {
  padding: 0;
  font-size: 0.875rem;
  color: var(--color-gray-dark-extra);
  cursor: pointer;
  background: none;
  border: 0;
}
</style>
