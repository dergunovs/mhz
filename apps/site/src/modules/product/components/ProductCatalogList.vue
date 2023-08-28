<template>
  <div ref="container" :class="$style.list" :data-scroll="props.isScroll">
    <ProductCatalogCard v-for="product in props.products" :key="product._id" :product="product" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { IProduct } from 'mhz-types';

import ProductCatalogCard from '@/product/components/ProductCatalogCard.vue';

interface IProps {
  products: IProduct[];
  isScroll?: boolean;
}

const props = defineProps<IProps>();

const route = useRoute();

const container = ref<HTMLElement>();

function scroll(e: WheelEvent) {
  e.preventDefault();
  if (container.value) container.value.scrollLeft += e.deltaY / 2;
}

watch(
  () => route.path,
  () => {
    if (container.value) container.value.scrollLeft = 0;
  }
);

onMounted(() => {
  if (props.isScroll) container.value?.addEventListener('wheel', (e) => scroll(e));
});

onBeforeUnmount(() => {
  if (props.isScroll) container.value?.removeEventListener('wheel', (e) => scroll(e));
});
</script>

<style module lang="scss">
.list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 64px 32px;

  &[data-scroll='true'] {
    display: flex;
    gap: 64px;
    padding-bottom: 16px;
    overflow-x: auto;
  }
}
</style>
