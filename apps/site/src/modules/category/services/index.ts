import { Ref, ComputedRef } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import { IPageQuery } from 'mhz-helpers';
import { ICategory } from 'mhz-types';

import { api } from '@/common/services/api';
import { API_CATEGORY } from '@/category/constants';

export function getCategories(query: Ref<IPageQuery | number>) {
  async function fn(): Promise<{ data: ICategory[]; total: number }> {
    const params =
      typeof query.value === 'number'
        ? { page: query.value }
        : {
            page: query.value.page || 1,
            sort: query.value.sort.value,
            dir: query.value.sort.isAsc === false ? 'desc' : 'asc',
          };

    const { data } = await api.get(API_CATEGORY, { params });

    return data;
  }

  return useQuery({
    queryKey: [API_CATEGORY, query],
    queryFn: fn,
  });
}

export function getCategory(id: ComputedRef<string>) {
  async function fn(): Promise<ICategory> {
    const { data } = await api.get(`${API_CATEGORY}/${id.value}`);

    return data;
  }

  return useQuery({
    queryKey: [API_CATEGORY, id],
    queryFn: fn,
  });
}
