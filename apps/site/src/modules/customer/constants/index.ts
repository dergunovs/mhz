export const URL_CUSTOMER = '/customer';
export const URL_CUSTOMER_FAVOURITES = `${URL_CUSTOMER}/favourites`;
export const URL_CUSTOMER_WATHED_PRODUCTS = `${URL_CUSTOMER}/watched`;
export const URL_CUSTOMER_ORDERS = `${URL_CUSTOMER}/orders`;
export const URL_CUSTOMER_PROFILE = `${URL_CUSTOMER}/profile`;
export const URL_CUSTOMER_CONFIGURATIONS = `${URL_CUSTOMER}/configurations`;

export const API_CUSTOMER = 'customer';
export const API_CUSTOMER_CURRENT = `${API_CUSTOMER}/current`;
export const API_CUSTOMER_FAVOURITES = `${API_CUSTOMER}/favourites`;
export const API_CUSTOMER_WATCHED = `${API_CUSTOMER}/watched`;
export const API_CUSTOMER_ORDERS = `${API_CUSTOMER}/orders`;
export const API_CUSTOMER_CART = `${API_CUSTOMER}/cart`;

export const CUSTOMER_NAV = [
  { _id: '1', url: URL_CUSTOMER_ORDERS, title: 'Orders' },
  { _id: '2', url: URL_CUSTOMER_PROFILE, title: 'Profile' },
  { _id: '3', url: URL_CUSTOMER_FAVOURITES, title: 'Favourites' },
  { _id: '4', url: URL_CUSTOMER_WATHED_PRODUCTS, title: 'Watched products' },
  { _id: '5', url: URL_CUSTOMER_CONFIGURATIONS, title: 'PC configurations' },
];
