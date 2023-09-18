import { URL_CART } from '@/cart/constants';
import {
  URL_CUSTOMER,
  URL_CUSTOMER_CONFIGURATIONS,
  URL_CUSTOMER_CONFIGURATION_CREATE,
  URL_CUSTOMER_FAVOURITES,
  URL_CUSTOMER_ORDERS,
  URL_CUSTOMER_PROFILE,
  URL_CUSTOMER_WATHED_PRODUCTS,
} from '@/customer/constants';
import { URL_CHECKOUT, URL_PAYMENT } from '@/order/contants';

export const API_CHECK_AUTH = 'auth/check';
export const API_LOGIN = 'auth/login';

export const URL_LOGIN = '/login';
export const URL_SIGN_UP = '/sign-up';

export const TOKEN_NAME = 'mhz_token_customer';

export const AUTH_URLS = [
  URL_CUSTOMER,
  URL_CUSTOMER_FAVOURITES,
  URL_CUSTOMER_ORDERS,
  URL_CUSTOMER_PROFILE,
  URL_CUSTOMER_WATHED_PRODUCTS,
  URL_CUSTOMER_CONFIGURATIONS,
  URL_CUSTOMER_CONFIGURATION_CREATE,
  URL_CART,
  URL_CHECKOUT,
  URL_PAYMENT,
];
