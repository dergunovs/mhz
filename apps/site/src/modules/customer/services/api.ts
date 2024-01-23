import { api } from 'mhz-helpers';
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

export async function getCurrentCustomerApi() {
  const { data } = await api.get<ICustomer>(API_CUSTOMER_CURRENT);

  return data;
}

export async function getCustomerWatchedProductsApi() {
  const { data } = await api.get<IProduct[]>(API_CUSTOMER_WATCHED);

  return data;
}

export async function getCustomerFavouriteProductsApi() {
  const { data } = await api.get<IProduct[]>(API_CUSTOMER_FAVOURITES);

  return data;
}

export async function postCustomerApi(formData: ISignUpData) {
  const { data } = await api.post<IBaseReply>(API_CUSTOMER, formData);

  return data;
}

export async function updateCustomerApi(formData: Omit<ICustomer, 'password'>) {
  const { data } = await api.patch<IBaseReply>(API_CUSTOMER, formData);

  return data;
}

export async function deleteCustomerApi() {
  const { data } = await api.delete<IBaseReply>(API_CUSTOMER);

  return data;
}

export async function addToFavouritesApi(_id?: string) {
  if (!_id) return null;

  const { data } = await api.post<IBaseReply>(API_CUSTOMER_FAVOURITES, { id: _id });

  return data;
}

export async function removeFromFavouritesApi(_id?: string) {
  if (!_id) return null;

  const { data } = await api.delete<IBaseReply>(`${API_CUSTOMER_FAVOURITES}/${_id}`);

  return data;
}

export async function getCustomerCartApi() {
  const { data } = await api.get<ICartItem[]>(API_CUSTOMER_CART);

  return data;
}

export async function addToCartApi(_id?: string | (string | undefined)[]) {
  if (!_id) return null;

  const { data } = await api.post<IBaseReply>(API_CUSTOMER_CART, { _id });

  return data;
}

export async function removeFromCartApi(_id?: string) {
  if (!_id) return null;

  const { data } = await api.delete<IBaseReply>(`${API_CUSTOMER_CART}/${_id}`);

  return data;
}

export async function updateCountCartApi(product: { count: number; _id?: string }) {
  const { data } = await api.patch<IBaseReply>(API_CUSTOMER_CART, product);

  return data;
}
