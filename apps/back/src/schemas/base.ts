import type { JSONSchemaType } from 'ajv';
import type { IBaseParams, IBaseReply, IEntity, IQuery } from 'mhz-contracts';

export const entityModel: JSONSchemaType<IEntity> = {
  $id: 'Entity',
  type: 'object',
  properties: {
    _id: { type: 'string', nullable: true },
    dateCreated: { type: 'string', format: 'date-time', nullable: true },
    dateUpdated: { type: 'string', format: 'date-time', nullable: true },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const baseReply: JSONSchemaType<IBaseReply> = {
  $id: 'BaseReply',
  type: 'object',
  required: ['message'],
  properties: {
    message: { type: 'string' },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const baseParams: JSONSchemaType<IBaseParams> = {
  $id: 'BaseParams',
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'string' },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const queryParams: JSONSchemaType<IQuery> = {
  $id: 'QueryParams',
  type: 'object',
  properties: {
    page: { type: 'string', nullable: true },
    sort: { type: 'string', nullable: true },
    dir: { enum: ['asc', 'desc'], type: 'string', nullable: true },
    category: { type: 'string', nullable: true },
    manufacturer: { type: 'string', nullable: true },
    price: {
      type: 'array',
      items: [{ type: 'string' }, { type: 'string' }],
      minItems: 2,
      maxItems: 2,
      nullable: true,
    },
    fields: { type: 'array', items: { type: 'string' }, nullable: true },
    initiator: { enum: ['category', 'manufacturer'], type: 'string', nullable: true },
    customer: { type: 'string', nullable: true },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};
