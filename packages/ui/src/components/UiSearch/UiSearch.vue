<template>
  <div :class="$style.container" ref="containerElement">
    <UiInput
      :modelValue="props.modelValue"
      @update:modelValue="async (value) => await debounced(value.toString())"
      @click="showResults"
      @keyup.esc="hideResults"
      :appendIcon="IconSearch"
      placeholder="Search"
      data-test="ui-search"
    />

    <div v-if="isShowResults && props.modelValue.length" :class="$style.results" data-test="ui-search-results">
      <template v-if="props.modelValue.length < 3">{{ ENTER_MORE_SYMBOLS }}</template>
      <template v-if="props.modelValue.length > 2 && !props.isSuccess">{{ LOADING }}</template>
      <template v-if="props.modelValue.length > 2 && !isResults && props.isSuccess">{{ NO_RESULTS }}</template>

      <template v-if="props.modelValue.length > 2 && isResults && props.isSuccess">
        <div
          v-for="result in props.searchScheme"
          :key="result.type"
          :class="$style.resultsInner"
          data-test="ui-search-result"
        >
          <template v-if="results?.[result.type]?.length">
            <div :class="$style.type" data-test="ui-search-result-type">{{ result.type }}:</div>

            <component
              :is="linkComponent"
              v-for="item in results[result.type]"
              :key="item._id"
              :to="`${result.url}/${item._id}`"
              @click="clearSearch"
              :class="$style.link"
              data-test="ui-search-result-link"
            >
              <span v-for="label in result.labels" :key="label" data-test="ui-search-result-label">
                {{ item[label as keyof object] }}
              </span>
            </component>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { onClickOutside } from '@vueuse/core';

import { debounce } from 'perfect-debounce';

import UiInput from '../UiInput/UiInput.vue';
import IconSearch from './icons/search.svg?component';
import { DEBOUNCE_TIME, ENTER_MORE_SYMBOLS, LOADING, NO_RESULTS } from './constants';

interface ISearchScheme {
  type: string;
  labels: string[];
  url: string;
}

interface IProps {
  modelValue: string;
  searchScheme: ISearchScheme[];
  results?: { [key: string]: { _id: string }[] };
  isSuccess: boolean;
}

const props = defineProps<IProps>();
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();

const isShowResults = ref(false);

const debounced = debounce(async (value: string) => {
  emit('update:modelValue', value);
}, DEBOUNCE_TIME);

function showResults() {
  isShowResults.value = true;
}

function hideResults() {
  isShowResults.value = false;
}

function clearSearch() {
  hideResults();
  emit('update:modelValue', '');
}

const isResults = computed(() => {
  return props.results ? Object.values(props.results).reduce((acc, val) => acc + (val ? val.length : 0), 0) : false;
});

const containerElement = ref<HTMLElement>();

onClickOutside(containerElement, () => {
  hideResults();
});

declare const window: Window & typeof globalThis & { IS_STORYBOOK: boolean };

const linkComponent = computed(() => (window['IS_STORYBOOK'] ? 'a' : RouterLink));
</script>

<style module lang="scss">
.container {
  position: relative;
  width: 320px;
}

.results {
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-height: 320px;
  padding: 16px;
  margin-top: 8px;
  overflow-y: auto;
  background-color: var(--color-white);
  border-radius: 16px;
  box-shadow: 0 0 16px -8px var(--color-black-transparent);
}

.resultsInner {
  display: flex;
  flex-direction: column;
  gap: 4px;

  &:empty {
    display: none;
  }
}

.type {
  font-weight: 700;
  text-transform: capitalize;
}

.link {
  display: flex;
  gap: 4px;
  text-decoration: none;
}

@media (max-width: $tablet) {
  .container {
    width: 280px;
  }
}

@media (max-width: $tablet) {
  .container {
    width: 100%;
  }
}
</style>
