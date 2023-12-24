<template>
  <div :class="$style.payment">
    <PageTitle>{{ title }}</PageTitle>

    <div id="bank"></div>

    <UiModal v-model="isShowConfirm" isConfirm @confirm="router.push(URL_CUSTOMER_ORDERS)">
      Confirm cancel payment?
    </UiModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHead } from '@unhead/vue';

import { createBankPayment } from 'mhz-bank';
import { UiModal, toast } from 'mhz-ui';
import { useQueryClient } from 'mhz-helpers';
import { API_ORDER } from 'mhz-contracts';

import PageTitle from '@/layout/components/PageTitle.vue';

import { URL_CUSTOMER_ORDERS } from '@/customer/constants';
import { updateOrder, getOrder } from '@/order/services';
import { CURRENCY } from '@/common/constants';

const route = useRoute();
const router = useRouter();

const queryClient = useQueryClient();

const isShowConfirm = ref(false);

const orderId = computed(() => route.query.order?.toString());

const { data: order } = getOrder(orderId);

watch(
  () => order.value,
  () => payOrder()
);

const { mutate: mutateUpdate } = updateOrder(
  {
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: [API_ORDER] });

      toast.success('Order was successfully paid');
      router.push(URL_CUSTOMER_ORDERS);
    },
  },
  orderId.value
);

function payOrder() {
  if (order.value?._id) {
    createBankPayment(
      'bank',
      `${order.value.customer.firstName} ${order.value.customer.lastName}`,
      order.value._id,
      `${order.value.price} ${CURRENCY}`
    );
  }
}

function handleBankAnswer(answer: string) {
  if (!['submit', 'cancel'].includes(answer)) return;

  if (answer === 'cancel') {
    isShowConfirm.value = true;
  } else {
    mutateUpdate('paid');
  }
}

const controller = new AbortController();

onMounted(() => {
  if (document.querySelector('#bank')) {
    window.addEventListener('message', (event) => handleBankAnswer(event.data), { signal: controller.signal });
  }

  payOrder();
});

onBeforeUnmount(() => {
  controller.abort();
});

const title = 'Payment';

useHead({
  title,
});
</script>

<style module lang="scss">
.payment {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
