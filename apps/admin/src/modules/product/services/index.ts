import { Ref, ComputedRef } from 'vue';

import { useQuery, useMutation, IPageQuery } from 'mhz-helpers';
import { API_PRODUCT } from 'mhz-contracts';

import {
  getProductsApi,
  getProductApi,
  postProductApi,
  updateProductApi,
  deleteProductApi,
} from '@/product/services/api';

export function getProducts(query: Ref<IPageQuery | number>) {
  return useQuery({ queryKey: [API_PRODUCT, query], queryFn: () => getProductsApi(query) });
}

export function getProduct(id?: ComputedRef<string | string[]>) {
  return useQuery({ queryKey: [API_PRODUCT, id], queryFn: () => getProductApi(id) });
}

export function postProduct(options: object) {
  return useMutation({ mutationKey: [API_PRODUCT], mutationFn: postProductApi, ...options });
}

export function updateProduct(options: object) {
  return useMutation({ mutationKey: [API_PRODUCT], mutationFn: updateProductApi, ...options });
}

export function deleteProduct(options: object) {
  return useMutation({ mutationKey: [API_PRODUCT], mutationFn: deleteProductApi, ...options });
}
