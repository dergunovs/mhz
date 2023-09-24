import type { JSONSchemaType } from 'ajv';
import type { TCategoryFieldType, ICategoryField, ICategory } from 'mhz-contracts';

export const categoryFieldTypeSchema: JSONSchemaType<TCategoryFieldType> = {
  $id: 'categoryFieldType',
  enum: ['boolean', 'number', 'string'],
  type: 'string',
  $schema: 'http://json-schema.org/draft-07/schema#',
};

export const categoryFieldSchema: JSONSchemaType<ICategoryField> = {
  $id: 'categoryField',
  type: 'object',
  properties: {
    _id: { type: 'string', nullable: true },
    dateCreated: { type: 'string', format: 'date-time', nullable: true },
    dateUpdated: { type: 'string', format: 'date-time', nullable: true },
    title: { type: 'string' },
    fieldType: { $ref: 'categoryFieldType' },
    fieldValue: { type: ['string', 'number', 'boolean'] },
    fieldUnits: { type: 'string', nullable: true },
  },
  required: ['title', 'fieldType', 'fieldValue'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const categorySchema: JSONSchemaType<ICategory> = {
  $id: 'category',
  type: 'object',
  properties: {
    _id: { type: 'string', nullable: true },
    dateCreated: { type: 'string', format: 'date-time', nullable: true },
    dateUpdated: { type: 'string', format: 'date-time', nullable: true },
    title: { type: 'string' },
    iconUrl: { type: 'string' },
    description: { type: 'string', nullable: true },
    fields: { type: 'array', items: categoryFieldSchema, nullable: true },
    views: { type: 'number', nullable: true },
  },
  required: ['iconUrl', 'title'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};
