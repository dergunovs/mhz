<template>
  <button :class="$style.close" type="button" :data-small="props.isSmall">
    <div :class="$style.line"></div>
    <div :class="$style.line"></div>
  </button>
</template>

<script setup lang="ts">
interface IProps {
  isSmall?: boolean;
}

const props = defineProps<IProps>();
</script>

<style module lang="scss">
.close {
  position: relative;
  width: 36px;
  height: 36px;
  color: var(--color-white);
  cursor: pointer;
  background-color: var(--color-gray-dark);
  border: none;
  border-radius: 50%;

  &[data-small='true'] {
    width: 20px;
    height: 20px;

    .line {
      left: 5px;
      width: 10px;
      height: 1px;
      border-radius: 2px;
    }
  }

  .line {
    position: absolute;
    left: 9px;
    width: 18px;
    height: 2px;
    background-color: var(--color-white);
    border-radius: 4px;
    rotate: 45deg;

    &:last-child {
      rotate: 135deg;
    }
  }

  &:hover {
    background-color: var(--color-gray-dark-extra);
  }
}
</style>
