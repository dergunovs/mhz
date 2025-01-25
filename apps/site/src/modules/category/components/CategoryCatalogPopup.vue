<template>
  <div @mousedown="emit('update:modelValue', false)" :class="$style.container">
    <div @mousedown.stop :class="$style.popup">
      <CategoryCatalogList
        @click="emit('update:modelValue', false)"
        v-if="categories?.length"
        :categories="categories"
        isHeader
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CategoryCatalogList from '@/category/components/CategoryCatalogList.vue';

import { getCategories } from '@/category/services';

const emit = defineEmits<{ 'update:modelValue': [isShowPopup: boolean] }>();

const { data: categories } = getCategories();
</script>

<style module lang="scss">
.container {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100dvh;
  background-color: var(--color-white-transparent);
}

.popup {
  position: absolute;
  top: 76px;
  left: 244px;
  padding: 16px 0;
  background-color: var(--color-white);
  border: 1px solid var(--color-gray);
  border-radius: 16px;
}

@media (max-width: $notebook) {
  .popup {
    left: 212px;
  }
}

@media (max-width: $tablet) {
  .popup {
    left: 188px;
    padding: 8px 0;
  }
}

@media (max-width: $mobile) {
  .popup {
    top: 64px;
    right: 16px;
    left: auto;
  }
}
</style>
