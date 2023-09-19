import { FastifyInstance } from 'fastify';

export interface IFastifyInstance extends FastifyInstance {
  onlyManager: () => void;
  onlyCustomer: () => void;
  onlyLoggedIn: () => void;
}
