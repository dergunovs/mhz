import type { JSONSchemaType } from 'ajv';
import type { ICategoryField, ICategory } from 'mhz-contracts';

import { baseParams, baseReply, queryParams } from './base.js';

const tags = ['Category'];

export const categoryFieldModel: JSONSchemaType<ICategoryField> = {
  $id: 'CategoryField',
  type: 'object',
  properties: {
    _id: { type: 'string', nullable: true },
    dateCreated: { type: 'string', format: 'date-time', nullable: true },
    dateUpdated: { type: 'string', format: 'date-time', nullable: true },
    title: { type: 'string' },
    fieldType: { enum: ['boolean', 'number', 'string'], type: 'string' },
    fieldValue: { anyOf: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }] },
    fieldUnits: { type: 'string', nullable: true },
  },
  required: ['title', 'fieldType', 'fieldValue'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const categoryModel: JSONSchemaType<ICategory> = {
  $id: 'Category',
  type: 'object',
  properties: {
    _id: { type: 'string', nullable: true },
    dateCreated: { type: 'string', format: 'date-time', nullable: true },
    dateUpdated: { type: 'string', format: 'date-time', nullable: true },
    title: { type: 'string' },
    iconUrl: { type: 'string' },
    description: { type: 'string', nullable: true },
    fields: { type: 'array', items: categoryFieldModel, nullable: true },
    views: { type: 'number', nullable: true },
  },
  required: ['iconUrl', 'title'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const categoryResponse: JSONSchemaType<{ data: ICategory | null }> = {
  $id: 'CategoryResponse',
  type: 'object',
  properties: {
    data: { $ref: 'Category' },
  },
  required: ['data'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const categoriesResponse: JSONSchemaType<{ data: ICategory[] }> = {
  $id: 'CategoriesResponse',
  type: 'object',
  properties: {
    data: { type: 'array', items: categoryModel },
  },
  required: ['data'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const categoryGetManySchema = {
  schema: { tags, response: { 200: categoriesResponse }, query: queryParams },
};

export const categoryGetOneSchema = {
  schema: { tags, response: { 200: categoryResponse }, params: baseParams },
};

export const categoryUpdateSchema = {
  schema: { tags, response: { 200: baseReply }, body: categoryModel, params: baseParams },
};

export const categoryCreateSchema = {
  schema: { tags, response: { 201: baseReply } },
};

export const categoryDeleteSchema = {
  schema: { tags, response: { 200: baseReply }, params: baseParams },
};
