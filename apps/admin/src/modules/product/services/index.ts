import { Ref, ComputedRef } from 'vue';

import { api, useQuery, useMutation, IPageQuery, convertParams } from 'mhz-helpers';
import { API_PRODUCT, IProduct, IFilterData, IBaseReply } from 'mhz-contracts';

export function getProducts(query: Ref<IPageQuery | number>) {
  async function fn() {
    const params = convertParams(query);

    const { data } = await api.get<{ data: IProduct[]; total: number; filters: IFilterData }>(API_PRODUCT, { params });

    return data;
  }

  return useQuery({ queryKey: [API_PRODUCT, query], queryFn: fn });
}

export function getProduct(id?: ComputedRef<string | string[]>) {
  async function fn() {
    if (!id?.value) return null;

    const { data } = await api.get<{ data: IProduct }>(`${API_PRODUCT}/${id.value}`);

    return data.data;
  }

  return useQuery({ queryKey: [API_PRODUCT, id], queryFn: fn, refetchOnMount: true });
}

export function postProduct(options: object) {
  async function fn(formData: IProduct) {
    const { data } = await api.post<IBaseReply>(API_PRODUCT, formData);

    return data;
  }

  return useMutation({ mutationKey: [API_PRODUCT], mutationFn: fn, ...options });
}

export function updateProduct(options: object) {
  async function fn(formData: IProduct) {
    const { data } = await api.patch<IBaseReply>(`${API_PRODUCT}/${formData._id}`, formData);

    return data;
  }

  return useMutation({ mutationKey: [API_PRODUCT], mutationFn: fn, ...options });
}

export function deleteProduct(options: object) {
  async function fn(id?: string) {
    if (!id) return null;

    const { data } = await api.delete<IBaseReply>(`${API_PRODUCT}/${id}`);

    return data;
  }

  return useMutation({ mutationKey: [API_PRODUCT], mutationFn: fn, ...options });
}
