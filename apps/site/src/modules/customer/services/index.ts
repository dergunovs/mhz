import { Ref } from 'vue';

import { useMutation, useQuery } from 'mhz-helpers';
import { API_CUSTOMER, API_CUSTOMER_CART, API_CUSTOMER_FAVOURITES, API_CUSTOMER_WATCHED } from 'mhz-contracts';

import {
  addToCartApi,
  addToFavouritesApi,
  deleteCustomerApi,
  getCurrentCustomerApi,
  getCustomerCartApi,
  getCustomerFavouriteProductsApi,
  getCustomerWatchedProductsApi,
  postCustomerApi,
  removeFromCartApi,
  removeFromFavouritesApi,
  updateCountCartApi,
  updateCustomerApi,
} from '@/customer/services/api';

export function getCurrentCustomer(options?: object) {
  return useQuery({ queryKey: [API_CUSTOMER], queryFn: getCurrentCustomerApi, ...options });
}

export function getCustomerWatchedProducts() {
  return useQuery({ queryKey: [API_CUSTOMER_WATCHED], queryFn: getCustomerWatchedProductsApi });
}

export function getCustomerFavouriteProducts(isEnabled: Ref<boolean>) {
  return useQuery({
    queryKey: [API_CUSTOMER_FAVOURITES],
    queryFn: getCustomerFavouriteProductsApi,
    enabled: isEnabled,
  });
}

export function postCustomer(options: object) {
  return useMutation({ mutationKey: [API_CUSTOMER], mutationFn: postCustomerApi, ...options });
}

export function updateCustomer(options: object) {
  return useMutation({ mutationKey: [API_CUSTOMER], mutationFn: updateCustomerApi, ...options });
}

export function deleteCustomer(options: object) {
  return useMutation({ mutationKey: [API_CUSTOMER], mutationFn: deleteCustomerApi, ...options });
}

export function addToFavourites(options: object) {
  return useMutation({ mutationKey: [API_CUSTOMER_FAVOURITES], mutationFn: addToFavouritesApi, ...options });
}

export function removeFromFavourites(options: object) {
  return useMutation({ mutationKey: [API_CUSTOMER_FAVOURITES], mutationFn: removeFromFavouritesApi, ...options });
}

export function getCustomerCart(isEnabled: Ref<boolean>) {
  return useQuery({ queryKey: [API_CUSTOMER_CART], queryFn: getCustomerCartApi, enabled: isEnabled });
}

export function addToCart(options: object) {
  return useMutation({ mutationKey: [API_CUSTOMER_CART], mutationFn: addToCartApi, ...options });
}

export function removeFromCart(options: object) {
  return useMutation({ mutationKey: [API_CUSTOMER_CART], mutationFn: removeFromCartApi, ...options });
}

export function updateCountCart(options: object) {
  return useMutation({ mutationKey: [API_CUSTOMER_CART], mutationFn: updateCountCartApi, ...options });
}
