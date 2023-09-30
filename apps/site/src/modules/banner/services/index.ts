import { api, useQuery } from 'mhz-helpers';
import { API_BANNER_ACTIVE, IBanner } from 'mhz-contracts';

export function getBannersActive() {
  async function fn() {
    const { data } = await api.get<IBanner[]>(API_BANNER_ACTIVE);

    return data;
  }

  return useQuery({ queryKey: [API_BANNER_ACTIVE], queryFn: fn });
}
