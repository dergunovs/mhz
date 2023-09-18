import { URL_PRODUCT_EDIT } from '@/product/constants';
import { URL_CATEGORY_EDIT } from '@/category/constants';
import { URL_MANUFACTURER_EDIT } from '@/manufacturer/constants';
import { URL_MANAGER_EDIT } from '@/manager/constants';
import { URL_CUSTOMER } from '@/customer/constants';
import { URL_ORDER } from '@/order/constants';

export const URL_MAIN = '/main';
export const URL_ERROR = '/404';

export const PATH_UPLOAD = import.meta.env.VITE_PATH_UPLOAD;
export const CURRENCY = import.meta.env.VITE_CURRENCY;

export const SEARCH_SCHEME = [
  { type: 'products', labels: ['title'], url: URL_PRODUCT_EDIT },
  { type: 'categories', labels: ['title'], url: URL_CATEGORY_EDIT },
  { type: 'manufacturers', labels: ['title'], url: URL_MANUFACTURER_EDIT },
  { type: 'managers', labels: ['firstName', 'lastName'], url: URL_MANAGER_EDIT },
  { type: 'customers', labels: ['firstName', 'lastName'], url: URL_CUSTOMER },
  { type: 'orders', labels: ['_id'], url: URL_ORDER },
];
