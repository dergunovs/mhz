import { Ref, ComputedRef } from 'vue';

import { IProduct } from 'mhz-types';
import { api, useQuery, useMutation, IPageQuery } from 'mhz-helpers';

import { API_PRODUCT } from '@/product/constants';

export function getProducts(query: Ref<IPageQuery | number>) {
  async function fn(): Promise<{ data: IProduct[]; total: number }> {
    const params =
      typeof query.value === 'number'
        ? { page: query.value }
        : {
            page: query.value.page || 1,
            sort: query.value.sort.value,
            dir: query.value.sort.isAsc === false ? 'desc' : 'asc',
          };

    const { data } = await api.get(API_PRODUCT, { params });

    return data;
  }

  return useQuery({ queryKey: [API_PRODUCT, query], queryFn: fn });
}

export function getProduct(id?: ComputedRef<string | string[]>) {
  async function fn(): Promise<IProduct | null> {
    if (!id?.value) return null;

    const { data } = await api.get(`${API_PRODUCT}/${id.value}`);

    return data;
  }

  return useQuery({ queryKey: [API_PRODUCT, id], queryFn: fn });
}

export function postProduct(options: object) {
  async function fn(formData: IProduct) {
    await api.post(API_PRODUCT, formData);
  }

  return useMutation({ mutationKey: [API_PRODUCT], mutationFn: fn, ...options });
}

export function updateProduct(id: ComputedRef<string | undefined>, options: object) {
  async function fn(formData: IProduct) {
    await api.patch(`${API_PRODUCT}/${id.value}`, formData);
  }

  return useMutation({ mutationKey: [API_PRODUCT, id], mutationFn: fn, ...options });
}

export function deleteProduct(options: object) {
  async function fn(id?: string) {
    await api.delete(`${API_PRODUCT}/${id}`);
  }

  return useMutation({ mutationKey: [API_PRODUCT], mutationFn: fn, ...options });
}
