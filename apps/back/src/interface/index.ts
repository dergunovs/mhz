import { FastifyInstance } from 'fastify';

export interface IFastifyInstance extends FastifyInstance {
  checkAuth: () => void;
}
