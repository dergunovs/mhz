<template>
  <div :class="$style.container">
    <div :class="$style.order">
      <div>
        <b>Customer: </b>
        <RouterLink :to="`${URL_CUSTOMER}/${props.order.customer._id}`">
          {{ props.order.customer.firstName }} {{ props.order.customer.lastName }}
        </RouterLink>
      </div>

      <div>
        <b>Status: </b><span :class="$style.status" :data-status="props.order.status">{{ props.order.status }}</span>
      </div>

      <div>
        <b>Products: </b>
        <div v-for="item in props.order.products" :key="item._id">
          {{ item.count }} x
          <RouterLink :to="`${URL_PRODUCT_EDIT}/${item.product._id}`">{{ item.product.title }}</RouterLink>
        </div>
      </div>

      <div><b>Price: </b>{{ props.order.price }} {{ CURRENCY }}</div>

      <div><b>Created: </b>{{ formatDateTime(props.order.dateCreated) }}</div>

      <div><b>Updated: </b>{{ formatDateTime(props.order.dateCreated) }}</div>
    </div>

    <div :class="$style.buttons">
      <div :class="$style.buttonsInner">
        <UiButton @click="mutateUpdate('completed')" :isDisabled="props.order.status !== 'paid' || isLoading">
          Mark completed
        </UiButton>

        <UiButton @click="router.go(-1)" layout="secondary">Back</UiButton>
      </div>

      <div :class="$style.buttonsInner">
        <UiButton
          @click="isShowConfirmCancel = true"
          layout="secondary"
          :isDisabled="['cancelled', 'completed'].includes(props.order.status) || isLoading"
          >Cancel order</UiButton
        >

        <UiButton @click="isShowConfirmDelete = true" layout="secondary" :isDisabled="isLoading">Delete</UiButton>
      </div>
    </div>

    <UiModal v-model="isShowConfirmCancel" isConfirm @confirm="mutateUpdate('cancelled')">
      Confirm cancel order?
    </UiModal>

    <UiModal v-model="isShowConfirmDelete" isConfirm @confirm="mutateDelete">Confirm delete?</UiModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import { formatDateTime, useQueryClient } from 'mhz-helpers';
import { UiButton, UiModal, toast } from 'mhz-ui';
import { API_ORDER, IOrder } from 'mhz-contracts';

import { updateOrder, deleteOrder } from '@/order/services';
import { URL_ORDER } from '@/order/constants';
import { URL_PRODUCT_EDIT } from '@/product/constants';
import { CURRENCY } from '@/common/constants';
import { URL_CUSTOMER } from '@/customer/constants';

interface IProps {
  order: IOrder;
}

const props = defineProps<IProps>();

const router = useRouter();

const queryClient = useQueryClient();

const isShowConfirmCancel = ref(false);
const isShowConfirmDelete = ref(false);

const orderId = computed(() => props.order?._id);

const { mutate: mutateUpdate, isLoading } = updateOrder(orderId, {
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_ORDER] });
    toast.success('Order updated');
  },
});

const { mutate: mutateDelete } = deleteOrder(orderId, {
  onSuccess: async () => {
    queryClient.removeQueries({ queryKey: [API_ORDER] });
    await queryClient.refetchQueries({ queryKey: [API_ORDER] });
    toast.success('Order deleted');
    router.push(URL_ORDER);
  },
});
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
  justify-content: space-between;
}

.buttonsInner {
  display: flex;
  gap: 16px;
}
</style>
