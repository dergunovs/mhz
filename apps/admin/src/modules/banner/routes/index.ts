import { URL_BANNER, URL_BANNER_CREATE, URL_BANNER_EDIT } from '@/banner/constants';

export const bannerRoutes = [
  {
    path: URL_BANNER,
    name: 'BannerList',
    component: () => import('@/banner/pages/BannerListPage.vue'),
  },
  {
    path: URL_BANNER_CREATE,
    name: 'BannerCreate',
    component: () => import('@/banner/pages/BannerCreatePage.vue'),
  },
  {
    path: `${URL_BANNER_EDIT}/:banner`,
    name: 'BannerEdit',
    component: () => import('@/banner/pages/BannerEditPage.vue'),
  },
];
