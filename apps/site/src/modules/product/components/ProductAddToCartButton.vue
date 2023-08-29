<template>
  <UiButton @click="mutate(props.id)">Add to cart</UiButton>
</template>

<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query';

import { UiButton, toast } from 'mhz-ui';

import { addToCart } from '@/customer/services';
import { API_CUSTOMER_CART } from '@/customer/constants';

interface IProps {
  id: string;
}

const props = defineProps<IProps>();

const queryClient = useQueryClient();

const { mutate } = addToCart({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_CUSTOMER_CART] });
    toast.success('Added to cart');
  },
});
</script>
