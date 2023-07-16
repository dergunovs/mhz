<template>
  <Form @submit="submit" layout="vertical">
    <FormItem label="E-mail" v-bind="validateInfos.email" required>
      <Input v-model:value="formData.email" />
    </FormItem>

    <FormItem label="Пароль" v-bind="validateInfos.password" required>
      <InputPassword v-model:value="formData.password" />
    </FormItem>

    <Button htmlType="submit" type="primary">Войти</Button>
  </Form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { Button, Form, FormItem, Input, InputPassword } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';

import { postLogin } from '@/auth/services';
import { useAuth } from '@/auth/composables';

const { login } = useAuth();

const formData = ref({
  email: '',
  password: '',
});

const rules = ref<{ [key: string]: Rule[] }>({
  email: [{ required: true, type: 'email' }],
  password: [{ required: true }],
});

const useForm = Form.useForm;

const { validate, validateInfos } = useForm(formData, rules);

const { mutate } = postLogin(formData, {
  onSuccess: (token?: string) => {
    if (token) login(token);
  },
});

async function submit() {
  try {
    await validate();
    mutate();
  } catch (error) {
    alert(`Исправьте ошибки валидации`);
  }
}
</script>
