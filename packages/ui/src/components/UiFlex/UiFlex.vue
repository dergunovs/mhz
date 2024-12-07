<template>
  <component
    :is="props.tag"
    :class="$style.flex"
    :data-column="props.column"
    :data-align="props.align"
    :data-justify="props.justify"
    :data-wrap="props.wrap"
    :data-gap="props.gap"
    :data-shrink="props.shrink"
    :data-grow="props.grow"
    data-test="ui-flex"
  >
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { DEFAULT_TAG, DEFAULT_ALIGN, DEFAULT_GAP, DEFAULT_JUSTIFY } from './constants';

interface IProps {
  tag?: 'div' | 'span' | 'form';
  column?: boolean;
  align?: 'normal' | 'stretch' | 'center' | 'flex-start' | 'flex-end';
  justify?:
    | 'normal'
    | 'stretch'
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  wrap?: boolean;
  gap?: string;
  shrink?: boolean;
  grow?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  tag: DEFAULT_TAG,
  align: DEFAULT_ALIGN,
  justify: DEFAULT_JUSTIFY,
  gap: DEFAULT_GAP,
});

const flexDirectionComputed = computed(() => (props.column ? 'column' : 'row'));

const alignItemsComputed = computed(() => props.align);

const justifyContentComputed = computed(() => props.justify);

const wrapComputed = computed(() => (props.wrap ? 'wrap' : 'nowrap'));

const gapComputed = computed(() => (props.gap ? `${props.gap}px` : '0'));

const shrinkComputed = computed(() => (props.shrink ? '1' : '0'));

const growComputed = computed(() => (props.grow ? '1' : '0'));
</script>

<style module lang="scss">
.flex {
  display: flex;
  flex-grow: v-bind(growComputed);
  flex-shrink: v-bind(shrinkComputed);
  flex-direction: v-bind(flexDirectionComputed);
  flex-wrap: v-bind(wrapComputed);
  gap: v-bind(gapComputed);
  align-items: v-bind(alignItemsComputed);
  justify-content: v-bind(justifyContentComputed);
  width: auto;
}
</style>
