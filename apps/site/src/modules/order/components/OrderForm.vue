<template>
  <div :class="$style.container">
    <div :class="$style.order">
      <div>
        <b>Status: </b><span :class="$style.status" :data-status="props.order.status">{{ props.order.status }}</span>
      </div>

      <div>
        <b>Products: </b>
        <div v-for="item in props.order.products" :key="item._id">
          {{ item.count }} x
          <RouterLink :to="`${URL_PRODUCT}/${item.product._id}`">{{ item.product.title }}</RouterLink>
        </div>
      </div>

      <div><b>Price: </b>{{ props.order.price }} {{ CURRENCY }}</div>

      <div><b>Created: </b>{{ formatDateTime(props.order.dateCreated) }}</div>
    </div>

    <div :class="$style.buttons">
      <UiButton
        v-if="props.order.status === 'new'"
        @click="router.push({ path: URL_PAYMENT, query: { order: props.order._id } })"
        >Pay</UiButton
      >

      <UiButton @click="router.go(-1)" layout="secondary">Back</UiButton>

      <UiButton
        @click="isShowConfirm = true"
        layout="secondary"
        :isDisabled="['cancelled', 'completed'].includes(props.order.status) || isLoading"
        >Cancel order</UiButton
      >
    </div>

    <UiModal v-model="isShowConfirm" isConfirm @confirm="mutateUpdate('cancelled')">Confirm cancel order?</UiModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { IOrder } from 'mhz-types';
import { formatDateTime, useQueryClient } from 'mhz-helpers';
import { UiButton, UiModal, toast } from 'mhz-ui';

import { updateOrder } from '@/order/services';
import { API_ORDER, URL_PAYMENT } from '@/order/contants';
import { URL_PRODUCT } from '@/product/constants';
import { CURRENCY } from '@/common/constants';

interface IProps {
  order: IOrder;
}

const props = defineProps<IProps>();

const router = useRouter();

const queryClient = useQueryClient();

const isShowConfirm = ref(false);

const { mutate: mutateUpdate, isLoading } = updateOrder(
  {
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: [API_ORDER] });
      toast.success('Order cancelled');
    },
  },
  props.order._id
);
</script>

<style module lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.order {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.status {
  &[data-status='completed'] {
    color: var(--color-success);
  }

  &[data-status='cancelled'] {
    color: var(--color-error);
  }
}

.buttons {
  display: flex;
  gap: 16px;
}
</style>
