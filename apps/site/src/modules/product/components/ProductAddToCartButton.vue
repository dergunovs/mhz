<template>
  <UiButton @click="mutateAdd(props.id)" :isAccent="!!cartCount" :isDisabled="!isAuth">
    {{ cartCount ? `Add more to cart (${cartCount})` : 'Add to cart' }}
  </UiButton>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { UiButton, toast } from 'mhz-ui';
import { isAuth, useQueryClient } from 'mhz-helpers';
import { API_CUSTOMER_CART } from 'mhz-contracts';

import { addToCart, getCustomerCart } from '@/customer/services';

interface IProps {
  id: string;
}

const props = defineProps<IProps>();

const queryClient = useQueryClient();

const { data: cart } = getCustomerCart(isAuth);

const cartCount = computed(() => cart.value?.find((item) => item.product._id === props.id)?.count);

const { mutate: mutateAdd } = addToCart({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_CUSTOMER_CART] });
    toast.success('Added to cart');
  },
});
</script>
