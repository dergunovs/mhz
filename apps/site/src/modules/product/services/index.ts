import { Ref, ComputedRef } from 'vue';

import { IProduct } from 'mhz-types';
import { api, useQuery, IPageQuery } from 'mhz-helpers';

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
            filter: JSON.stringify(query.value.filter),
          };

    const { data } = await api.get(API_PRODUCT, { params });

    return data;
  }

  return useQuery({ queryKey: [API_PRODUCT, query], queryFn: fn });
}

export function getProduct(id: ComputedRef<string>) {
  async function fn(): Promise<IProduct> {
    const { data } = await api.get(`${API_PRODUCT}/${id.value}`);

    return data;
  }

  return useQuery({ queryKey: [API_PRODUCT, id], queryFn: fn });
}
