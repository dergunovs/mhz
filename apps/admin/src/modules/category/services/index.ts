import { Ref, ComputedRef } from 'vue';
import { useQuery, useMutation } from '@tanstack/vue-query';

import { ICategory, ICategoryField } from 'mhz-types';

import { API_CATEGORY, API_CATEGORY_FIELD } from '@/category/constants';
import { api } from '@/common/services/api';

export function getCategories(page: Ref<number>) {
  async function fn(): Promise<{ data: ICategory[]; total: number }> {
    const { data } = await api.get(API_CATEGORY, { params: { page: page.value || 1 } });

    return data;
  }

  return useQuery({
    queryKey: [API_CATEGORY, page],
    queryFn: fn,
  });
}

export function getCategory(id: ComputedRef<string>) {
  async function fn(): Promise<ICategory> {
    const { data } = await api.get(`${API_CATEGORY}/${id.value}`);

    return data;
  }

  return useQuery({
    queryKey: [API_CATEGORY, id],
    queryFn: fn,
  });
}

export function postCategory(options: object) {
  async function fn(formData: ICategory) {
    await api.post(API_CATEGORY, formData);
  }

  return useMutation({
    mutationKey: [API_CATEGORY],
    mutationFn: fn,
    ...options,
  });
}

export function updateCategory(id: ComputedRef<number | undefined>, options: object) {
  async function fn(formData: ICategory) {
    await api.patch(`${API_CATEGORY}/${id.value}`, formData);
  }

  return useMutation({
    mutationKey: [API_CATEGORY, id],
    mutationFn: fn,
    ...options,
  });
}

export function deleteCategory(options: object) {
  async function fn(id?: number) {
    await api.delete(`${API_CATEGORY}/${id}`);
  }

  return useMutation({
    mutationKey: [API_CATEGORY],
    mutationFn: fn,
    ...options,
  });
}

export function getCategoryField(id: ComputedRef<string>) {
  async function fn(): Promise<ICategoryField> {
    const { data } = await api.get(`${API_CATEGORY_FIELD}/${id.value}`);

    return data;
  }

  return useQuery({
    queryKey: [API_CATEGORY_FIELD, id],
    queryFn: fn,
  });
}

export function postCategoryField(options: object) {
  async function fn(formData: ICategoryField) {
    await api.post(API_CATEGORY_FIELD, formData);
  }

  return useMutation({
    mutationKey: [API_CATEGORY_FIELD],
    mutationFn: fn,
    ...options,
  });
}

export function updateCategoryField(id: ComputedRef<number | undefined>, options: object) {
  async function fn(formData: ICategoryField) {
    await api.patch(`${API_CATEGORY_FIELD}/${id.value}`, formData);
  }

  return useMutation({
    mutationKey: [API_CATEGORY_FIELD, id],
    mutationFn: fn,
    ...options,
  });
}

export function deleteCategoryField(options: object) {
  async function fn(id?: number) {
    await api.delete(`${API_CATEGORY_FIELD}/${id}`);
  }

  return useMutation({
    mutationKey: [API_CATEGORY_FIELD],
    mutationFn: fn,
    ...options,
  });
}
