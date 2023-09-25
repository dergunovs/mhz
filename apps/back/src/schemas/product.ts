import type { JSONSchemaType } from 'ajv';
import type { IFilterBaseValue, IFilterData, IFilterField, IProduct, TInitiator } from 'mhz-contracts';

import { baseParams, baseReply, queryParams } from './base.js';

const tags = ['Product'];

export const productModel: JSONSchemaType<IProduct> = {
  $id: 'Product',
  type: 'object',
  properties: {
    _id: { type: 'string', nullable: true },
    dateCreated: { type: 'string', format: 'date-time', nullable: true },
    dateUpdated: { type: 'string', format: 'date-time', nullable: true },
    title: { type: 'string' },
    description: { type: 'string', nullable: true },
    price: { type: 'number' },
    isInStock: { type: 'boolean', nullable: true },
    imageUrls: { type: 'array', items: { type: 'string' }, nullable: true },
    thumbUrls: { type: 'array', items: { type: 'string' } },
    category: { type: 'object', $ref: 'Category' },
    manufacturer: { type: 'object', $ref: 'Manufacturer', nullable: true },
    fields: {
      type: 'array',
      items: {
        type: 'object',
        $ref: 'CategoryField',
        required: ['title', 'fieldType', 'fieldValue'],
      },
      nullable: true,
    },
    views: { type: 'number', nullable: true },
  },
  required: ['title', 'price', 'thumbUrls', 'category'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const productFilterBaseModel: JSONSchemaType<IFilterBaseValue> = {
  $id: 'ProductFilterBase',
  type: 'object',
  properties: {
    count: { type: 'number' },
    _id: { type: 'string' },
    title: { type: 'string' },
  },
  required: ['count', '_id', 'title'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const productFilterFieldModel: JSONSchemaType<Omit<IFilterField, 'fieldValues'>> = {
  $id: 'ProductFilterField',
  type: 'object',
  additionalProperties: {
    type: 'object',
    properties: {
      fieldUnits: { type: 'string', nullable: true },
      fieldValues: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            value: { anyOf: [{ type: 'string' }, { type: 'boolean' }] },
            count: { type: 'number' },
          },
          required: ['value', 'count'],
          $schema: 'http://json-schema.org/draft-07/schema#',
          additionalProperties: false,
        },
        nullable: true,
      },
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
};

export const productFilterModel: JSONSchemaType<IFilterData> = {
  $id: 'ProductFilter',
  type: 'object',
  properties: {
    category: {
      type: 'array',
      items: { type: 'object', $ref: 'ProductFilterBase', required: ['count', '_id', 'title'] },
    },
    manufacturer: {
      type: 'array',
      items: { type: 'object', $ref: 'ProductFilterBase', required: ['count', '_id', 'title'] },
    },
    fields: { $ref: 'ProductFilterField' },
  },
  required: ['category', 'manufacturer', 'fields'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const productReply: JSONSchemaType<{ data: IProduct | null }> = {
  $id: 'ProductReply',
  type: 'object',
  properties: {
    data: { $ref: 'Product' },
  },
  required: ['data'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const productsReply: JSONSchemaType<{ data: IProduct[]; total: number; filters: IFilterData }> = {
  $id: 'ProductsReply',
  type: 'object',
  properties: {
    data: { type: 'array', items: productModel },
    total: { type: 'number' },
    filters: { $ref: 'ProductFilter' },
  },
  required: ['data'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const productQuery: JSONSchemaType<{ _id: string; initiator: TInitiator }> = {
  $id: 'ProductQuery',
  type: 'object',
  properties: {
    _id: { type: 'string' },
    initiator: { enum: ['category', 'manufacturer'], type: 'string' },
  },
  required: ['_id', 'initiator'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const productPriceRangeReply: JSONSchemaType<number[]> = {
  type: 'array',
  items: { type: 'number' },
  minItems: 2,
  maxItems: 2,
};

export const productGetManySchema = {
  schema: { tags, response: { 200: productsReply }, query: queryParams },
};

export const productGetOneSchema = {
  schema: { tags, response: { 200: productReply }, params: baseParams },
};

export const productPriceRangeSchema = {
  schema: { tags, response: { 200: productPriceRangeReply }, query: productQuery },
};

export const productFiltersSchema = {
  schema: { tags, response: { 200: productFilterModel }, query: productQuery },
};

export const productUpdateSchema = {
  schema: { tags, response: { 200: baseReply }, body: productModel, params: baseParams },
};

export const productCreateSchema = {
  schema: { tags, response: { 201: baseReply }, body: productModel },
};

export const productDeleteSchema = {
  schema: { tags, response: { 200: baseReply }, params: baseParams },
};
