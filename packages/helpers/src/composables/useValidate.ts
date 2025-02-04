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

export function required(lang?: 'ru' | 'en') {
  return {
    required: true,
    whitespace: true,
    message: lang === 'ru' ? 'Это поле обязательное' : 'This field is required',
  };
}

export function email(lang?: 'ru' | 'en') {
  return { type: 'email', message: lang === 'ru' ? 'Введите корретную почту' : 'This is not correct email' };
}

export function letters(lang?: 'ru' | 'en') {
  return {
    validator: (rule: object, value: string) =>
      /^[a-zA-zа-яА-ЯёЁ-]+([\s][a-zA-Zа-яА-ЯёЁ-]+)*$/.test(value) || !value.length,
    message: lang === 'ru' ? 'Допустимы только буквы' : 'Only letters',
    type: 'string',
  };
}

export function min(value: number, lang?: 'ru' | 'en') {
  return {
    min: value,
    message: lang === 'ru' ? `Минимальное количество символов: ${value}` : `Minimum symbols: ${value}`,
  };
}

export function max(value: number, lang?: 'ru' | 'en') {
  return {
    min: value,
    message: lang === 'ru' ? `Максимальное количество символов: ${value}` : `Maximum symbols: ${value}`,
  };
}
