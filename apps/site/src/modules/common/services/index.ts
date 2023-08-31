import { Ref } from 'vue';

import { useQuery } from '@tanstack/vue-query';

import { ISearchResults } from '@/common/interface';
import { API_SEARCH } from '@/common/constants';
import { api } from '@/common/services/api';

export function search(query: Ref<string>, isAdmin?: boolean) {
  async function fn(): Promise<ISearchResults> {
    const { data } = await api.get(API_SEARCH, { params: { search: query.value, isAdmin } });

    return data;
  }

  return useQuery({ queryKey: [API_SEARCH, query], queryFn: fn, enabled: false });
}
