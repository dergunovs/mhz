import type { JSONSchemaType } from 'ajv';
import type { IUploadQuery } from 'mhz-contracts';

import { ISchema } from '../interface/index.js';
import { baseParams, baseReply } from './base.js';

const tags = ['Upload'];

export const uploadQuery: JSONSchemaType<IUploadQuery> = {
  $id: 'UploadQuery',
  type: 'object',
  properties: {
    width: { type: 'string', nullable: true },
    thumb: { type: 'string', nullable: true },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const uploadMultipleReply: JSONSchemaType<string[]> = {
  $id: 'UploadMultipleReply',
  type: 'array',
  items: { type: 'string' },
  $schema: 'http://json-schema.org/draft-07/schema#',
};

export const uploadSingleReply: JSONSchemaType<string> = {
  $id: 'UploadSingleReply',
  type: 'string',
  $schema: 'http://json-schema.org/draft-07/schema#',
};

export const uploadMultipleSchema: ISchema = {
  schema: {
    tags,
    response: { 200: uploadMultipleReply },
    querystring: uploadQuery,
    security: [{ token: [] }],
    summary: 'manager',
  },
};

export const uploadSingleSchema: ISchema = {
  schema: {
    tags,
    response: { 200: uploadSingleReply },
    querystring: uploadQuery,
    security: [{ token: [] }],
    summary: 'manager',
  },
};

export const uploadDeleteSchema: ISchema = {
  schema: {
    tags,
    response: { 200: baseReply },
    querystring: uploadQuery,
    params: baseParams,
    security: [{ token: [] }],
    summary: 'manager',
  },
};
