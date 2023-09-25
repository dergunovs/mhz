import type { JSONSchemaType } from 'ajv';
import type { ISearchResult, ISearchResults } from 'mhz-contracts';

const tags = ['Search'];

export const searchResultModel: JSONSchemaType<ISearchResult> = {
  $id: 'SearchResult',
  type: 'object',
  properties: {
    _id: { type: 'string' },
    title: { type: 'string', nullable: true },
    firstName: { type: 'string', nullable: true },
    lastName: { type: 'string', nullable: true },
  },
  required: ['_id'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const searchResultsModel: JSONSchemaType<ISearchResults> = {
  $id: 'SearchResults',
  type: 'object',
  properties: {
    products: { type: 'array', items: searchResultModel },
    categories: { type: 'array', items: searchResultModel },
    manufacturers: { type: 'array', items: searchResultModel },
    managers: { type: 'array', items: searchResultModel, nullable: true },
    customers: { type: 'array', items: searchResultModel, nullable: true },
    orders: { type: 'array', items: searchResultModel, nullable: true },
  },
  required: ['products', 'categories', 'manufacturers'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const searchSchema = {
  schema: { tags, response: { 200: searchResultsModel } },
};
