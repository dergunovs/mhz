import type { JSONSchemaType } from 'ajv';
import type { IOrder, TOrderStatus } from 'mhz-contracts';

import { baseParams, baseReply, queryParams } from './base.js';

const tags = ['Order'];

export const orderModel: JSONSchemaType<IOrder> = {
  $id: 'Order',
  type: 'object',
  properties: {
    _id: { type: 'string', nullable: true },
    dateCreated: { type: 'string', format: 'date-time', nullable: true },
    dateUpdated: { type: 'string', format: 'date-time', nullable: true },
    price: { type: 'number' },
    customer: { type: 'object', $ref: 'Customer', required: ['email'] },
    status: { type: 'string', enum: ['new', 'paid', 'cancelled', 'completed'] },
    products: {
      type: 'array',
      items: { type: 'object', $ref: 'CartItem', required: ['_id', 'product', 'count'] },
      nullable: true,
    },
  },
  required: ['price', 'status', 'customer'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const orderReply: JSONSchemaType<{ data: IOrder | null }> = {
  $id: 'OrderReply',
  type: 'object',
  properties: {
    data: { $ref: 'Order' },
  },
  required: ['data'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const ordersReply: JSONSchemaType<{ data: IOrder[]; total: number }> = {
  $id: 'OrdersReply',
  type: 'object',
  properties: {
    data: { type: 'array', items: orderModel },
    total: { type: 'number' },
  },
  required: ['data'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const orderCreateReply: JSONSchemaType<string> = {
  $id: 'OrderCreateReply',
  type: 'string',
  $schema: 'http://json-schema.org/draft-07/schema#',
};

export const ordersUpdateBody: JSONSchemaType<{ status: TOrderStatus }> = {
  $id: 'OrderUpdateBody',
  type: 'object',
  properties: {
    status: { type: 'string', enum: ['new', 'paid', 'cancelled', 'completed'] },
  },
  required: ['status'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const orderGetManySchema = {
  schema: { tags, response: { 200: ordersReply }, query: queryParams },
};

export const orderGetOneSchema = {
  schema: { tags, response: { 200: orderReply }, params: baseParams },
};

export const orderUpdateSchema = {
  schema: { tags, response: { 200: baseReply }, body: ordersUpdateBody, params: baseParams },
};

export const orderCreateSchema = {
  schema: { tags, response: { 201: orderCreateReply } },
};

export const orderDeleteSchema = {
  schema: { tags, response: { 200: baseReply }, params: baseParams },
};
