import { URL_PRODUCT } from '@/product/constants';
import { URL_CATEGORY } from '@/category/constants';
import { URL_MANUFACTURER } from '@/manufacturer/constants';

export const URL_MAIN = '/';
export const URL_ERROR = '/404';

export const PATH_UPLOAD = import.meta.env.VITE_PATH_UPLOAD;
export const CURRENCY = import.meta.env.VITE_CURRENCY;

export const SEARCH_SCHEME = [
  { type: 'products', labels: ['title'], url: URL_PRODUCT },
  { type: 'categories', labels: ['title'], url: URL_CATEGORY },
  { type: 'manufacturers', labels: ['title'], url: URL_MANUFACTURER },
];
