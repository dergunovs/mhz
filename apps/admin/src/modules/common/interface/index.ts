import { IEntity } from 'mhz-types';

export interface ISearchResults {
  [key: string]: IEntity[];
}

export interface IEntitiesCount {
  products: number;
  categories: number;
  manufacturers: number;
  managers: number;
  customers: number;
}
