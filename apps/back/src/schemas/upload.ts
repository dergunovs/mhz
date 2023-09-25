import type { JSONSchemaType } from 'ajv';
import type { IUploadQuery } from 'mhz-contracts';

import { baseParams, baseReply } from './base.js';

const tags = ['Upload'];

export const uploadQueryModel: JSONSchemaType<IUploadQuery> = {
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

export const uploadMultipleSchema = {
  schema: { tags, response: { 200: uploadMultipleReply }, query: uploadQueryModel },
};

export const uploadSingleSchema = {
  schema: { tags, response: { 200: uploadSingleReply }, query: uploadQueryModel },
};

export const uploadDeleteSchema = {
  schema: { tags, response: { 200: baseReply }, query: uploadQueryModel, params: baseParams },
};
