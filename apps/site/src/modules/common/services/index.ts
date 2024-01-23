import { Ref } from 'vue';

import { useQuery } from 'mhz-helpers';
import { API_SEARCH } from 'mhz-contracts';

import { searchApi } from '@/common/services/api';

export function search(query: Ref<string>) {
  return useQuery({ queryKey: [API_SEARCH, query], queryFn: () => searchApi(query), enabled: false });
}
