import { Ref, ComputedRef } from 'vue';
import { useQuery, useMutation } from '@tanstack/vue-query';

import { IProduct } from 'mhz-types';

import { API_PRODUCT } from '@/product/constants';
import { api } from '@/common/services/api';

export function getProducts(page: Ref<number>) {
  async function fn(): Promise<{ data: IProduct[]; total: number }> {
    const { data } = await api.get(API_PRODUCT, { params: { page: page.value || 1 } });

    return data;
  }

  return useQuery({
    queryKey: [API_PRODUCT, page],
    queryFn: fn,
  });
}

export function getProduct(id: ComputedRef<string>) {
  async function fn(): Promise<IProduct> {
    const { data } = await api.get(`${API_PRODUCT}/${id.value}`);

    return data;
  }

  return useQuery({
    queryKey: [API_PRODUCT, id],
    queryFn: fn,
  });
}

export function postProduct(options: object) {
  async function fn(formData: IProduct) {
    await api.post(API_PRODUCT, formData);
  }

  return useMutation({
    mutationKey: [API_PRODUCT],
    mutationFn: fn,
    ...options,
  });
}

export function updateProduct(id: ComputedRef<string | undefined>, options: object) {
  async function fn(formData: IProduct) {
    await api.patch(`${API_PRODUCT}/${id.value}`, formData);
  }

  return useMutation({
    mutationKey: [API_PRODUCT, id],
    mutationFn: fn,
    ...options,
  });
}

export function deleteProduct(options: object) {
  async function fn(id?: string) {
    await api.delete(`${API_PRODUCT}/${id}`);
  }

  return useMutation({
    mutationKey: [API_PRODUCT],
    mutationFn: fn,
    ...options,
  });
}
