import { IManager } from 'mhz-types';

import { IFastifyInstance, IQuery } from '../interface/index.js';
import { managerService } from '../services/manager.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: IQuery }>(
    '/manager',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      try {
        const { data, total } = await managerService.getMany(request.query);

        reply.code(200).send({ data, total });
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.get<{ Params: { id: string } }>(
    '/manager/:id',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      try {
        const manager = await managerService.getOne(request.params.id);

        reply.code(200).send(manager);
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.patch<{ Body: IManager; Params: { id: string } }>(
    '/manager/:id',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      try {
        await managerService.update(request.params.id, request.body);

        reply.code(200).send({ message: 'Manager updated' });
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.post<{ Body: IManager }>(
    '/manager',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      try {
        await managerService.create(request.body);

        reply.code(201).send({ message: 'Manager created' });
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.delete<{ Params: { id: string } }>(
    '/manager/:id',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      try {
        await managerService.delete(request.params.id);

        reply.code(200).send({ message: 'Manager deleted' });
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );
}
