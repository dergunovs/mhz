<template>
  <div :class="$style.container" ref="containerElement">
    <UiInput
      :modelValue="typeof props.modelValue === 'string' ? props.modelValue : props.modelValue?.title"
      @toggle="isShowOptions ? hideOptions() : showOptions()"
      mode="select"
      placeholder="Choose variant"
      :appendIcon="isShowOptions ? IconOpened : IconClosed"
      data-test="ui-select-input"
    />

    <div v-if="props.isFilter && isShowOptions" :class="$style.filter">
      <UiInput v-model="filterQuery" placeholder="Filter Variants" isFocus data-test="ui-select-input-filter" />
    </div>

    <div v-if="isShowOptions" :class="$style.options" ref="optionsElement" data-test="ui-select-options">
      <div v-if="optionsComputed.length" ref="optionsInnerElement">
        <div
          v-for="(option, index) in optionsComputed"
          :key="`${option}-${index}`"
          @click="setOption(option)"
          @keydown.enter="setOption(option)"
          @keydown.space="setOption(option)"
          @mouseenter="setFocusedOptionIndex(index)"
          @keydown.up="setFocusedOptionIndex(index - 1)"
          @keydown.down="setFocusedOptionIndex(index + 1)"
          @keydown.esc="isShowOptions ? hideOptions() : showOptions()"
          :class="$style.option"
          tabindex="0"
          ref="optionElement"
          :data-current="
            typeof props.modelValue === 'string'
              ? props.modelValue === option._id
              : props.modelValue?._id === option._id
          "
          data-test="ui-select-option"
        >
          {{ option.title }}
        </div>
      </div>

      <div v-else @click="hideOptions" :class="$style.option" tabindex="0" data-test="ui-select-no-results">
        No results
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { onClickOutside } from '@vueuse/core';

import UiInput from '../UiInput/UiInput.vue';

import IconClosed from './icons/closed.svg?component';
import IconOpened from './icons/opened.svg?component';

interface IOption {
  _id?: string;
  title: string;
}

interface IProps {
  modelValue?: string | IOption;
  options?: string[] | IOption[];
  isFilter?: boolean;
}

const props = defineProps<IProps>();
const emit = defineEmits(['update:modelValue', 'reachedBottom']);

const filterQuery = ref('');

const isObject = computed(() => typeof props.options?.[0] === 'object');

const optionsComputed = computed(() => {
  if (!props.options) return [];

  let optionsObject = props.options as IOption[];

  if (!isObject.value) {
    optionsObject = (props.options as IOption[]).map((option) => {
      return { _id: option as unknown as string, title: option as unknown as string };
    });
  }

  return props.isFilter
    ? optionsObject.filter((option) => option.title.toLowerCase().includes(filterQuery.value.toLowerCase()))
    : optionsObject;
});

const isShowOptions = ref(false);

const optionsElement = ref<HTMLElement>();
const optionsInnerElement = ref<HTMLElement>();
const optionElement = ref<HTMLElement[]>([]);

function setFocusedOptionIndex(index: number) {
  if (index < 0 || index === optionsComputed.value.length || props.isFilter) return;
  optionElement.value[index]?.focus();
}

function hideOptions() {
  optionsElement.value?.removeEventListener('scroll', checkScroll, true);

  filterQuery.value = '';
  isShowOptions.value = false;
}

function showOptions() {
  isShowOptions.value = true;

  if (!props.isFilter) {
    setTimeout(() => {
      optionsElement.value?.scrollTo(0, 0);
      setFocusedOptionIndex(0);

      optionsElement.value?.addEventListener('scroll', checkScroll, true);
    }, 100);
  }
}

function setOption(option: IOption) {
  emit('update:modelValue', isObject.value ? option : option._id);
  hideOptions();
}

function checkScroll() {
  if (!optionsElement.value || !optionsInnerElement.value) return;

  const scrollPosition =
    optionsElement.value.getBoundingClientRect().y -
    optionsInnerElement.value.getBoundingClientRect().y -
    optionsInnerElement.value.scrollHeight +
    optionsElement.value.getBoundingClientRect().height;

  if (scrollPosition > -100) emit('reachedBottom');
}

const containerElement = ref<HTMLElement>();

onClickOutside(containerElement, () => {
  hideOptions();
});
</script>

<style module lang="scss">
.container {
  position: relative;
}

.filter {
  margin-top: 8px;
}

.options {
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  min-width: 100%;
  max-height: 200px;
  margin-top: 8px;
  overflow-y: auto;
  background-color: var(--color-white);
  border: 1px solid var(--color-gray);
  border-radius: 16px;
}

.option {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  height: 40px;
  padding: 0 16px;
  cursor: pointer;
  outline: none;

  &:hover,
  &:focus {
    color: var(--color-white);
    background-color: var(--color-primary);
  }

  &[data-current='true'] {
    color: var(--color-black);
    background-color: var(--color-gray-light);

    &:hover,
    &:focus {
      background-color: var(--color-gray);
    }
  }
}
</style>
