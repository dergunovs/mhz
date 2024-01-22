import { ComputedRef, Ref } from 'vue';

import { useQuery, useMutation, IPageQuery } from 'mhz-helpers';
import { API_BANNER } from 'mhz-contracts';

import { deleteBannerApi, getBannerApi, getBannersApi, postBannerApi, updateBannerApi } from '@/banner/services/api';

export function getBanners(query: Ref<IPageQuery | number>) {
  return useQuery({ queryKey: [API_BANNER, query], queryFn: () => getBannersApi(query) });
}

export function getBanner(id?: ComputedRef<string | string[]>) {
  return useQuery({ queryKey: [API_BANNER, id], queryFn: () => getBannerApi(id) });
}

export function postBanner(options: object) {
  return useMutation({ mutationKey: [API_BANNER], mutationFn: postBannerApi, ...options });
}

export function updateBanner(options: object) {
  return useMutation({ mutationKey: [API_BANNER], mutationFn: updateBannerApi, ...options });
}

export function deleteBanner(options: object) {
  return useMutation({ mutationKey: [API_BANNER], mutationFn: deleteBannerApi, ...options });
}
