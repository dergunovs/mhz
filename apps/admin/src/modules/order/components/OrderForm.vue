<template>
  <div :class="$style.container">
    <div :class="$style.order">
      <div>
        <b>Customer: </b>
        <RouterLink :to="`${URL_CUSTOMER}/${props.order.customer._id}`" data-test="order-form-customer">
          {{ props.order.customer.firstName }} {{ props.order.customer.lastName }}
        </RouterLink>
      </div>

      <div>
        <b>Status: </b>
        <span :class="$style.status" :data-status="props.order.status" data-test="order-form-status">
          {{ props.order.status }}
        </span>
      </div>

      <div>
        <b>Products: </b>
        <div v-for="item in props.order.products" :key="item._id" data-test="order-form-products">
          <span data-test="order-form-products-count">{{ item.count }}</span> x
          <RouterLink :to="`${URL_PRODUCT_EDIT}/${item.product._id}`" data-test="order-form-products-title">
            {{ item.product.title }}
          </RouterLink>
        </div>
      </div>

      <div>
        <b>Price: </b>
        <span data-test="order-form-price">{{ props.order.price }} {{ CURRENCY }}</span>
      </div>

      <div>
        <b>Created: </b>
        <span data-test="order-form-created">{{ formatDateTime(props.order.dateCreated) }}</span>
      </div>

      <div>
        <b>Updated: </b>
        <span data-test="order-form-updated">{{ formatDateTime(props.order.dateUpdated) }}</span>
      </div>
    </div>

    <div :class="$style.buttons">
      <div :class="$style.buttonsInner">
        <UiButton
          @click="mutateUpdate({ status: ORDER_COMPLETED, id: orderId })"
          :isDisabled="props.order.status !== 'paid' || isPending"
          data-test="order-form-complete"
        >
          Mark completed
        </UiButton>

        <UiButton @click="router.go(-1)" layout="secondary" data-test="order-form-back">Back</UiButton>
      </div>

      <div :class="$style.buttonsInner">
        <UiButton
          @click="isShowConfirmCancel = true"
          layout="secondary"
          :isDisabled="[ORDER_CANCELLED, ORDER_COMPLETED].includes(props.order.status) || isPending"
          data-test="order-form-cancel"
          >Cancel order</UiButton
        >

        <UiButton
          @click="isShowConfirmDelete = true"
          layout="secondary"
          :isDisabled="isPending"
          data-test="order-form-delete"
          >Delete</UiButton
        >
      </div>
    </div>

    <UiModal
      v-model="isShowConfirmCancel"
      isConfirm
      @confirm="mutateUpdate({ status: ORDER_CANCELLED, id: orderId })"
      lang="en"
      data-test="order-form-cancel-confirm"
    >
      Confirm cancel order?
    </UiModal>

    <UiModal
      v-model="isShowConfirmDelete"
      isConfirm
      @confirm="mutateDelete(orderId)"
      lang="en"
      data-test="order-form-delete-confirm"
      >Confirm delete?</UiModal
    >
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import { formatDateTime, useQueryClient } from 'mhz-helpers';
import { UiButton, UiModal, toast } from 'mhz-ui';
import { API_ORDER, IOrder } from 'mhz-contracts';

import { updateOrder, deleteOrder } from '@/order/services';
import { URL_ORDER, ORDER_CANCELLED, ORDER_COMPLETED } from '@/order/constants';
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

const { mutate: mutateUpdate, isPending } = updateOrder(orderId, {
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_ORDER] });
    toast.success('Order updated');
  },
});

const { mutate: mutateDelete } = deleteOrder({
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
  &[data-status='ORDER_COMPLETED'] {
    color: var(--color-success);
  }

  &[data-status='ORDER_CANCELLED'] {
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
