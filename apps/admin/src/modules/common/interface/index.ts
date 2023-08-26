import { ICategory, IManager, IManufacturer, IProduct } from 'mhz-types';

export interface ISearchResult {
  products: IProduct[];
  categories: ICategory[];
  manufacturers: IManufacturer[];
  managers: IManager[];
}
