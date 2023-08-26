import { ICategory, IManager, IManufacturer, IProduct } from 'mhz-types';

export interface ISearchResults {
  products: IProduct[];
  categories: ICategory[];
  manufacturers: IManufacturer[];
  managers: IManager[];
}

export interface IEntitiesCount {
  products: number;
  categories: number;
  manufacturers: number;
  managers: number;
}
