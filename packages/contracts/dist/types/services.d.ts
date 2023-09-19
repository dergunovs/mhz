export interface IBaseService {
  getMany: (...params: any) => any;
  getOne: (...params: any) => any;
  update: (...params: any) => any;
  create: (...params: any) => any;
  delete: (...params: any) => any;
}

export interface ICustomerService extends IBaseService {
  getCurrent: (...params: any) => any;
  getCart: (...params: any) => any;
  getWatchedProducts: (...params: any) => any;
  getFavouriteProducts: (...params: any) => any;
  updateCart: (...params: any) => any;
  createFavourite: (...params: any) => any;
  addToCart: (...params: any) => any;
  deleteFromCart: (...params: any) => any;
  deleteFavourite: (...params: any) => any;
}

export interface IProductService extends IBaseService {
  getPriceRange: (...params: any) => any;
  getFilters: (...params: any) => any;
}

export interface IAuthService {
  check: (...params: any) => any;
  login: (...params: any) => any;
  setup: (...params: any) => any;
}

export interface ISearchService {
  search: (...params: any) => any;
}

export interface IStatsService {
  count: (...params: any) => any;
}

export interface IUploadService {
  uploadMultiple: (...params: any) => any;
  uploadSingle: (...params: any) => any;
  delete: (...params: any) => any;
}
