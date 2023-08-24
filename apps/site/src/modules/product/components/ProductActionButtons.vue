<template>
  <div :class="$style.buttons">
    <button :class="$style.button" type="button" title="Compare product">
      <IconComparison />
    </button>

    <button :class="$style.button" type="button" title="Add to favourites">
      <IconFavourites />
    </button>
  </div>
</template>

<script setup lang="ts">
import IconComparison from '@/product/icons/comparison.svg';
import IconFavourites from '@/product/icons/favourites.svg';
</script>

<style module lang="scss">
.buttons {
  display: flex;
  gap: 8px;
  align-items: center;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  background-color: var(--color-gray-light);
  border: none;
  border-radius: 8px;

  &:hover {
    background-color: var(--color-gray);
  }
}
</style>
