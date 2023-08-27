import { ref, computed, Ref, ComputedRef } from 'vue';

import { useAsyncValidator } from '@vueuse/integrations/useAsyncValidator';
import { Rules } from 'async-validator';

export function useValidator<T>(formData: Ref<T>, rules: ComputedRef<object>) {
  const { errorFields, isFinished, pass } = useAsyncValidator(formData, rules as ComputedRef<Rules>, {
    validateOption: { suppressWarning: true },
  });

  const tries = ref(0);

  function isValid() {
    tries.value++;

    return pass.value && isFinished.value;
  }

  const errors = computed(() => (tries.value ? errorFields.value : undefined));

  function error(field: string) {
    return errors.value?.[field]?.[0]?.message;
  }

  return {
    error,
    errors,
    isValid,
  };
}
