import { api } from 'mhz-helpers';
import { API_BANNER_ACTIVE, IBanner } from 'mhz-contracts';

export async function getBannersActiveApi() {
  const { data } = await api.get<IBanner[]>(API_BANNER_ACTIVE);

  return data;
}
