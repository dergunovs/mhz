import { Ref, ComputedRef } from 'vue';

import { api, IPageQuery, convertParams } from 'mhz-helpers';
import { API_PRODUCT, IProduct, IFilterData, IBaseReply } from 'mhz-contracts';

export async function getProductsApi(query: Ref<IPageQuery | number>) {
  const params = convertParams(query);

  const { data } = await api.get<{ data: IProduct[]; total: number; filters: IFilterData }>(API_PRODUCT, { params });

  return data;
}

export async function getProductApi(id?: ComputedRef<string | string[]>) {
  if (!id?.value) return null;

  const { data } = await api.get<{ data: IProduct }>(`${API_PRODUCT}/${id.value}`);

  return data.data;
}

export async function postProductApi(formData: IProduct) {
  const { data } = await api.post<IBaseReply>(API_PRODUCT, formData);

  return data;
}

export async function updateProductApi(formData: IProduct) {
  const { data } = await api.patch<IBaseReply>(`${API_PRODUCT}/${formData._id}`, formData);

  return data;
}

export async function deleteProductApi(id?: string) {
  if (!id) return null;

  const { data } = await api.delete<IBaseReply>(`${API_PRODUCT}/${id}`);

  return data;
}
