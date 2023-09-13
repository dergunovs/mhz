<template>
  <div ref="container" :class="$style.list" :data-scroll="props.isScroll">
    <ProductCatalogCard
      v-for="product in props.products"
      :key="product._id"
      :product="product"
      :isConfiguration="props.isConfiguration"
      @choice="(id) => emit('choice', id)"
    />
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
  isConfiguration?: boolean;
}

const props = defineProps<IProps>();
const emit = defineEmits(['choice']);

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

const controller = new AbortController();

onMounted(() => {
  if (props.isScroll) container.value?.addEventListener('wheel', (e) => scroll(e), { signal: controller.signal });
});

onBeforeUnmount(() => {
  if (props.isScroll) controller.abort();
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
