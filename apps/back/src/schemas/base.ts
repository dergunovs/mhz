import type { JSONSchema, FromSchema } from 'json-schema-to-ts';

export const baseResponse = {
  type: 'object',
  required: ['message'],
  additionalProperties: false,
  properties: { message: { type: 'string' } },
} as const satisfies JSONSchema;

export type TBaseResponse = FromSchema<typeof baseResponse>;
