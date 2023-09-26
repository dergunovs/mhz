import type { JSONSchemaType } from 'ajv';
import type { ICartItem, ICustomer, IProduct, IProductWatched } from 'mhz-contracts';

import { ISchema } from '../interface/index.js';
import { baseParams, baseReply, queryParams } from './base.js';
import { signUpDataModel } from './auth.js';

const tags = ['Customer'];

export const customerModel: JSONSchemaType<ICustomer> = {
  $id: 'Customer',
  type: 'object',
  properties: {
    _id: { type: 'string', nullable: true },
    dateCreated: { type: 'string', format: 'date-time', nullable: true },
    dateUpdated: { type: 'string', format: 'date-time', nullable: true },
    password: { type: 'string', nullable: true },
    email: { type: 'string' },
    firstName: { type: 'string', nullable: true },
    lastName: { type: 'string', nullable: true },
    dateLoggedIn: { type: 'string', format: 'date-time', nullable: true },
    cart: {
      type: 'array',
      items: { type: 'object', $ref: 'CartItem', required: ['_id', 'count', 'product'] },
      nullable: true,
    },
    orders: {
      type: 'array',
      items: { type: 'object', $ref: 'Order', required: ['status', 'price'] },
      nullable: true,
    },
    favouriteProducts: {
      type: 'array',
      items: {
        type: 'object',
        $ref: 'Product',
        required: ['title', 'price', 'thumbUrls', 'category'],
      },
      nullable: true,
    },
    configurations: {
      type: 'array',
      items: { type: 'object', $ref: 'Configuration', required: ['title'] },
      nullable: true,
    },
    watchedProducts: {
      type: 'array',
      items: { type: 'object', $ref: 'ProductWatched', required: ['_id', 'product', 'dateCreated'] },
      nullable: true,
    },
  },
  required: ['email'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const cartItemModel: JSONSchemaType<ICartItem> = {
  $id: 'CartItem',
  type: 'object',
  properties: {
    _id: { type: 'string' },
    product: { $ref: 'Product' },
    count: { type: 'number' },
  },
  required: ['_id', 'product', 'count'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const customerReply: JSONSchemaType<{ data: ICustomer | null }> = {
  $id: 'CustomerReply',
  type: 'object',
  properties: {
    data: { $ref: 'Customer' },
  },
  required: ['data'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const customersReply: JSONSchemaType<{ data: ICustomer[]; total: number }> = {
  $id: 'CustomersReply',
  type: 'object',
  properties: {
    data: { type: 'array', items: customerModel },
    total: { type: 'number' },
  },
  required: ['data'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const cartReply: JSONSchemaType<ICartItem[]> = {
  $id: 'CartItems',
  type: 'array',
  items: cartItemModel,
  $schema: 'http://json-schema.org/draft-07/schema#',
};

export const productWatchedModel: JSONSchemaType<IProductWatched> = {
  $id: 'ProductWatched',
  type: 'object',
  properties: {
    _id: { type: 'string' },
    dateCreated: { type: 'string', format: 'date-time' },
    dateUpdated: { type: 'string', format: 'date-time', nullable: true },
    product: { type: 'object', $ref: 'Product', required: ['title', 'price', 'thumbUrls', 'category'] },
  },
  required: ['_id', 'dateCreated', 'product'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const watchedReply: JSONSchemaType<IProduct[]> = {
  $id: 'ProductsWatched',
  type: 'array',
  items: { type: 'object', $ref: 'Product', required: ['title', 'price', 'thumbUrls', 'category'] },
  $schema: 'http://json-schema.org/draft-07/schema#',
};

export const favouritesReply: JSONSchemaType<IProduct[]> = {
  $id: 'ProductsFavourites',
  type: 'array',
  items: {
    type: 'object',
    $ref: 'Product',
    required: ['title', 'price', 'thumbUrls', 'category'],
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
};

export const updateCartBody: JSONSchemaType<{ _id: string; count: string }> = {
  $id: 'UpdateCartBody',
  type: 'object',
  properties: {
    _id: { type: 'string' },
    count: { type: 'string' },
  },
  required: ['_id', 'count'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const addToCartBody: JSONSchemaType<{ _id: string | string[] }> = {
  $id: 'UpdateCartBody',
  type: 'object',
  properties: {
    _id: { anyOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }] },
  },
  required: ['_id'],
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
};

export const customerGetManySchema: ISchema = {
  schema: {
    tags,
    response: { 200: customersReply },
    querystring: queryParams,
    security: [{ token: [] }],
    summary: 'manager',
  },
};

export const customerGetOneSchema: ISchema = {
  schema: { tags, response: { 200: customerReply }, params: baseParams, security: [{ token: [] }], summary: 'manager' },
};

export const customerGetCurrentSchema: ISchema = {
  schema: { tags, response: { 200: customerModel }, security: [{ token: [] }], summary: 'customer' },
};

export const customerGetCartSchema: ISchema = {
  schema: { tags, response: { 200: cartReply }, security: [{ token: [] }], summary: 'customer' },
};

export const customerGetWatchedSchema: ISchema = {
  schema: { tags, response: { 200: watchedReply }, security: [{ token: [] }], summary: 'customer' },
};

export const customerGetFavouritesSchema: ISchema = {
  schema: { tags, response: { 200: favouritesReply }, security: [{ token: [] }], summary: 'customer' },
};

export const customerUpdateSchema: ISchema = {
  schema: { tags, response: { 200: baseReply }, body: customerReply, security: [{ token: [] }], summary: 'customer' },
};

export const customerUpdateCartSchema: ISchema = {
  schema: { tags, response: { 200: baseReply }, body: updateCartBody, security: [{ token: [] }], summary: 'customer' },
};

export const customerCreateSchema: ISchema = {
  schema: { tags, response: { 201: baseReply }, body: signUpDataModel },
};

export const customerAddToCartSchema: ISchema = {
  schema: { tags, response: { 201: baseReply }, body: addToCartBody, security: [{ token: [] }], summary: 'customer' },
};

export const customerCreteFavouriteSchema: ISchema = {
  schema: { tags, response: { 201: baseReply }, body: baseParams, security: [{ token: [] }], summary: 'customer' },
};

export const customerDeleteSchema: ISchema = {
  schema: { tags, response: { 200: baseReply }, security: [{ token: [] }], summary: 'customer' },
};

export const customerDeleteFavouriteSchema: ISchema = {
  schema: { tags, response: { 200: baseReply }, params: baseParams, security: [{ token: [] }], summary: 'customer' },
};

export const customerDeleteFromCartSchema: ISchema = {
  schema: { tags, response: { 200: baseReply }, params: baseParams, security: [{ token: [] }], summary: 'customer' },
};
