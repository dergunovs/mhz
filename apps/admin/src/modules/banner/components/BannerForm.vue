<template>
  <form @submit.prevent="props.banner?._id ? update() : submit()" :class="$style.form">
    <UiField label="Text" isRequired :error="error('text')">
      <UiInput v-model="formData.text" isFocus />
    </UiField>

    <UiField label="Color" isRequired :error="error('color')">
      <UiInput v-model="formData.color" />
    </UiField>

    <UiField label="Product" isRequired :error="error('product')">
      <UiSelect
        v-model="formData.product"
        :options="allProducts"
        @reachedBottom="scrollProducts(isLoadingProducts, setProductsPage(productsPage + 1, productsPage))"
      />
    </UiField>

    <UiCheckbox label="Is active" v-model="formData.isActive" isRequired :error="error('isActive')" />

    <UiUpload
      label="Upload image"
      :file="imageFile"
      isSingle
      isRequired
      :isDisabled="!!formData.imageUrl"
      :extensions="['png']"
      :error="error('imageUrl')"
      @add="addImageFile"
      @remove="removeImageFile"
      @upload="mutateUploadFile(imageFile)"
    />

    <ImagePreview v-if="formData.imageUrl" :urls="[formData.imageUrl]" @delete="formData.imageUrl = ''" />

    <FormButtons :id="props.banner?._id" :isLoading="isLoadingPost || isLoadingUpdate" @delete="handleDelete" />
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

import { UiField, UiInput, UiUpload, UiSelect, UiCheckbox, toast } from 'mhz-ui';
import { clone, useValidator, required, useQueryClient, useInfiniteScroll, usePagination } from 'mhz-helpers';
import { API_BANNER, IBanner, IProduct } from 'mhz-contracts';

import ImagePreview from '@/common/components/ImagePreview.vue';
import FormButtons from '@/common/components/FormButtons.vue';

import { URL_BANNER } from '@/banner/constants';
import { postBanner, updateBanner, deleteBanner } from '@/banner/services';
import { uploadFile } from '@/common/services';
import { getProducts } from '@/product/services';

interface IProps {
  banner?: IBanner;
}

const props = defineProps<IProps>();

const queryClient = useQueryClient();

const router = useRouter();

const formData = ref<IBanner>({
  text: '',
  isActive: true,
  imageUrl: '',
  color: '',
  product: {} as IProduct,
});

const { mutate: mutatePost, isPending: isLoadingPost } = postBanner({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_BANNER] });
    toast.success('Banner added');
    router.push(URL_BANNER);
  },
});

const { mutate: mutateUpdate, isPending: isLoadingUpdate } = updateBanner({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_BANNER] });
    toast.success('Banner updated');
  },
});

const { mutate: mutateDelete } = deleteBanner({
  onSuccess: async () => {
    queryClient.removeQueries({ queryKey: [API_BANNER] });
    await queryClient.refetchQueries({ queryKey: [API_BANNER] });
    toast.success('Banner deleted');
    router.push(URL_BANNER);
  },
});

const rules = computed(() => {
  return {
    text: required,
    isActive: required,
    imageUrl: required,
    color: required,
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

const imageFile = ref<File>();

function addImageFile(file: File) {
  imageFile.value = file;
}

function removeImageFile() {
  imageFile.value = undefined;
}

const { mutate: mutateUploadFile } = uploadFile({
  onSuccess: (data: string) => {
    formData.value.imageUrl = data;
    removeImageFile();
    toast.success('Icon added');
  },
});

const {
  page: productsPage,
  allData: allProducts,
  addData: addProducts,
  handleScroll: scrollProducts,
} = useInfiniteScroll<IProduct>();

const { data: productsData, isLoading: isLoadingProducts } = getProducts(productsPage);
const { data: products, setPage: setProductsPage } = usePagination(productsData);

watch(
  () => products.value,
  () => {
    if (products.value && !isLoadingProducts.value) addProducts(products.value);
  }
);

onMounted(() => {
  if (props.banner) formData.value = clone(props.banner);
  if (products.value) addProducts(products.value);
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
