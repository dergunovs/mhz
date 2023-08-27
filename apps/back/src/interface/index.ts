import { FastifyInstance } from 'fastify';
import { ObjectId } from 'mongoose';

export interface IFastifyInstance extends FastifyInstance {
  checkAuth: () => void;
}

export interface IQuery {
  page: string;
  sort?: string;
  dir?: 'asc' | 'desc';
  filter?: string;
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
