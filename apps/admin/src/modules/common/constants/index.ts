import { URL_PRODUCT_EDIT } from '@/product/constants';
import { URL_CATEGORY_EDIT } from '@/category/constants';
import { URL_MANUFACTURER_EDIT } from '@/manufacturer/constants';
import { URL_MANAGER_EDIT } from '@/manager/constants';
import { URL_CUSTOMER } from '@/customer/constants';

export const URL_MAIN = '/main';
export const URL_ERROR = '/404';

export const API_COUNT = 'stats/count';
export const API_SEARCH = 'search';
export const API_UPLOAD = 'upload';
export const API_UPLOAD_SINGLE = `${API_UPLOAD}/single`;

export const PATH_UPLOAD = import.meta.env.VITE_PATH_UPLOAD;

export const SEARCH_SCHEME = [
  { type: 'products', labels: ['title'], url: URL_PRODUCT_EDIT },
  { type: 'categories', labels: ['title'], url: URL_CATEGORY_EDIT },
  { type: 'manufacturers', labels: ['title'], url: URL_MANUFACTURER_EDIT },
  { type: 'managers', labels: ['firstName', 'lastName'], url: URL_MANAGER_EDIT },
  { type: 'customers', labels: ['firstName', 'lastName'], url: URL_CUSTOMER },
];
