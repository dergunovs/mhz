<template>
  <button
    @click="isInFavourites ? mutateRemove(props.product._id) : mutateAdd(props.product._id)"
    :class="$style.button"
    :data-active="isInFavourites"
    type="button"
    :title="isInFavourites ? 'Remove from favourites' : 'Add to favourites'"
  >
    <IconFavourites />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { toast } from 'mhz-ui';
import { useQueryClient } from 'mhz-helpers';
import { API_CUSTOMER_FAVOURITES, IProduct } from 'mhz-contracts';

import IconFavourites from '@/product/icons/favourites.svg';
import { addToFavourites, removeFromFavourites, getCustomerFavouriteProducts } from '@/customer/services';

interface IProps {
  product: IProduct;
}

const props = defineProps<IProps>();

const queryClient = useQueryClient();

const { data: favourites } = getCustomerFavouriteProducts();

const isInFavourites = computed(() => favourites.value?.some((fav) => fav._id === props.product._id));

const { mutate: mutateAdd } = addToFavourites({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_CUSTOMER_FAVOURITES] });
    toast.success('Added to favourites');
  },
});

const { mutate: mutateRemove } = removeFromFavourites({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_CUSTOMER_FAVOURITES] });
    toast.success('Removed from favourites');
  },
});
</script>

<style module lang="scss">
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
