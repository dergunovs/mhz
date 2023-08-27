import { useMutation, useQuery } from '@tanstack/vue-query';

import { ICustomer, IProduct } from 'mhz-types';

import {
  API_CUSTOMER,
  API_CUSTOMER_CURRENT,
  API_CUSTOMER_FAVOURITES,
  API_CUSTOMER_WATCHED,
} from '@/customer/constants';
import { api } from '@/common/services/api';

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

export function getCustomerFavouriteProducts() {
  async function fn(): Promise<IProduct[]> {
    const { data } = await api.get(API_CUSTOMER_FAVOURITES);

    return data;
  }

  return useQuery({ queryKey: [API_CUSTOMER_FAVOURITES], queryFn: fn });
}

export function postCustomer(options: object) {
  async function fn(formData: ICustomer) {
    await api.post(API_CUSTOMER, formData);
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
