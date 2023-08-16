import { FastifyInstance } from 'fastify';

export interface IFastifyInstance extends FastifyInstance {
  checkAuth: () => void;
}

export interface IQuery {
  page: string;
  sort?: string;
  dir?: 'asc' | 'desc';
}
