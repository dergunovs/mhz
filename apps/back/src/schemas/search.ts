import type { JSONSchemaType } from 'ajv';
import type { ISearchResult, ISearchResults } from 'mhz-contracts';

import { ISchema } from '../interface/index.js';

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
    products: { type: 'array', items: { type: 'object', $ref: 'SearchResult', required: ['_id'] } },
    categories: { type: 'array', items: { type: 'object', $ref: 'SearchResult', required: ['_id'] } },
    manufacturers: { type: 'array', items: { type: 'object', $ref: 'SearchResult', required: ['_id'] } },
    managers: { type: 'array', items: { type: 'object', $ref: 'SearchResult', required: ['_id'] }, nullable: true },
    customers: { type: 'array', items: { type: 'object', $ref: 'SearchResult', required: ['_id'] }, nullable: true },
    orders: { type: 'array', items: { type: 'object', $ref: 'SearchResult', required: ['_id'] }, nullable: true },
  },
  required: ['products', 'categories', 'manufacturers'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const searchQuery: JSONSchemaType<{ search: string }> = {
  $id: 'SearchQuery',
  type: 'object',
  properties: {
    search: { type: 'string' },
  },
  required: ['search'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const searchSchema: ISchema = {
  schema: { tags, response: { 200: searchResultsModel }, querystring: searchQuery },
};
