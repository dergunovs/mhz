import { IProductSortOption } from '@/product/interface';

export const URL_PRODUCT = '/products';

export const SORT_OPTIONS: IProductSortOption[] = [
  { _id: '1', title: 'Cheap first', value: 'price', isAsc: true },
  { _id: '2', title: 'Expensive first', value: 'price', isAsc: false },
  { _id: '3', title: 'Newest', value: 'dateCreated', isAsc: false },
  { _id: '4', title: 'Popularity', value: 'views', isAsc: false },
  { _id: '5', title: 'A -> Z', value: 'title', isAsc: true },
  { _id: '6', title: 'Z -> A', value: 'title', isAsc: false },
] as const;
