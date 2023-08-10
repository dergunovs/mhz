interface IEntity {
  _id?: number;
  date_created?: Date;
  date_updated?: Date;
}

export interface IAdress {
  region: string;
  city: string;
  street: string;
  house: string;
  room: string;
}

export interface IManager extends IEntity {
  first_name?: string;
  last_name?: string;
  password: string;
  email: string;
  date_logged_in?: Date;
}

export interface ICustomer extends IEntity {
  first_name?: string;
  last_name?: string;
  phone?: string;
  password: string;
  email: string;
  isEmailConfirmed?: boolean;
  card?: string;
  cart?: ICart;
  orders?: IOrder[];
  favouriteProducts?: IProduct[];
  comparisons?: IComparison[];
  configurations?: IConfiguration[];
  adress?: IAdress;
  date_logged_in?: Date;
}

export interface ICart extends IEntity {
  products: { product: IProduct; count: number }[];
  isShared: boolean;
  user: number | ICustomer;
}

export interface IShipment extends IEntity {
  adress: number | IAdress;
  price: number;
  duration: number;
}

export type ICategoryFieldType = "string" | "number" | "boolean";

export interface ICategoryField extends IEntity {
  title: string;
  fieldType: ICategoryFieldType;
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
  price: number | null;
  isInStock: boolean;
  imageUrls: string[];
  category: number | ICategory | null;
  manufacturer: number | IManufacturer | null;
  fields?: number[] | ICategoryField[];
}

export interface IOrder extends IEntity {
  products: { product: IProduct; count: number }[];
  shipment: number | IShipment;
  user: number | ICustomer;
  status: "payment" | "delivery" | "done" | "canceled";
}

export interface IComparison extends IEntity {
  products: IProduct[];
  category: number | ICategory;
  user: number | ICustomer;
}

export interface IConfiguration extends IEntity {
  title: string;
  isShared: boolean;
  user: number | ICustomer;
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
