export declare const API_AUTH_CHECK = "/auth/check";
export declare const API_AUTH_LOGIN = "/auth/login";
export declare const API_AUTH_SETUP = "/auth/setup";
export declare const API_CATEGORY = "/category";
export declare const API_CONFIGURATION = "/configuration";
export declare const API_CUSTOMER = "/customer";
export declare const API_CUSTOMER_CURRENT = "/customer/current";
export declare const API_CUSTOMER_FAVOURITES = "/customer/favourites";
export declare const API_CUSTOMER_WATCHED = "/customer/watched";
export declare const API_CUSTOMER_CART = "/customer/cart";
export declare const API_MANAGER = "/manager";
export declare const API_MANUFACTURER = "/manufacturer";
export declare const API_ORDER = "/order";
export declare const API_PRODUCT = "/product";
export declare const API_PRODUCT_PRICE_RANGE = "/product/price";
export declare const API_PRODUCT_FILTERS = "/product/filters";
export declare const API_SEARCH = "/search";
export declare const API_STATS_COUNT = "/stats/count";
export declare const API_UPLOAD = "/upload";
export declare const API_UPLOAD_SINGLE = "/upload/single";

interface IEntity {
  _id?: string;
  dateCreated?: Date;
  dateUpdated?: Date;
}

export interface IManager extends IEntity {
  firstName?: string;
  lastName?: string;
  password: string;
  email: string;
  dateLoggedIn?: Date;
}

export interface ICustomer extends IManager {
  phone?: string;
  cart?: ICartItem[];
  orders?: IOrder[];
  watchedProducts?: IProductWatched[];
  favouriteProducts?: IProduct[];
  comparisons?: IComparison[];
  configurations?: IConfiguration[];
}

export type TCategoryFieldType = "string" | "number" | "boolean";

export interface ICategoryField extends IEntity {
  title: string;
  fieldType: TCategoryFieldType;
  fieldValue: string | boolean | number;
  fieldUnits?: string;
}

export interface ICategory extends IEntity {
  title: string;
  description?: string;
  iconUrl: string;
  fields?: ICategoryField[];
}

export interface IManufacturer extends IEntity {
  title: string;
  description?: string;
  country: string;
  logoUrl: string;
}

export interface IProduct extends IEntity {
  title: string;
  description?: string;
  price: number;
  isInStock: boolean;
  imageUrls: string[];
  thumbUrls: string[];
  category: ICategory;
  manufacturer: IManufacturer;
  fields?: ICategoryField[];
  views?: number;
}

export interface IProductWatched extends IEntity {
  _id: string;
  product: IProduct;
  dateCreated: Date;
}

export interface ICartItem {
  _id: string;
  product: IProduct;
  count: number;
}

export type TOrderStatus = "new" | "paid" | "cancelled" | "completed";

export interface IOrder extends IEntity {
  products: ICartItem[];
  customer: ICustomer;
  status: TOrderStatus;
  price: number;
}

export interface IComparison extends IEntity {
  products: IProduct[];
  category: ICategory;
  customer: ICustomer;
}

export interface IConfigurationParts {
  CPU?: IProduct;
  Case?: IProduct;
  Cooler?: IProduct;
  GPU?: IProduct;
  Keyboard?: IProduct;
  Monitor?: IProduct;
  Motherboard?: IProduct;
  Mouse?: IProduct;
  Mousepad?: IProduct;
  PSU?: IProduct;
  RAM?: IProduct;
  SSD?: IProduct;
}

export interface IConfiguration extends IEntity {
  title: string;
  isShared?: boolean;
  customer?: ICustomer;
  parts: IConfigurationParts;
}

export interface IFilterFieldValue {
  value: string | boolean;
  count: number;
}

export interface IFilterBaseValue {
  count: number;
  _id: string;
  title: string;
}

export interface IFilterField {
  [key: string]: {
    fieldUnits?: string;
    fieldValues: IFilterFieldValue[];
  };
}

export interface IFilterData {
  category: IFilterBaseValue[];
  manufacturer: IFilterBaseValue[];
  fields: IFilterField;
}

export interface ISearchResults {
  [key: string]: IEntity[] | undefined;
}

export interface IEntitiesCount {
  products: number;
  categories: number;
  manufacturers: number;
  managers: number;
  customers: number;
  orders: number;
}

export interface IBaseReply {
  message: string;
}

interface PopulateOptions {
  path: string;
  select?: string;
  populate?: { path: string; select?: string };
}

export type TInitiator = "category" | "manufacturer";

export type TSortDir = "asc" | "desc";

export interface IQuery {
  page?: string;
  sort?: string;
  dir?: TSortDir;
  category?: string | string[];
  manufacturer?: string | string[];
  price?: [string, string];
  fields?: [];
  select?: string;
  populate?: PopulateOptions[];
  initiator?: TInitiator;
  customer?: string;
}

export type TUserRole = "customer" | "manager";

export interface IUserToken {
  _id: string;
  email: string;
  role: TUserRole;
  firstName?: string;
  lastName?: string;
  token?: string;
}

export interface ILoginData {
  email: string;
  password: string;
  role: TUserRole;
}
