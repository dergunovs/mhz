import { ICategory, IManager, IManufacturer, IProduct, ICustomer } from 'mhz-types';

export interface ISearchResults {
  products: IProduct[];
  categories: ICategory[];
  manufacturers: IManufacturer[];
  managers: IManager[];
  customers: ICustomer[];
}

export interface IEntitiesCount {
  products: number;
  categories: number;
  manufacturers: number;
  managers: number;
  customers: number;
}
