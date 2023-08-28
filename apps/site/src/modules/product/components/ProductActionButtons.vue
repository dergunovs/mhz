<template>
  <div :class="$style.buttons">
    <button :class="$style.button" type="button" title="Compare product">
      <IconComparison />
    </button>

    <button
      @click="isInFavourites ? remove(props.product._id) : add(props.product._id)"
      :class="$style.button"
      :data-active="isInFavourites"
      type="button"
      :title="isInFavourites ? 'Remove from favourites' : 'Add to favourites'"
    >
      <IconFavourites />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useQueryClient } from '@tanstack/vue-query';

import { IProduct } from 'mhz-types';
import { toast } from 'mhz-ui';

import IconComparison from '@/product/icons/comparison.svg';
import IconFavourites from '@/product/icons/favourites.svg';
import { addToFavourites, removeFromFavourites, getCustomerFavouriteProducts } from '@/customer/services';
import { API_CUSTOMER_FAVOURITES } from '@/customer/constants';

interface IProps {
  product: IProduct;
}

const props = defineProps<IProps>();

const queryClient = useQueryClient();

const { data: favourites } = getCustomerFavouriteProducts();

const isInFavourites = computed(() => favourites.value?.some((fav) => fav._id === props.product._id));

const { mutate: add } = addToFavourites({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_CUSTOMER_FAVOURITES] });
    toast.success('Added to favourites');
  },
});

const { mutate: remove } = removeFromFavourites({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_CUSTOMER_FAVOURITES] });
    toast.success('Removed from favourites');
  },
});
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

  &[data-active='true'] {
    background-color: var(--color-primary-light);
  }
}
</style>
