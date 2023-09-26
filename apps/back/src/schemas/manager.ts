import type { JSONSchemaType } from 'ajv';
import type { IManager } from 'mhz-contracts';

import { ISchema } from '../interface/index.js';
import { baseParams, baseReply, queryParams } from './base.js';

const tags = ['Manager'];

export const managerModel: JSONSchemaType<IManager> = {
  $id: 'Manager',
  type: 'object',
  properties: {
    _id: { type: 'string', nullable: true },
    dateCreated: { type: 'string', format: 'date-time', nullable: true },
    dateUpdated: { type: 'string', format: 'date-time', nullable: true },
    password: { type: 'string', nullable: true },
    email: { type: 'string' },
    firstName: { type: 'string', nullable: true },
    lastName: { type: 'string', nullable: true },
    dateLoggedIn: { type: 'string', format: 'date-time', nullable: true },
  },
  required: ['email'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const managerReply: JSONSchemaType<{ data: IManager | null }> = {
  $id: 'ManagerReply',
  type: 'object',
  properties: {
    data: { $ref: 'Manager' },
  },
  required: ['data'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const managersReply: JSONSchemaType<{ data: IManager[]; total: number }> = {
  $id: 'ManagersReply',
  type: 'object',
  properties: {
    data: { type: 'array', items: managerModel },
    total: { type: 'number' },
  },
  required: ['data'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const managerGetManySchema: ISchema = {
  schema: {
    tags,
    response: { 200: managersReply },
    querystring: queryParams,
    security: [{ token: [] }],
    summary: 'manager',
  },
};

export const managerGetOneSchema: ISchema = {
  schema: { tags, response: { 200: managerReply }, params: baseParams, security: [{ token: [] }], summary: 'manager' },
};

export const managerUpdateSchema: ISchema = {
  schema: {
    tags,
    response: { 200: baseReply },
    body: managerModel,
    params: baseParams,
    security: [{ token: [] }],
    summary: 'manager',
  },
};

export const managerCreateSchema: ISchema = {
  schema: { tags, response: { 201: baseReply }, security: [{ token: [] }], summary: 'manager' },
};

export const managerDeleteSchema: ISchema = {
  schema: { tags, response: { 200: baseReply }, params: baseParams, security: [{ token: [] }], summary: 'manager' },
};
