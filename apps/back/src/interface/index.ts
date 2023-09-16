import { FastifyInstance } from 'fastify';
import { ObjectId, PopulateOptions } from 'mongoose';

export interface IFastifyInstance extends FastifyInstance {
  onlyManager: () => void;
  onlyCustomer: () => void;
  onlyLoggedIn: () => void;
}

export interface IQuery {
  page?: string;
  sort?: string;
  dir?: 'asc' | 'desc';
  category?: string | string[];
  manufacturer?: string | string[];
  price?: [string, string];
  fields?: [];
  select?: string;
  populate?: PopulateOptions[];
  initiator?: 'category' | 'manufacturer';
  customer?: ObjectId | string;
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

export interface ILoginData {
  email: string;
  password: string;
  role: TUserRole;
}

export type TInitiator = 'category' | 'manufacturer';
