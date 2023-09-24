import type { JSONSchemaType } from 'ajv';
import type { TUserRole, IUserToken, ILoginData, ISignUpData } from 'mhz-contracts';

import { baseReply } from './base.js';

const tags = ['Auth'];

export const userRoleModel: JSONSchemaType<TUserRole> = {
  $id: 'UserRole',
  enum: ['customer', 'manager'],
  type: 'string',
  $schema: 'http://json-schema.org/draft-07/schema#',
};

export const userTokenModel: JSONSchemaType<IUserToken> = {
  $id: 'UserToken',
  type: 'object',
  properties: {
    _id: { type: 'string' },
    email: { type: 'string' },
    role: { $ref: 'UserRole' },
    firstName: { type: 'string', nullable: true },
    lastName: { type: 'string', nullable: true },
    token: { type: 'string', nullable: true },
  },
  required: ['_id', 'email', 'role'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const loginDataModel: JSONSchemaType<ILoginData> = {
  $id: 'LoginData',
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
    role: { $ref: 'UserRole' },
  },
  required: ['email', 'password', 'role'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const signUpDataModel: JSONSchemaType<ISignUpData> = {
  $id: 'SignUpData',
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['email', 'firstName', 'lastName', 'password'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const authCheckSchema = {
  schema: { tags, response: { 200: baseReply } },
};

export const authLoginSchema = {
  schema: { tags, response: { 200: userTokenModel }, body: loginDataModel },
};

export const authSignUpSchema = {
  schema: { tags, response: { 201: baseReply }, body: signUpDataModel },
};
