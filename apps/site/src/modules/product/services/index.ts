import { Ref, ComputedRef } from 'vue';

import { api, useQuery, IPageQuery, convertParams } from 'mhz-helpers';
import {
  API_PRODUCT,
  API_PRODUCT_PRICE_RANGE,
  API_PRODUCT_FILTERS,
  IFilterData,
  IProduct,
  TInitiator,
} from 'mhz-contracts';

export function getProducts(query: Ref<IPageQuery | number>, initiator?: TInitiator, enabled?: Ref<boolean>) {
  async function fn() {
    const params = convertParams(query, initiator);

    const { data } = await api.get<{ data: IProduct[]; total: number; filters: IFilterData }>(API_PRODUCT, {
      params,
      paramsSerializer: { indexes: null },
    });

    return data;
  }

  return useQuery({ queryKey: [API_PRODUCT, query], queryFn: fn, enabled });
}

export function getProduct(id?: ComputedRef<string | string[]>) {
  async function fn() {
    if (!id?.value) return null;

    const { data } = await api.get<IProduct>(`${API_PRODUCT}/${id.value}`);

    return data;
  }

  return useQuery({ queryKey: [API_PRODUCT, id], queryFn: fn });
}

export function getProductPriceRange(
  initiator: TInitiator,
  id?: ComputedRef<string | string[]> | Ref<string | undefined>,
  enabled?: Ref<boolean>
) {
  async function fn() {
    if (!id?.value) return null;

    const { data } = await api.get<[number, number]>(`${API_PRODUCT_PRICE_RANGE}`, {
      params: { initiator, _id: id.value },
    });

    return data;
  }

  return useQuery({ queryKey: [API_PRODUCT_PRICE_RANGE, id], queryFn: fn, enabled });
}

export function getProductFilters(
  initiator: TInitiator,
  id?: ComputedRef<string | string[]> | Ref<string | undefined>,
  enabled?: Ref<boolean>
) {
  async function fn() {
    if (!id?.value) return null;

    const { data } = await api.get<IFilterData>(`${API_PRODUCT_FILTERS}`, { params: { initiator, _id: id.value } });

    return data;
  }

  return useQuery({ queryKey: [API_PRODUCT_FILTERS, id], queryFn: fn, enabled });
}
