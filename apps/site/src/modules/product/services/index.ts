import { Ref, ComputedRef } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import { IProduct } from 'mhz-types';
import { IPageQuery } from 'mhz-helpers';

import { API_PRODUCT, API_PRODUCT_WATCHED } from '@/product/constants';
import { api } from '@/common/services/api';

export function getProducts(query: Ref<IPageQuery | number>) {
  async function fn(): Promise<{ data: IProduct[]; total: number }> {
    const params =
      typeof query.value === 'number'
        ? { page: query.value }
        : {
            page: query.value.page || 1,
            sort: query.value.sort.value,
            dir: query.value.sort.isAsc === false ? 'desc' : 'asc',
            filter: JSON.stringify(query.value.filter),
          };

    const { data } = await api.get(API_PRODUCT, { params });

    return data;
  }

  return useQuery({ queryKey: [API_PRODUCT, query], queryFn: fn });
}

export function getProductsWatched() {
  async function fn(): Promise<IProduct[]> {
    const { data } = await api.get(API_PRODUCT_WATCHED);

    return data;
  }

  return useQuery({ queryKey: [API_PRODUCT_WATCHED], queryFn: fn });
}

export function getProduct(id: ComputedRef<string>) {
  async function fn(): Promise<IProduct> {
    const { data } = await api.get(`${API_PRODUCT}/${id.value}`);

    return data;
  }

  return useQuery({ queryKey: [API_PRODUCT, id], queryFn: fn });
}
