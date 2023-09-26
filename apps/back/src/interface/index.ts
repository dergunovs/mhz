import type { FastifyInstance, FastifySchema } from 'fastify';

export interface IFastifyInstance extends FastifyInstance {
  onlyManager: () => void;
  onlyCustomer: () => void;
  onlyLoggedIn: () => void;
}

export interface ISchema {
  schema: FastifySchema;
}
