interface IEntity {
  _id?: number;
  date_created?: Date;
}

export interface IAdress {
  region: string;
  city: string;
  street: string;
  house: string;
  room: string;
}

export interface IUser extends IEntity {
  first_name?: string;
  last_name?: string;
  phone?: string;
  role: "user" | "admin";
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
  date_updated?: Date;
}

export interface ICart extends IEntity {
  products: { product: IProduct; count: number }[];
  isShared: boolean;
  user: number | IUser;
}

export interface IShipment extends IEntity {
  adress: number | IAdress;
  price: number;
  duration: number;
}

export interface ICategoryField extends IEntity {
  title: string;
  description: string;
  type: "string" | "number" | "boolean";
  value?: string | number | boolean;
}

export interface ICategory extends IEntity {
  title: string;
  description: string;
  iconURL: string;
  fields?: number[] | ICategoryField[];
}

export interface IManufacturer extends IEntity {
  title: string;
  description: string;
  country: string;
  logoURL: string;
}

export interface IProduct extends IEntity {
  title: string;
  description: string;
  price: number;
  isInStock: boolean;
  imageURLs: string[];
  category: number | ICategory;
  manufacturer: number | IManufacturer;
  fields?: number[] | ICategoryField[];
}

export interface IOrder extends IEntity {
  products: { product: IProduct; count: number }[];
  shipment: number | IShipment;
  user: number | IUser;
  status: "payment" | "delivery" | "done" | "canceled";
}

export interface IComparison extends IEntity {
  products: IProduct[];
  category: number | ICategory;
  user: number | IUser;
}

export interface IConfiguration extends IEntity {
  title: string;
  isShared: boolean;
  user: number | IUser;
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
