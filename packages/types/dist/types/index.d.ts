interface IEntity {
  _id?: string;
  dateCreated?: Date;
  dateUpdated?: Date;
}

export interface IAdress {
  region: string;
  city: string;
  street: string;
  house: string;
  room: string;
}

export interface IManager extends IEntity {
  firstName?: string;
  lastName?: string;
  password: string;
  email: string;
  dateLoggedIn?: Date;
}

export interface ICartItem {
  _id: string;
  product: IProduct;
  count: number;
}

export interface IProductWatched {
  _id: string;
  product: IProduct;
  dateCreated: Date;
}

export interface ICustomer extends IEntity {
  firstName?: string;
  lastName?: string;
  phone?: string;
  password: string;
  email: string;
  card?: string;
  cart?: ICartItem[];
  orders?: IOrder[];
  watchedProducts?: IProductWatched[];
  favouriteProducts?: IProduct[];
  comparisons?: IComparison[];
  configurations?: IConfiguration[];
  adress?: IAdress;
  dateLoggedIn?: Date;
}

export interface IShipment extends IEntity {
  adress: IAdress;
  price: number;
  duration: number;
}

export type TCategoryFieldType = "string" | "number" | "boolean";

export interface ICategoryField extends IEntity {
  title: string;
  fieldType: TCategoryFieldType;
  fieldValue: string | number | boolean;
  fieldUnits?: string;
}

export interface ICategory extends IEntity {
  title: string;
  description: string;
  iconUrl: string;
  fields?: ICategoryField[];
}

export interface IManufacturer extends IEntity {
  title: string;
  description: string;
  country: string;
  logoUrl: string;
}

export interface IProduct extends IEntity {
  title: string;
  description: string;
  price: number;
  isInStock: boolean;
  imageUrls: string[];
  thumbUrls: string[];
  category: ICategory;
  manufacturer: IManufacturer;
  fields?: ICategoryField[];
  views?: number;
}

export interface IOrder extends IEntity {
  products: { product: IProduct; count: number }[];
  shipment: IShipment;
  user: ICustomer;
  status: "payment" | "delivery" | "done" | "canceled";
}

export interface IComparison extends IEntity {
  products: IProduct[];
  category: ICategory;
  user: ICustomer;
}

export interface IConfiguration extends IEntity {
  title: string;
  isShared: boolean;
  user: ICustomer;
  processor: IProduct;
  cooler: IProduct;
  mainboard: IProduct;
  ram: IProduct;
  ssd: IProduct;
  videocard: IProduct;
  psu: IProduct;
  case: IProduct;
  monitor: IProduct;
  keyboard: IProduct;
  mouse: IProduct;
}
