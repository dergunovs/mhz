import { api, useMutation, useQuery } from 'mhz-helpers';
import { ICustomer, IProduct, ICartItem } from 'mhz-types';

import {
  API_CUSTOMER,
  API_CUSTOMER_CART,
  API_CUSTOMER_CURRENT,
  API_CUSTOMER_FAVOURITES,
  API_CUSTOMER_WATCHED,
} from '@/customer/constants';

export function getCurrentCustomer() {
  async function fn(): Promise<ICustomer> {
    const { data } = await api.get(API_CUSTOMER_CURRENT);

    return data;
  }

  return useQuery({ queryKey: [API_CUSTOMER], queryFn: fn });
}

export function getCustomerWatchedProducts() {
  async function fn(): Promise<IProduct[]> {
    const { data } = await api.get(API_CUSTOMER_WATCHED);

    return data;
  }

  return useQuery({ queryKey: [API_CUSTOMER_WATCHED], queryFn: fn });
}

export function getCustomerFavouriteProducts(options?: object) {
  async function fn(): Promise<IProduct[]> {
    const { data } = await api.get(API_CUSTOMER_FAVOURITES);

    return data;
  }

  return useQuery({ queryKey: [API_CUSTOMER_FAVOURITES], queryFn: fn, ...options });
}

export function postCustomer(options: object) {
  async function fn(formData: ICustomer) {
    await api.post(API_CUSTOMER, formData);
  }

  return useMutation({ mutationKey: [API_CUSTOMER], mutationFn: fn, ...options });
}

export function updateCustomer(options: object) {
  async function fn(formData: Omit<ICustomer, 'password'>) {
    await api.patch(API_CUSTOMER, formData);
  }

  return useMutation({ mutationKey: [API_CUSTOMER], mutationFn: fn, ...options });
}

export function deleteCustomer(options: object) {
  async function fn() {
    await api.delete(API_CUSTOMER);
  }

  return useMutation({ mutationKey: [API_CUSTOMER], mutationFn: fn, ...options });
}

export function addToFavourites(options: object) {
  async function fn(_id?: string) {
    const { data } = await api.post(API_CUSTOMER_FAVOURITES, { _id });

    return data;
  }

  return useMutation({ mutationKey: [API_CUSTOMER_FAVOURITES], mutationFn: fn, ...options });
}

export function removeFromFavourites(options: object) {
  async function fn(_id?: string) {
    const { data } = await api.delete(`${API_CUSTOMER_FAVOURITES}/${_id}`);

    return data;
  }

  return useMutation({ mutationKey: [API_CUSTOMER_FAVOURITES], mutationFn: fn, ...options });
}

export function getCustomerCart(options?: object) {
  async function fn(): Promise<ICartItem[]> {
    const { data } = await api.get(API_CUSTOMER_CART);

    return data;
  }

  return useQuery({ queryKey: [API_CUSTOMER_CART], queryFn: fn, ...options });
}

export function addToCart(options: object) {
  async function fn(_id?: string) {
    const { data } = await api.post(API_CUSTOMER_CART, { _id });

    return data;
  }

  return useMutation({ mutationKey: [API_CUSTOMER_CART], mutationFn: fn, ...options });
}

export function removeFromCart(options: object) {
  async function fn(_id?: string) {
    const { data } = await api.delete(`${API_CUSTOMER_CART}/${_id}`);

    return data;
  }

  return useMutation({ mutationKey: [API_CUSTOMER_CART], mutationFn: fn, ...options });
}

export function updateCountCart(options: object) {
  async function fn(product: { count: number; _id?: string }) {
    const { data } = await api.patch(API_CUSTOMER_CART, product);

    return data;
  }

  return useMutation({ mutationKey: [API_CUSTOMER_CART], mutationFn: fn, ...options });
}
