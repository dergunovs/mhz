export const ENTER_MORE_SYMBOLS = 'Please enter 3 or more symbols';
export const LOADING = 'Loading...';
export const NO_RESULTS = 'No results';

export const DEBOUNCE_TIME = 300;

export const MODEL_VALUE = '';

export const IS_SUCCESS = true;

export const RESULTS = {
  products: [
    { _id: '1', title: 'AMD Ryzen 7700X' },
    { _id: '2', title: 'AMD Ryzen 7900X' },
  ],
  manufacturers: [{ _id: '1', title: 'AMD' }],
};

export const SEARCH_SCHEME = [
  { type: 'products', labels: ['title'], url: '/products' },
  { type: 'manufacturers', labels: ['title'], url: '/manufacturers' },
];
