import { useQuery } from 'mhz-helpers';
import { API_BANNER_ACTIVE } from 'mhz-contracts';

import { getBannersActiveApi } from '@/banner/services/api';

export function getBannersActive() {
  return useQuery({ queryKey: [API_BANNER_ACTIVE], queryFn: getBannersActiveApi });
}
