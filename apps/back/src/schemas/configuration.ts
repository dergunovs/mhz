import type { JSONSchemaType } from 'ajv';
import type { IConfiguration } from 'mhz-contracts';

import { ISchema } from '../interface/index.js';
import { baseParams, baseReply, queryParams } from './base.js';

const tags = ['Configuration'];

export const configurationModel: JSONSchemaType<IConfiguration> = {
  $id: 'Configuration',
  type: 'object',
  properties: {
    _id: { type: 'string', nullable: true },
    dateCreated: { type: 'string', format: 'date-time', nullable: true },
    dateUpdated: { type: 'string', format: 'date-time', nullable: true },
    title: { type: 'string' },
    isShared: { type: 'boolean', nullable: true },
    customer: { type: 'object', $ref: 'Customer', nullable: true },
    parts: {
      type: 'object',
      properties: {
        CPU: { type: 'object', $ref: 'Product', nullable: true },
        Case: { type: 'object', $ref: 'Product', nullable: true },
        Cooler: { type: 'object', $ref: 'Product', nullable: true },
        GPU: { type: 'object', $ref: 'Product', nullable: true },
        Keyboard: { type: 'object', $ref: 'Product', nullable: true },
        Monitor: { type: 'object', $ref: 'Product', nullable: true },
        Motherboard: { type: 'object', $ref: 'Product', nullable: true },
        Mouse: { type: 'object', $ref: 'Product', nullable: true },
        Mousepad: { type: 'object', $ref: 'Product', nullable: true },
        PSU: { type: 'object', $ref: 'Product', nullable: true },
        RAM: { type: 'object', $ref: 'Product', nullable: true },
        SSD: { type: 'object', $ref: 'Product', nullable: true },
      },
      nullable: true,
    },
  },
  required: ['title'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const configurationReply: JSONSchemaType<{ data: IConfiguration | null; isConfigurationEditable: boolean }> = {
  $id: 'ConfigurationReply',
  type: 'object',
  properties: {
    data: { $ref: 'Configuration' },
    isConfigurationEditable: { type: 'boolean' },
  },
  required: ['data'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const configurationsReply: JSONSchemaType<{ data: IConfiguration[]; total: number }> = {
  $id: 'ConfigurationsReply',
  type: 'object',
  properties: {
    data: { type: 'array', items: configurationModel },
    total: { type: 'number' },
  },
  required: ['data'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const configurationGetManySchema: ISchema = {
  schema: {
    tags,
    response: { 200: configurationsReply },
    querystring: queryParams,
    security: [{ token: [] }],
    summary: 'any',
  },
};

export const configurationGetOneSchema: ISchema = {
  schema: { tags, response: { 200: configurationReply }, params: baseParams },
};

export const configurationUpdateSchema: ISchema = {
  schema: {
    tags,
    response: { 200: baseReply },
    body: configurationModel,
    params: baseParams,
    security: [{ token: [] }],
    summary: 'customer',
  },
};

export const configurationCreateSchema: ISchema = {
  schema: {
    tags,
    response: { 201: baseReply },
    body: configurationModel,
    security: [{ token: [] }],
    summary: 'customer',
  },
};

export const configurationDeleteSchema: ISchema = {
  schema: { tags, response: { 200: baseReply }, params: baseParams, security: [{ token: [] }], summary: 'any' },
};
