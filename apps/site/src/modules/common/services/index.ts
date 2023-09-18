import { Ref } from 'vue';

import { api, useQuery } from 'mhz-helpers';
import { ISearchResults } from 'mhz-types';
import { API_SEARCH } from 'mhz-contracts';

export function search(query: Ref<string>, isAdmin?: boolean) {
  async function fn(): Promise<ISearchResults> {
    const { data } = await api.get(API_SEARCH, { params: { search: query.value, isAdmin } });

    return data;
  }

  return useQuery({ queryKey: [API_SEARCH, query], queryFn: fn, enabled: false });
}
