<template>
  <div :class="$style.container" ref="containerElement">
    <UiInput
      :modelValue="typeof props.modelValue === 'object' ? props.modelValue.title : props.modelValue"
      @update="handleUpdate"
      @toggle="isShowOptions ? hideOptions() : showOptions()"
      mode="select"
      placeholder="Choose variant"
      :appendIcon="isShowOptions ? IconOpened : IconClosed"
    />

    <div v-if="props.isFilter && isShowOptions" :class="$style.filter">
      <UiInput v-model="filterQuery" placeholder="Filter Variants" isFocus />
    </div>

    <div v-if="isShowOptions" :class="$style.options" ref="optionsElement">
      <div v-if="optionsComputed?.length">
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
          :data-current="props.modelValue === option._id"
        >
          {{ option.title }}
        </div>
      </div>

      <div v-else @click="hideOptions" :class="$style.option" tabindex="0">No results</div>
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
  modelValue: string | IOption;
  options?: string[] | IOption[];
  isFilter?: boolean;
}

const props = defineProps<IProps>();
const emit = defineEmits(['update:modelValue']);

const filterQuery = ref('');

const optionsComputed = computed(() => {
  if (!props.options) return [];

  let optionsObject = props.options as IOption[];

  if (typeof props.options[0] !== 'object') {
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
const optionElement = ref<HTMLElement[]>([]);

function handleUpdate(value: string) {
  emit('update:modelValue', value);
}

function setFocusedOptionIndex(index: number) {
  if (index < 0 || index === optionsComputed.value.length || props.isFilter) return;
  optionElement.value[index]?.focus();
}

function hideOptions() {
  filterQuery.value = '';
  isShowOptions.value = false;
}

function showOptions() {
  isShowOptions.value = true;

  if (!props.isFilter) {
    setTimeout(() => {
      optionsElement.value?.scrollTo(0, 0);
      setFocusedOptionIndex(0);
    }, 100);
  }
}

function setOption(option: IOption) {
  emit('update:modelValue', typeof props.modelValue === 'object' ? option : option._id);
  hideOptions();
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
  z-index: 1;
  display: flex;
  flex-direction: column;
  min-width: 100%;
  max-height: 240px;
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
  height: 44px;
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
