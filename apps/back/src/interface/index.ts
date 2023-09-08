import { FastifyInstance } from 'fastify';
import { ObjectId, PopulateOptions } from 'mongoose';

export interface IFastifyInstance extends FastifyInstance {
  onlyManager: () => void;
  onlyCustomer: () => void;
}

export interface IQuery {
  page?: string;
  sort?: string;
  dir?: 'asc' | 'desc';
  category?: string | string[];
  manufacturer?: string | string[];
  price?: [string, string];
  fields?: [];
  populate?: PopulateOptions[];
  initiator?: 'category' | 'manufacturer';
}

export type TUserRole = 'customer' | 'manager';

export interface IUserToken {
  _id: ObjectId | string;
  email: string;
  role: TUserRole;
  firstName?: string;
  lastName?: string;
  iat?: number;
  exp?: number;
}
