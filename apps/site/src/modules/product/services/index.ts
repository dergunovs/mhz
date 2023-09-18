import { Ref, ComputedRef } from 'vue';

import { API_PRODUCT, API_PRODUCT_PRICE_RANGE, API_PRODUCT_FILTERS } from 'mhz-contracts';
import { IFilterData, IProduct } from 'mhz-types';
import { api, useQuery, IPageQuery } from 'mhz-helpers';

export function getProducts(
  query: Ref<IPageQuery | number>,
  initiator?: 'category' | 'manufacturer',
  enabled?: Ref<boolean>
) {
  async function fn(): Promise<{ data: IProduct[]; total: number; filters: IFilterData }> {
    const params =
      typeof query.value === 'number'
        ? { page: query.value }
        : {
            initiator,
            page: query.value.page || 1,
            sort: query.value.sort.value,
            dir: query.value.sort.isAsc === false ? 'desc' : 'asc',
            ...query.value.filter,
          };

    const { data } = await api.get(API_PRODUCT, {
      params,
      paramsSerializer: { indexes: null },
    });

    return data;
  }

  return useQuery({ queryKey: [API_PRODUCT, query], queryFn: fn, enabled });
}

export function getProduct(id?: ComputedRef<string | string[]>) {
  async function fn(): Promise<IProduct | null> {
    if (!id?.value) return null;

    const { data } = await api.get(`${API_PRODUCT}/${id.value}`);

    return data;
  }

  return useQuery({ queryKey: [API_PRODUCT, id], queryFn: fn });
}

export function getProductPriceRange(
  initiator: 'category' | 'manufacturer',
  id?: ComputedRef<string | string[]> | Ref<string | undefined>,
  enabled?: Ref<boolean>
) {
  async function fn(): Promise<[number, number] | null> {
    if (!id?.value) return null;

    const { data } = await api.get(`${API_PRODUCT_PRICE_RANGE}`, { params: { initiator, _id: id.value } });

    return data;
  }

  return useQuery({ queryKey: [API_PRODUCT_PRICE_RANGE, id], queryFn: fn, enabled });
}

export function getProductFilters(
  initiator: 'category' | 'manufacturer',
  id?: ComputedRef<string | string[]> | Ref<string | undefined>,
  enabled?: Ref<boolean>
) {
  async function fn(): Promise<IFilterData | null> {
    if (!id?.value) return null;

    const { data } = await api.get(`${API_PRODUCT_FILTERS}`, { params: { initiator, _id: id.value } });

    return data;
  }

  return useQuery({ queryKey: [API_PRODUCT_FILTERS, id], queryFn: fn, enabled });
}
