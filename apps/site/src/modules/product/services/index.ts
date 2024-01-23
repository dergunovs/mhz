import { Ref, ComputedRef } from 'vue';

import { useQuery, IPageQuery } from 'mhz-helpers';
import {
  API_PRODUCT,
  API_PRODUCT_PRICE_RANGE,
  API_PRODUCT_FILTERS,
  TInitiator,
  API_PRODUCT_POPULAR,
} from 'mhz-contracts';

import {
  getProductApi,
  getProductFiltersApi,
  getProductPriceRangeApi,
  getProductsApi,
  getProductsPopularApi,
} from '@/product/services/api';

export function getProducts(query: Ref<IPageQuery | number>, initiator?: TInitiator, enabled?: Ref<boolean>) {
  return useQuery({
    queryKey: [API_PRODUCT, query],
    queryFn: () => getProductsApi(query, initiator),
    enabled,
  });
}

export function getProductPriceRange(
  initiator: TInitiator,
  id?: ComputedRef<string | string[]> | Ref<string | undefined>,
  enabled?: Ref<boolean>
) {
  return useQuery({
    queryKey: [API_PRODUCT_PRICE_RANGE, id],
    queryFn: () => getProductPriceRangeApi(initiator, id),
    enabled,
  });
}

export function getProductFilters(
  initiator: TInitiator,
  id?: ComputedRef<string | string[]> | Ref<string | undefined>,
  enabled?: Ref<boolean>
) {
  return useQuery({
    queryKey: [API_PRODUCT_FILTERS, id],
    queryFn: () => getProductFiltersApi(initiator, id),
    enabled,
  });
}

export function getProductsPopular() {
  return useQuery({ queryKey: [API_PRODUCT_POPULAR], queryFn: getProductsPopularApi });
}

export function getProduct(id?: ComputedRef<string | string[]>) {
  return useQuery({ queryKey: [API_PRODUCT, id], queryFn: () => getProductApi(id) });
}
