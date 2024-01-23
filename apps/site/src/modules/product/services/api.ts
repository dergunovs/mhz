import { Ref, ComputedRef } from 'vue';

import { api, IPageQuery, convertParams } from 'mhz-helpers';
import {
  API_PRODUCT,
  API_PRODUCT_PRICE_RANGE,
  API_PRODUCT_FILTERS,
  IFilterData,
  IProduct,
  TInitiator,
  API_PRODUCT_POPULAR,
} from 'mhz-contracts';

export async function getProductsApi(query: Ref<IPageQuery | number>, initiator?: TInitiator) {
  const params = convertParams(query, initiator);

  const { data } = await api.get<{ data: IProduct[]; total: number; filters: IFilterData }>(API_PRODUCT, {
    params,
    paramsSerializer: { indexes: null },
  });

  return data;
}

export async function getProductPriceRangeApi(
  initiator: TInitiator,
  id?: ComputedRef<string | string[]> | Ref<string | undefined>
) {
  if (!id?.value) return null;

  const { data } = await api.get<[number, number]>(`${API_PRODUCT_PRICE_RANGE}`, {
    params: { initiator, _id: id.value },
  });

  return data;
}

export async function getProductFiltersApi(
  initiator: TInitiator,
  id?: ComputedRef<string | string[]> | Ref<string | undefined>
) {
  if (!id?.value) return null;

  const { data } = await api.get<IFilterData>(`${API_PRODUCT_FILTERS}`, { params: { initiator, _id: id.value } });

  return data;
}

export async function getProductsPopularApi() {
  const { data } = await api.get<IProduct[]>(API_PRODUCT_POPULAR);

  return data;
}

export async function getProductApi(id?: ComputedRef<string | string[]>) {
  if (!id?.value) return null;

  const { data } = await api.get<{ data: IProduct }>(`${API_PRODUCT}/${id.value}`);

  return data.data;
}
