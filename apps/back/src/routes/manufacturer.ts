import { API_MANUFACTURER } from 'mhz-contracts';
import type { IQuery, IBaseReply, IManufacturer, IBaseParams } from 'mhz-contracts';

import { IFastifyInstance } from '../interface/index.js';
import { manufacturerService } from '../services/manufacturer.js';
import {
  manufacturerModel,
  manufacturerGetManySchema,
  manufacturerGetOneSchema,
  manufacturerUpdateSchema,
  manufacturerCreateSchema,
  manufacturerDeleteSchema,
} from '../schemas/manufacturer.js';

export default async function (fastify: IFastifyInstance) {
  fastify.addSchema(manufacturerModel);

  fastify.get<{ Querystring: IQuery; Reply: { 200: { data: IManufacturer[]; total?: number } } }>(
    API_MANUFACTURER,
    manufacturerGetManySchema,
    async function (request, reply) {
      const { data, total } = await manufacturerService.getMany<IManufacturer>(request.query);

      reply.code(200).send({ data, total });
    }
  );

  fastify.get<{ Params: IBaseParams; Reply: { 200: { data: IManufacturer | null } } }>(
    `${API_MANUFACTURER}/:id`,
    manufacturerGetOneSchema,
    async function (request, reply) {
      const data = await manufacturerService.getOne<IManufacturer>(request.params.id);

      reply.code(200).send(data);
    }
  );

  fastify.patch<{ Body: IManufacturer; Params: IBaseParams; Reply: { 200: IBaseReply } }>(
    `${API_MANUFACTURER}/:id`,
    { preValidation: [fastify.onlyManager], ...manufacturerUpdateSchema },
    async function (request, reply) {
      await manufacturerService.update<IManufacturer>(request.body, request.params.id);

      reply.code(200).send({ message: 'Manufacturer updated' });
    }
  );

  fastify.post<{ Body: IManufacturer; Reply: { 201: IBaseReply } }>(
    API_MANUFACTURER,
    { preValidation: [fastify.onlyManager], ...manufacturerCreateSchema },
    async function (request, reply) {
      await manufacturerService.create<IManufacturer>(request.body);

      reply.code(201).send({ message: 'Manufacturer created' });
    }
  );

  fastify.delete<{ Params: IBaseParams; Reply: { 200: IBaseReply } }>(
    `${API_MANUFACTURER}/:id`,
    { preValidation: [fastify.onlyManager], ...manufacturerDeleteSchema },
    async function (request, reply) {
      await manufacturerService.delete(request.params.id);

      reply.code(200).send({ message: 'Manufacturer deleted' });
    }
  );
}
