import { ComputedRef, Ref } from 'vue';

import { api, useQuery, useMutation, IPageQuery, convertParams } from 'mhz-helpers';
import { API_BANNER, IBanner, IBaseReply, IFilterData } from 'mhz-contracts';

export function getBanners(query: Ref<IPageQuery | number>) {
  async function fn() {
    const params = convertParams(query);

    const { data } = await api.get<{ data: IBanner[]; total: number; filters: IFilterData }>(API_BANNER, { params });

    return data;
  }

  return useQuery({ queryKey: [API_BANNER, query], queryFn: fn });
}

export function getBanner(id?: ComputedRef<string | string[]>) {
  async function fn() {
    if (!id?.value) return null;

    const { data } = await api.get<{ data: IBanner }>(`${API_BANNER}/${id.value}`);

    return data.data;
  }

  return useQuery({ queryKey: [API_BANNER, id], queryFn: fn });
}

export function postBanner(options: object) {
  async function fn(formData: IBanner) {
    const { data } = await api.post<IBaseReply>(API_BANNER, formData);

    return data;
  }

  return useMutation({ mutationKey: [API_BANNER], mutationFn: fn, ...options });
}

export function updateBanner(options: object) {
  async function fn(formData: IBanner) {
    const { data } = await api.patch<IBaseReply>(`${API_BANNER}/${formData._id}`, formData);

    return data;
  }

  return useMutation({ mutationKey: [API_BANNER], mutationFn: fn, ...options });
}

export function deleteBanner(options: object) {
  async function fn(id?: string) {
    if (!id) return null;

    const { data } = await api.delete<IBaseReply>(`${API_BANNER}/${id}`);

    return data;
  }

  return useMutation({ mutationKey: [API_BANNER], mutationFn: fn, ...options });
}
