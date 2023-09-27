import { Ref } from 'vue';

import { api, useMutation, useQuery } from 'mhz-helpers';
import {
  API_CUSTOMER,
  API_CUSTOMER_CART,
  API_CUSTOMER_CURRENT,
  API_CUSTOMER_FAVOURITES,
  API_CUSTOMER_WATCHED,
  ICustomer,
  IProduct,
  ICartItem,
  ISignUpData,
  IBaseReply,
} from 'mhz-contracts';

export function getCurrentCustomer(options?: object) {
  async function fn() {
    const { data } = await api.get<ICustomer>(API_CUSTOMER_CURRENT);

    return data;
  }

  return useQuery({ queryKey: [API_CUSTOMER], queryFn: fn, ...options });
}

export function getCustomerWatchedProducts() {
  async function fn() {
    const { data } = await api.get<IProduct[]>(API_CUSTOMER_WATCHED);

    return data;
  }

  return useQuery({ queryKey: [API_CUSTOMER_WATCHED], queryFn: fn });
}

export function getCustomerFavouriteProducts(isEnabled: Ref<boolean>) {
  async function fn() {
    const { data } = await api.get<IProduct[]>(API_CUSTOMER_FAVOURITES);

    return data;
  }

  return useQuery({ queryKey: [API_CUSTOMER_FAVOURITES], queryFn: fn, enabled: isEnabled });
}

export function postCustomer(options: object) {
  async function fn(formData: ISignUpData) {
    const { data } = await api.post<IBaseReply>(API_CUSTOMER, formData);

    return data;
  }

  return useMutation({ mutationKey: [API_CUSTOMER], mutationFn: fn, ...options });
}

export function updateCustomer(options: object) {
  async function fn(formData: Omit<ICustomer, 'password'>) {
    const { data } = await api.patch<IBaseReply>(API_CUSTOMER, formData);

    return data;
  }

  return useMutation({ mutationKey: [API_CUSTOMER], mutationFn: fn, ...options });
}

export function deleteCustomer(options: object) {
  async function fn() {
    const { data } = await api.delete<IBaseReply>(API_CUSTOMER);

    return data;
  }

  return useMutation({ mutationKey: [API_CUSTOMER], mutationFn: fn, ...options });
}

export function addToFavourites(options: object) {
  async function fn(_id?: string) {
    if (!_id) return null;

    const { data } = await api.post<IBaseReply>(API_CUSTOMER_FAVOURITES, { id: _id });

    return data;
  }

  return useMutation({ mutationKey: [API_CUSTOMER_FAVOURITES], mutationFn: fn, ...options });
}

export function removeFromFavourites(options: object) {
  async function fn(_id?: string) {
    if (!_id) return null;

    const { data } = await api.delete<IBaseReply>(`${API_CUSTOMER_FAVOURITES}/${_id}`);

    return data;
  }

  return useMutation({ mutationKey: [API_CUSTOMER_FAVOURITES], mutationFn: fn, ...options });
}

export function getCustomerCart(isEnabled: Ref<boolean>) {
  async function fn() {
    const { data } = await api.get<ICartItem[]>(API_CUSTOMER_CART);

    return data;
  }

  return useQuery({ queryKey: [API_CUSTOMER_CART], queryFn: fn, enabled: isEnabled });
}

export function addToCart(options: object) {
  async function fn(_id?: string | (string | undefined)[]) {
    if (!_id) return null;

    const { data } = await api.post<IBaseReply>(API_CUSTOMER_CART, { _id });

    return data;
  }

  return useMutation({ mutationKey: [API_CUSTOMER_CART], mutationFn: fn, ...options });
}

export function removeFromCart(options: object) {
  async function fn(_id?: string) {
    if (!_id) return null;

    const { data } = await api.delete<IBaseReply>(`${API_CUSTOMER_CART}/${_id}`);

    return data;
  }

  return useMutation({ mutationKey: [API_CUSTOMER_CART], mutationFn: fn, ...options });
}

export function updateCountCart(options: object) {
  async function fn(product: { count: number; _id?: string }) {
    const { data } = await api.patch<IBaseReply>(API_CUSTOMER_CART, product);

    return data;
  }

  return useMutation({ mutationKey: [API_CUSTOMER_CART], mutationFn: fn, ...options });
}
