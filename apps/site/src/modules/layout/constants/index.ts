import { URL_PRODUCT } from '@/product/constants';
import { URL_CATEGORY } from '@/category/constants';
import { URL_MANUFACTURER } from '@/manufacturer/constants';

export const SEARCH_SCHEME = [
  { type: 'products', labels: ['title'], url: URL_PRODUCT },
  { type: 'categories', labels: ['title'], url: URL_CATEGORY },
  { type: 'manufacturers', labels: ['title'], url: URL_MANUFACTURER },
];
