import { ComputedRef, Ref } from 'vue';

import { IPageQuery, api, convertParams } from 'mhz-helpers';
import { API_BANNER, IBanner, IBaseReply, IFilterData } from 'mhz-contracts';

export async function getBannersApi(query: Ref<IPageQuery | number>) {
  const params = convertParams(query);

  const { data } = await api.get<{ data: IBanner[]; total: number; filters: IFilterData }>(API_BANNER, { params });

  return data;
}

export async function getBannerApi(id?: ComputedRef<string | string[]>) {
  if (!id?.value) return null;

  const { data } = await api.get<{ data: IBanner }>(`${API_BANNER}/${id.value}`);

  return data.data;
}

export async function postBannerApi(formData: IBanner) {
  const { data } = await api.post<IBaseReply>(API_BANNER, formData);

  return data;
}

export async function updateBannerApi(formData: IBanner) {
  const { data } = await api.patch<IBaseReply>(`${API_BANNER}/${formData._id}`, formData);

  return data;
}

export async function deleteBannerApi(id?: string) {
  if (!id) return null;

  const { data } = await api.delete<IBaseReply>(`${API_BANNER}/${id}`);

  return data;
}
