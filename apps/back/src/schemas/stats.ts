import type { JSONSchemaType } from 'ajv';
import type { IEntitiesCount, IEntitiesCountDataset, IEntitiesReply } from 'mhz-contracts';

import { ISchema } from '../interface/index.js';

const tags = ['Stats'];

export const datasetModel: JSONSchemaType<IEntitiesCountDataset> = {
  $id: 'Dataset',
  type: 'object',
  properties: {
    label: { type: 'string', nullable: true },
    data: { type: 'array', items: { type: 'number' } },
  },
  required: ['data'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const statsCountModel: JSONSchemaType<IEntitiesCount> = {
  $id: 'StatsCount',
  type: 'object',
  properties: {
    labels: { type: 'array', items: { type: 'string' } },
    datasets: { type: 'array', items: { type: 'object', $ref: 'Dataset', required: ['data'] } },
  },
  required: ['labels', 'datasets'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const statsCountReply: JSONSchemaType<IEntitiesReply> = {
  $id: 'StatsCountReply',
  type: 'object',
  properties: {
    base: { type: 'object', $ref: 'StatsCount', required: ['labels', 'datasets'] },
    categories: { type: 'object', $ref: 'StatsCount', required: ['labels', 'datasets'] },
    manufacturers: { type: 'object', $ref: 'StatsCount', required: ['labels', 'datasets'] },
  },
  required: ['base', 'categories', 'manufacturers'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const statsCountSchema: ISchema = {
  schema: { tags, response: { 200: statsCountReply }, security: [{ token: [] }], summary: 'manager' },
};
