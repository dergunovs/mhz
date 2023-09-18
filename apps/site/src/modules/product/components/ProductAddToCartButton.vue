<template>
  <UiButton :isDisabled="!isAuth" @click="mutateAdd(props.id)">Add to cart</UiButton>
</template>

<script setup lang="ts">
import { UiButton, toast } from 'mhz-ui';
import { isAuth, useQueryClient } from 'mhz-helpers';
import { API_CUSTOMER_CART } from 'mhz-contracts';

import { addToCart } from '@/customer/services';

interface IProps {
  id: string;
}

const props = defineProps<IProps>();

const queryClient = useQueryClient();

const { mutate: mutateAdd } = addToCart({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_CUSTOMER_CART] });
    toast.success('Added to cart');
  },
});
</script>
