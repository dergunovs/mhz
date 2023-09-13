export const URL_PRODUCT = '/products';

export const API_PRODUCT = 'product';
export const API_PRODUCT_PRICE_RANGE = `${API_PRODUCT}/price`;
export const API_PRODUCT_FILTERS = `${API_PRODUCT}/filters`;

export const SORT_OPTIONS = [
  { _id: '1', title: 'Cheap first', value: 'price', isAsc: true },
  { _id: '2', title: 'Expensive first', value: 'price', isAsc: false },
  { _id: '3', title: 'Newest', value: 'dateCreated', isAsc: false },
  { _id: '4', title: 'Popularity', value: 'views', isAsc: false },
  { _id: '5', title: 'A -> Z', value: 'title', isAsc: true },
  { _id: '6', title: 'Z -> A', value: 'title', isAsc: false },
];
