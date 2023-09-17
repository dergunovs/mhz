import type { JSONSchema, FromSchema } from 'json-schema-to-ts';

import { baseResponse } from './base.js';

const tags = ['Auth'];

export const loginResponse = {
  type: 'object',
  required: ['_id', 'email', 'role', 'firstName', 'lastName', 'token'],
  additionalProperties: false,
  properties: {
    _id: { type: 'string' },
    email: { type: 'string' },
    role: { enum: ['customer', 'manager'] },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    token: { type: 'string' },
  },
} as const satisfies JSONSchema;

export const loginBody = {
  type: 'object',
  required: ['email', 'password', 'role'],
  additionalProperties: false,
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
    role: { enum: ['customer', 'manager'] },
  },
} as const satisfies JSONSchema;

export const setupBody = {
  type: 'object',
  required: ['email', 'password', 'role'],
  additionalProperties: false,
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
  },
} as const satisfies JSONSchema;

export type TAuthLoginResponse = FromSchema<typeof loginResponse>;
export type TAuthLoginBody = FromSchema<typeof loginBody>;
export type TAuthSetupBody = FromSchema<typeof setupBody>;

export const authCheckSchema = {
  schema: { tags, response: { 200: baseResponse } },
};

export const authLoginSchema = {
  schema: { tags, response: { 200: loginResponse }, body: loginBody },
};

export const authSetupSchema = {
  schema: { tags, response: { 201: baseResponse }, body: setupBody },
};
