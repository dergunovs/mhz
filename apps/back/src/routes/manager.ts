import { IManager } from 'mhz-types';
import { API_MANAGER } from 'mhz-contracts';

import { IFastifyInstance, IQuery, IBaseReply } from '../interface/index.js';
import { managerService } from '../services/manager.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: IQuery; Reply: { 200: { data: IManager[]; total: number } } }>(
    API_MANAGER,
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      const { data, total } = await managerService.getMany(request.query);

      reply.code(200).send({ data, total });
    }
  );

  fastify.get<{ Params: { id: string }; Reply: { 200: IManager | null } }>(
    `${API_MANAGER}/:id`,
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      const manager = await managerService.getOne(request.params.id);

      reply.code(200).send(manager);
    }
  );

  fastify.patch<{ Body: IManager; Params: { id: string }; Reply: { 200: IBaseReply } }>(
    `${API_MANAGER}/:id`,
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      await managerService.update(request.params.id, request.body);

      reply.code(200).send({ message: 'Manager updated' });
    }
  );

  fastify.post<{ Body: IManager; Reply: { 201: IBaseReply } }>(
    API_MANAGER,
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      await managerService.create(request.body);

      reply.code(201).send({ message: 'Manager created' });
    }
  );

  fastify.delete<{ Params: { id: string }; Reply: { 200: IBaseReply } }>(
    `${API_MANAGER}/:id`,
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      await managerService.delete(request.params.id);

      reply.code(200).send({ message: 'Manager deleted' });
    }
  );
}
