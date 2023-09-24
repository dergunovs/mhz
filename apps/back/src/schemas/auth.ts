import type { JSONSchemaType } from 'ajv';
import type { TUserRole, IUserToken, ILoginData, ISignUpData } from 'mhz-contracts';

export const userRoleSchema: JSONSchemaType<TUserRole> = {
  $id: 'userRole',
  enum: ['customer', 'manager'],
  type: 'string',
  $schema: 'http://json-schema.org/draft-07/schema#',
};

export const userTokenSchema: JSONSchemaType<IUserToken> = {
  $id: 'userToken',
  type: 'object',
  properties: {
    _id: { type: 'string' },
    email: { type: 'string' },
    role: { $ref: 'userRole' },
    firstName: { type: 'string', nullable: true },
    lastName: { type: 'string', nullable: true },
    token: { type: 'string', nullable: true },
  },
  required: ['_id', 'email', 'role'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const loginDataSchema: JSONSchemaType<ILoginData> = {
  $id: 'loginData',
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
    role: { $ref: 'userRole' },
  },
  required: ['email', 'password', 'role'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const signUpDataSchema: JSONSchemaType<ISignUpData> = {
  $id: 'signUpData',
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
