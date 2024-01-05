import type { JSONSchemaType } from 'ajv';
import type { IEntitiesCount, IEntitiesReply } from 'mhz-contracts';

import { ISchema } from '../interface/index.js';

const tags = ['Stats'];

export const statsCountModel: JSONSchemaType<IEntitiesCount> = {
  $id: 'StatsCount',
  type: 'object',
  properties: {
    labels: { type: 'array', items: { type: 'string' } },
    data: { type: 'array', items: { type: 'number' } },
  },
  required: ['labels', 'data'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const statsCountReply: JSONSchemaType<IEntitiesReply> = {
  $id: 'StatsCountReply',
  type: 'object',
  properties: {
    base: { type: 'object', $ref: 'StatsCount', required: ['labels', 'data'] },
    categories: { type: 'object', $ref: 'StatsCount', required: ['labels', 'data'] },
    manufacturers: { type: 'object', $ref: 'StatsCount', required: ['labels', 'data'] },
  },
  required: ['base', 'categories', 'manufacturers'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const statsCountSchema: ISchema = {
  schema: { tags, response: { 200: statsCountReply }, security: [{ token: [] }], summary: 'manager' },
};
