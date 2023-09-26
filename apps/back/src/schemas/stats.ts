import type { JSONSchemaType } from 'ajv';
import type { IEntitiesCount } from 'mhz-contracts';

import { ISchema } from '../interface/index.js';

const tags = ['Stats'];

export const statsCountModel: JSONSchemaType<IEntitiesCount> = {
  $id: 'StatsCount',
  type: 'object',
  properties: {
    products: { type: 'number' },
    categories: { type: 'number' },
    manufacturers: { type: 'number' },
    managers: { type: 'number' },
    customers: { type: 'number' },
    orders: { type: 'number' },
  },
  required: ['products', 'categories', 'manufacturers', 'managers', 'customers', 'orders'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const statsCountSchema: ISchema = {
  schema: { tags, response: { 200: statsCountModel }, security: [{ token: [] }], summary: 'manager' },
};