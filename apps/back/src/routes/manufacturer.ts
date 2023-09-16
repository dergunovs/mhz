import { IManufacturer } from 'mhz-types';

import { IBaseReply, IFastifyInstance, IQuery } from '../interface/index.js';
import { manufacturerService } from '../services/manufacturer.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: IQuery; Reply: { 200: { data: IManufacturer[]; total: number } } }>(
    '/manufacturer',
    async function (request, reply) {
      const { data, total } = await manufacturerService.getMany(request.query);

      reply.code(200).send({ data, total });
    }
  );

  fastify.get<{ Params: { id: string }; Reply: { 200: IManufacturer | null } }>(
    '/manufacturer/:id',
    async function (request, reply) {
      const manufacturer = await manufacturerService.getOne(request.params.id);

      reply.code(200).send(manufacturer);
    }
  );

  fastify.patch<{ Body: IManufacturer; Params: { id: string }; Reply: { 200: IBaseReply } }>(
    '/manufacturer/:id',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      await manufacturerService.update(request.params.id, request.body);

      reply.code(200).send({ message: 'Manufacturer updated' });
    }
  );

  fastify.post<{ Body: IManufacturer; Reply: { 201: IBaseReply } }>(
    '/manufacturer',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      await manufacturerService.create(request.body);

      reply.code(201).send({ message: 'Manufacturer created' });
    }
  );

  fastify.delete<{ Params: { id: string }; Reply: { 200: IBaseReply } }>(
    '/manufacturer/:id',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      await manufacturerService.delete(request.params.id);

      reply.code(200).send({ message: 'Manufacturer deleted' });
    }
  );
}
