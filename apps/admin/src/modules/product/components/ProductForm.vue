<template>
  <form @submit.prevent="props.product?._id ? update() : submit()" :class="$style.form">
    <div :class="$style.row">
      <UiField label="Title" isRequired :error="error('title')">
        <UiInput v-model="formData.title" isFocus />
      </UiField>

      <UiField label="Price" isRequired :error="error('price')">
        <UiInput v-model="formData.price" type="number" />
      </UiField>
    </div>

    <div :class="$style.row">
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
        <UiSelect v-model="formData.category" :options="categories" />
      </UiField>
    </div>

    <UiCheckbox label="In stock" v-model="formData.isInStock" isRequired :error="error('isInStock')" />

    <UiField label="Description" isRequired :error="error('description')">
      <UiEditor v-model="formData.description" />
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
      isThumb
      @update="updateImages"
      @delete="deleteImage"
    />

    <FormButtons :id="props.product?._id" :isLoading="isLoadingPost || isLoadingUpdate" @delete="handleDelete" />
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, toRaw } from 'vue';
import { useRouter } from 'vue-router';

import { UiField, UiInput, UiCheckbox, toast, UiEditor, UiSelect, UiUpload } from 'mhz-ui';
import { ICategory, IProduct, IManufacturer, ICategoryField } from 'mhz-types';
import { clone, usePagination, useInfiniteScroll, useValidator, required, useQueryClient } from 'mhz-helpers';
import { API_PRODUCT } from 'mhz-contracts';

import ProductFieldsForm from '@/product/components/ProductFieldsForm.vue';
import ImagePreview from '@/common/components/ImagePreview.vue';
import FormButtons from '@/common/components/FormButtons.vue';

import { URL_PRODUCT } from '@/product/constants';
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
  thumbUrls: [],
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

function deleteImage(imageToDelete: string, isThumb: boolean) {
  formData.value.imageUrls = formData.value.imageUrls.filter((image) => image !== imageToDelete);

  if (isThumb) {
    const thumbToDelete = `thumb-${imageToDelete}.webp`;

    formData.value.thumbUrls = formData.value.thumbUrls.filter((image) => image !== thumbToDelete);
  }
}

function updateImages(urls: string[]) {
  const thumbs = urls.map((url) => `thumb-${url}.webp`);

  formData.value.imageUrls = [...urls];
  formData.value.thumbUrls = [...thumbs];
}

const { mutate: mutateUploadFiles } = uploadFiles(
  {
    onSuccess: (data: string[]) => {
      const thumbs = data.map((url) => `thumb-${url}.webp`);

      formData.value.imageUrls = [...formData.value.imageUrls, ...data];
      formData.value.thumbUrls = [...formData.value.thumbUrls, ...thumbs];
      images.value = [];
      toast.success('Images added');
    },
  },
  '1200',
  true
);

const { data: categories } = getCategories();

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
    await queryClient.refetchQueries({ queryKey: [API_PRODUCT] });
    toast.success('Product added');
    router.push(URL_PRODUCT);
  },
});

const { mutate: mutateUpdate, isLoading: isLoadingUpdate } = updateProduct(productId, {
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_PRODUCT] });
    toast.success('Product updated');
  },
});

const { mutate: mutateDelete } = deleteProduct({
  onSuccess: async () => {
    queryClient.removeQueries({ queryKey: [API_PRODUCT] });
    await queryClient.refetchQueries({ queryKey: [API_PRODUCT] });
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

.row {
  display: flex;
  gap: 24px;
  width: 100%;
}
</style>
