import type { JSONSchema, FromSchema } from 'json-schema-to-ts';

const tags = ['Category'];

export const categoryScheme = {
  $id: 'category',
  type: 'object',
  required: ['title', 'iconUrl'],
  additionalProperties: false,
  properties: {
    _id: { type: 'string' },
    title: { type: 'string' },
    description: { type: 'string' },
    iconUrl: { type: 'string' },
    fields: {
      type: 'array',
      items: {
        type: 'object',
        required: ['title', 'fieldType', 'fieldValue'],
        additionalProperties: false,
        properties: {
          title: { type: 'string' },
          fieldType: { enum: ['string', 'number', 'boolean'] },
          fieldValue: { anyOf: [{ type: 'string' }, { type: 'boolean' }, { type: 'number' }] },
          fieldUnits: { type: 'string' },
        },
      },
    },
    dateCreated: { type: 'string', format: 'date-time' },
    dateUpdated: { type: 'string', format: 'date-time' },
  },
} as const satisfies JSONSchema;

export const categoriesScheme = {
  type: 'array',
  items: { $ref: 'category' },
} as const satisfies JSONSchema;

export const categoryParams = {
  type: 'object',
  required: ['id'],
  additionalProperties: false,
  properties: {
    id: { type: 'string' },
  },
} as const satisfies JSONSchema;

export type TCategory = FromSchema<
  typeof categoryScheme,
  { deserialize: [{ pattern: { type: 'string'; format: 'date-time' }; output: Date }] }
>;

export type TCategoryParams = FromSchema<typeof categoryParams>;

export const categoryGetManyScheme = {
  schema: { tags, response: { 200: categoriesScheme } },
};

export const categoryGetOneScheme = {
  schema: { tags, response: { 200: categoryScheme }, params: categoryParams },
};
