<template>
  <form @submit.prevent="props.product ? update() : submit()" :class="$style.form">
    <UiField label="Title" isRequired :error="error('title')">
      <UiInput v-model="formData.title" isFocus />
    </UiField>

    <UiField label="Description" isRequired :error="error('description')">
      <UiEditor v-model="formData.description" />
    </UiField>

    <UiField label="Category" isRequired :error="error('category')">
      <UiSelect v-model="formData.category" :options="allCategoriesData" @reachedBottom="handleInfiniteScroll" />
    </UiField>

    <UiField label="Price" isRequired :error="error('price')">
      <UiInput v-model="formData.price" type="number" />
    </UiField>

    <UiCheckbox label="In stock" v-model="formData.isInStock" isRequired :error="error('isInStock')" />

    <div :class="$style.buttons">
      <div :class="$style.buttonsInner">
        <UiButton type="submit" :isDisabled="isLoadingPost || isLoadingUpdate">
          {{ props.product ? 'Update' : 'Submit' }}
        </UiButton>

        <UiButton @click="router.go(-1)" layout="secondary" :isDisabled="isLoadingPost || isLoadingUpdate">
          Back
        </UiButton>
      </div>

      <UiButton
        v-if="props.product?._id"
        @click="mutateDelete(props.product._id)"
        layout="secondary"
        :isDisabled="isLoadingPost || isLoadingUpdate"
      >
        Delete
      </UiButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

import { useQueryClient } from '@tanstack/vue-query';

import { UiField, UiInput, UiButton, UiCheckbox, toast, UiEditor, UiSelect } from 'mhz-ui';
import { ICategory, IProduct, IManufacturer } from 'mhz-types';
import { useValidator, required } from 'mhz-validate';
import { clone, usePagination } from 'mhz-helpers';

import { API_PRODUCT, URL_PRODUCT } from '@/product/constants';
import { postProduct, updateProduct, deleteProduct } from '@/product/services';
import { getCategories } from '@/category/services';

interface IProps {
  product?: IProduct;
}

const props = defineProps<IProps>();

const queryClient = useQueryClient();

const router = useRouter();

const formData = ref<IProduct>({
  title: '',
  description: '',
  price: 0,
  isInStock: false,
  imageUrls: [],
  category: {} as ICategory,
  manufacturer: {} as IManufacturer,
  fields: [],
});

const categoriesPage = ref(1);
const allCategoriesData = ref<ICategory[]>([]);

const { data, isLoading } = getCategories(categoriesPage);

const { data: categories, setPage } = usePagination(data);

watch(
  () => categories.value,
  () => {
    if (categories.value) {
      allCategoriesData.value = [...allCategoriesData.value, ...categories.value];
    }
  }
);

function handleInfiniteScroll() {
  if (isLoading.value) return;
  categoriesPage.value = setPage(categoriesPage.value + 1, categoriesPage.value);
}

const productId = computed(() => props.product?._id);

const { mutate: mutatePost, isLoading: isLoadingPost } = postProduct({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_PRODUCT, 1], exact: true });
    toast.success('Product added');
    router.push(URL_PRODUCT);
  },
});

const { mutate: mutateUpdate, isLoading: isLoadingUpdate } = updateProduct(productId, {
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_PRODUCT, props.product?._id], exact: true });
    await queryClient.refetchQueries({ queryKey: [API_PRODUCT, 1], exact: true });
    toast.success('Product updated');
  },
});

const { mutate: mutateDelete } = deleteProduct({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_PRODUCT, 1], exact: true });
    toast.success('Product deleted');
    router.push(URL_PRODUCT);
  },
});

const rules = computed(() => {
  return {
    title: required,
    description: required,
    price: required,
    isInStock: required,
  };
});

const { error, isValid } = useValidator(formData, rules);

function submit() {
  if (isValid()) mutatePost(formData.value);
}

function update() {
  if (isValid()) mutateUpdate(formData.value);
}

onMounted(() => {
  if (props.product) formData.value = clone(props.product);
  if (categories.value) allCategoriesData.value = [...categories.value];
});
</script>

<style module lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 24px;
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