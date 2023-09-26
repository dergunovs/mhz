import { Ref } from 'vue';

import { api, useQuery } from 'mhz-helpers';
import { API_SEARCH, ISearchResults } from 'mhz-contracts';

export function search(query: Ref<string>) {
  async function fn() {
    const { data } = await api.get<ISearchResults>(API_SEARCH, { params: { search: query.value } });

    return data as unknown as { [key: string]: { _id: string }[] };
  }

  return useQuery({ queryKey: [API_SEARCH, query], queryFn: fn, enabled: false });
}
