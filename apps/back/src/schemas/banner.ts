import type { JSONSchemaType } from 'ajv';
import type { IBanner } from 'mhz-contracts';

import { ISchema } from '../interface/index.js';
import { baseParams, baseReply, queryParams } from './base.js';

const tags = ['Banner'];

export const bannerModel: JSONSchemaType<IBanner> = {
  $id: 'Banner',
  type: 'object',
  properties: {
    _id: { type: 'string', nullable: true },
    dateCreated: { type: 'string', format: 'date-time', nullable: true },
    dateUpdated: { type: 'string', format: 'date-time', nullable: true },
    isActive: { type: 'boolean' },
    text: { type: 'string' },
    product: { type: 'object', $ref: 'Product' },
    imageUrl: { type: 'string' },
    color: { type: 'string' },
  },
  required: ['isActive', 'text', 'product', 'imageUrl', 'color'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const bannerReply: JSONSchemaType<{ data: IBanner | null }> = {
  $id: 'BannerReply',
  type: 'object',
  properties: {
    data: { $ref: 'Banner' },
  },
  required: ['data'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const bannersReply: JSONSchemaType<{ data: IBanner[]; total: number }> = {
  $id: 'BannersReply',
  type: 'object',
  properties: {
    data: { type: 'array', items: bannerModel },
    total: { type: 'number' },
  },
  required: ['data'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const bannersActiveReply: JSONSchemaType<IBanner[]> = {
  $id: 'BannersReply',
  type: 'array',
  items: bannerModel,
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const bannerGetManySchema: ISchema = {
  schema: {
    tags,
    response: { 200: bannersReply },
    querystring: queryParams,
    security: [{ token: [] }],
    summary: 'manager',
  },
};

export const bannerGetActiveSchema: ISchema = {
  schema: { tags, response: { 200: bannersActiveReply }, summary: 'manager' },
};

export const bannerGetOneSchema: ISchema = {
  schema: { tags, response: { 200: bannerReply }, params: baseParams, security: [{ token: [] }], summary: 'manager' },
};

export const bannerUpdateSchema: ISchema = {
  schema: {
    tags,
    response: { 200: baseReply },
    body: bannerModel,
    params: baseParams,
    security: [{ token: [] }],
    summary: 'manager',
  },
};

export const bannerCreateSchema: ISchema = {
  schema: { tags, response: { 201: baseReply }, security: [{ token: [] }], summary: 'manager' },
};

export const bannerDeleteSchema: ISchema = {
  schema: { tags, response: { 200: baseReply }, params: baseParams, security: [{ token: [] }], summary: 'manager' },
};
