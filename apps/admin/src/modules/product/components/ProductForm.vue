<template>
  <form @submit.prevent="props.product?._id ? update() : submit()" :class="$style.form">
    <UiField label="Title" isRequired :error="error('title')">
      <UiInput v-model="formData.title" isFocus />
    </UiField>

    <UiField label="Description" isRequired :error="error('description')">
      <UiEditor v-model="formData.description" />
    </UiField>

    <UiField label="Manufacturer" isRequired :error="error('manufacturer')">
      <UiSelect
        v-model="formData.manufacturer"
        :options="allManufacturers"
        @reachedBottom="
          scrollManufacturers(isLoadingManufacturers, setManufacturerPage(manufacturersPage + 1, manufacturersPage))
        "
      />
    </UiField>

    <UiField label="Category" isRequired :error="error('category')">
      <UiSelect
        v-model="formData.category"
        :options="allCategories"
        @reachedBottom="scrollCategories(isLoadingCategories, setCategoryPage(categoriesPage + 1, categoriesPage))"
      />
    </UiField>

    <ProductFieldsForm
      v-if="currentFields?.length"
      :fields="currentFields"
      :updates="categoryUpdates"
      @update="updateFields"
    />

    <UiUpload
      label="Upload images"
      :files="images"
      isRequired
      :error="error('imageUrls')"
      :extensions="['jpg', 'png']"
      @add="addImage"
      @remove="removeImage"
      @upload="mutateUploadFiles(images)"
    />

    <ImagePreview
      v-if="formData.imageUrls.length"
      :urls="formData.imageUrls"
      @update="updateImages"
      @delete="deleteImage"
    />

    <UiField label="Price" isRequired :error="error('price')">
      <UiInput v-model="formData.price" type="number" />
    </UiField>

    <UiCheckbox label="In stock" v-model="formData.isInStock" isRequired :error="error('isInStock')" />

    <FormButtons :id="props.product?._id" :isLoading="isLoadingPost || isLoadingUpdate" @delete="handleDelete" />
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, toRaw } from 'vue';
import { useRouter } from 'vue-router';

import { useQueryClient } from '@tanstack/vue-query';

import { UiField, UiInput, UiCheckbox, toast, UiEditor, UiSelect, UiUpload } from 'mhz-ui';
import { ICategory, IProduct, IManufacturer, ICategoryField } from 'mhz-types';
import { useValidator, required } from 'mhz-validate';
import { clone, usePagination, useInfiniteScroll } from 'mhz-helpers';

import ProductFieldsForm from '@/product/components/ProductFieldsForm.vue';
import ImagePreview from '@/common/components/ImagePreview.vue';
import FormButtons from '@/common/components/FormButtons.vue';

import { API_PRODUCT, URL_PRODUCT } from '@/product/constants';
import { postProduct, updateProduct, deleteProduct } from '@/product/services';
import { getCategories } from '@/category/services';
import { getManufacturers } from '@/manufacturer/services';
import { uploadFiles } from '@/common/services';

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

const categoryUpdates = ref(0);

const currentFields = computed(() => {
  return props.product?._id && !categoryUpdates.value
    ? toRaw(formData.value.fields)
    : toRaw(formData.value.category.fields);
});

const images = ref<File[]>([]);

function addImage(file: File) {
  images.value = [...images.value, file];
}

function removeImage(fileToRemove: File) {
  images.value = images.value.filter((file) => file.name !== fileToRemove.name);
}

function deleteImage(imageToDelete: string) {
  formData.value.imageUrls = formData.value.imageUrls.filter((image) => image !== imageToDelete);
}

function updateImages(urls: string[]) {
  formData.value.imageUrls = [...urls];
}

const { mutate: mutateUploadFiles } = uploadFiles(
  {
    onSuccess: (data: string[]) => {
      formData.value.imageUrls = [...data];
      images.value = [];
      toast.success('Images added');
    },
  },
  '1200'
);

const {
  page: categoriesPage,
  allData: allCategories,
  addData: addCategories,
  handleScroll: scrollCategories,
} = useInfiniteScroll<ICategory>();

const { data: categoriesData, isLoading: isLoadingCategories } = getCategories(categoriesPage);
const { data: categories, setPage: setCategoryPage } = usePagination(categoriesData);

watch(
  () => categories.value,
  () => {
    if (categories.value && !isLoadingCategories.value) addCategories(categories.value);
  }
);

const {
  page: manufacturersPage,
  allData: allManufacturers,
  addData: addManufacturers,
  handleScroll: scrollManufacturers,
} = useInfiniteScroll<IManufacturer>();

const { data: manufacturersData, isLoading: isLoadingManufacturers } = getManufacturers(manufacturersPage);
const { data: manufacturers, setPage: setManufacturerPage } = usePagination(manufacturersData);

watch(
  () => manufacturers.value,
  () => {
    if (manufacturers.value && !isLoadingManufacturers.value) addManufacturers(manufacturers.value);
  }
);

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

function updateFields(fields: ICategoryField[]) {
  formData.value.fields = [...fields];
}

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

function handleDelete(id: string) {
  mutateDelete(id);
}

onMounted(() => {
  if (props.product) formData.value = clone(props.product);

  if (categories.value) addCategories(categories.value);
  if (manufacturers.value) addManufacturers(manufacturers.value);

  watch(
    () => formData.value.category,
    () => {
      if (props.product?._id) formData.value.fields = [];
      categoryUpdates.value++;
    }
  );
});
</script>

<style module lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
}
</style>
