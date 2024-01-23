import { Ref } from 'vue';

import { api } from 'mhz-helpers';
import { API_SEARCH, ISearchResults } from 'mhz-contracts';

export async function searchApi(query: Ref<string>) {
  const { data } = await api.get<ISearchResults>(API_SEARCH, { params: { search: query.value } });

  return data as unknown as { [key: string]: { _id: string }[] };
}
