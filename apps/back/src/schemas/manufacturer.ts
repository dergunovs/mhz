import type { JSONSchemaType } from 'ajv';
import type { IManufacturer } from 'mhz-contracts';

import { baseParams, baseReply, queryParams } from './base.js';

const tags = ['Manufacturer'];

export const manufacturerModel: JSONSchemaType<IManufacturer> = {
  $id: 'Manufacturer',
  type: 'object',
  properties: {
    _id: { type: 'string', nullable: true },
    dateCreated: { type: 'string', format: 'date-time', nullable: true },
    dateUpdated: { type: 'string', format: 'date-time', nullable: true },
    title: { type: 'string' },
    country: { type: 'string', nullable: true },
    logoUrl: { type: 'string', nullable: true },
    description: { type: 'string', nullable: true },
    views: { type: 'number', nullable: true },
  },
  required: ['title'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const manufacturerReply: JSONSchemaType<{ data: IManufacturer | null }> = {
  $id: 'ManufacturerResponse',
  type: 'object',
  properties: {
    data: { $ref: 'Manufacturer' },
  },
  required: ['data'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const manufacturersReply: JSONSchemaType<{ data: IManufacturer[] }> = {
  $id: 'ManufacturersResponse',
  type: 'object',
  properties: {
    data: { type: 'array', items: manufacturerModel },
    total: { type: 'number' },
  },
  required: ['data'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const manufacturerGetManySchema = {
  schema: { tags, response: { 200: manufacturersReply }, query: queryParams },
};

export const manufacturerGetOneSchema = {
  schema: { tags, response: { 200: manufacturerReply }, params: baseParams },
};

export const manufacturerUpdateSchema = {
  schema: { tags, response: { 200: baseReply }, body: manufacturerModel, params: baseParams },
};

export const manufacturerCreateSchema = {
  schema: { tags, response: { 201: baseReply } },
};

export const manufacturerDeleteSchema = {
  schema: { tags, response: { 200: baseReply }, params: baseParams },
};
