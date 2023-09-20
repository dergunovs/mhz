import {
  ICartItem,
  ICustomer,
  IFilterData,
  IProduct,
  ISearchResults,
  ISignUpData,
  IUserToken,
  TInitiator,
  IQuery,
  TOrderStatus,
} from "./types";

export interface IBaseService {
  getMany: <T>(
    query?: IQuery,
    decode?: (token: string) => IUserToken | null,
    token?: string,
  ) => Promise<{ data: T[]; total?: number; filters?: IFilterData }>;

  getOne: <T>(
    id: string,
    decode?: (token: string) => IUserToken | null,
    token?: string,
  ) => Promise<{
    data: T | null;
    isConfigurationEditable?: boolean;
    isConfigurationSharable?: boolean;
    isOrderNotBelongToCustomer?: boolean;
  }>;

  update: <T>(
    itemToUpdate?: T,
    _id?: string,
    decode?: (token: string) => IUserToken | null,
    token?: string,
    status?: TOrderStatus,
  ) => Promise<void | boolean>;

  create: <T>(
    item?: T,
    decode?: (token: string) => IUserToken | null,
    token?: string,
  ) => Promise<string | boolean | void>;

  delete: (
    _id?: string,
    decode?: (token: string) => IUserToken | null,
    token?: string,
  ) => Promise<void | boolean>;
}

export interface ICustomerService extends IBaseService {
  getCurrent: (
    decode: (token: string) => IUserToken | null,
    token?: string,
  ) => Promise<ICustomer | null>;

  getCart: (
    decode: (token: string) => IUserToken | null,
    token?: string,
  ) => Promise<ICartItem[]>;

  getWatchedProducts: (
    decode: (token: string) => IUserToken | null,
    token?: string,
  ) => Promise<IProduct[]>;

  getFavouriteProducts: (
    decode: (token: string) => IUserToken | null,
    token?: string,
  ) => Promise<IProduct[]>;

  updateCart: (
    _id: string,
    count: string,
    decode: (token: string) => IUserToken | null,
    token?: string,
  ) => Promise<boolean>;

  createFavourite: (
    _id: string,
    decode: (token: string) => IUserToken | null,
    token?: string,
  ) => Promise<{ isReachedLimit: boolean; isAlreadyExists: boolean }>;

  addToCart: (
    _id: string | string[],
    decode: (token: string) => IUserToken | null,
    token?: string,
  ) => Promise<void>;

  deleteFromCart: (
    _id: string,
    decode: (token: string) => IUserToken | null,
    token?: string,
  ) => Promise<boolean>;

  deleteFavourite: (
    _id: string,
    decode: (token: string) => IUserToken | null,
    token?: string,
  ) => Promise<boolean>;
}

export interface IProductService extends IBaseService {
  getPriceRange: (
    _id: string,
    initiator: TInitiator,
  ) => Promise<[number, number]>;

  getFilters: (
    id: string,
    initiator: TInitiator,
  ) => Promise<IFilterData | undefined>;
}

export interface IAuthService {
  check: (request: { jwtVerify: () => Promise<void> }) => Promise<void>;

  login: (
    loginData: ILoginData,
    sign: (payload: IUserToken, options: object) => string,
  ) => Promise<{
    user?: IUserToken;
    isUserNotFound: boolean;
    isWrongPassword: boolean;
  }>;

  setup: (manager: ISignUpData) => Promise<boolean>;
}

export interface ISearchService {
  search: (search: string, isAdmin: boolean) => Promise<ISearchResults>;
}

export interface IStatsService {
  count: () => Promise<IEntitiesCount>;
}

export interface IUploadService {
  uploadMultiple: (
    getFiles: AsyncIterableIterator<IFileToUpload>,
    width: string,
    isThumb: boolean,
  ) => Promise<string[]>;

  uploadSingle: (
    getFile: IFileToUpload | undefined,
    width: string,
    isThumb: boolean,
  ) => Promise<{ filename: string; isFileExists: boolean }>;

  delete: (_id: string, thumb: string) => Promise<void>;
}
