import { computed, Ref, ComputedRef } from 'vue';

import { ICartItem } from 'mhz-contracts';

export function useCart(cart?: ComputedRef<ICartItem[]> | Ref<ICartItem[]> | Ref<undefined>) {
  const count = computed(() => cart?.value?.reduce((acc, item) => acc + item.count, 0));

  const price = computed(() => cart?.value?.reduce((acc, item) => acc + item.count * item.product.price, 0));

  return { count, price };
}
