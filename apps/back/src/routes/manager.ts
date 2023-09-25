import { API_MANAGER } from 'mhz-contracts';
import type { IQuery, IBaseReply, IManager, IBaseParams, ISignUpData } from 'mhz-contracts';

import { IFastifyInstance } from '../interface/index.js';
import { managerService } from '../services/manager.js';
import {
  managerGetManySchema,
  managerGetOneSchema,
  managerUpdateSchema,
  managerCreateSchema,
  managerDeleteSchema,
} from '../schemas/manager.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: IQuery; Reply: { 200: { data: IManager[]; total?: number } } }>(
    API_MANAGER,
    { preValidation: [fastify.onlyManager], ...managerGetManySchema },
    async function (request, reply) {
      const { data, total } = await managerService.getMany<IManager>(request.query);

      reply.code(200).send({ data, total });
    }
  );

  fastify.get<{ Params: IBaseParams; Reply: { 200: { data: IManager | null } } }>(
    `${API_MANAGER}/:id`,
    { preValidation: [fastify.onlyManager], ...managerGetOneSchema },
    async function (request, reply) {
      const data = await managerService.getOne<IManager>(request.params.id);

      reply.code(200).send(data);
    }
  );

  fastify.patch<{ Body: IManager; Params: IBaseParams; Reply: { 200: IBaseReply } }>(
    `${API_MANAGER}/:id`,
    { preValidation: [fastify.onlyManager], ...managerUpdateSchema },
    async function (request, reply) {
      await managerService.update<IManager>(request.body, request.params.id);

      reply.code(200).send({ message: 'Manager updated' });
    }
  );

  fastify.post<{ Body: ISignUpData; Reply: { 201: IBaseReply } }>(
    API_MANAGER,
    { preValidation: [fastify.onlyManager], ...managerCreateSchema },
    async function (request, reply) {
      await managerService.create<ISignUpData>(request.body);

      reply.code(201).send({ message: 'Manager created' });
    }
  );

  fastify.delete<{ Params: IBaseParams; Reply: { 200: IBaseReply } }>(
    `${API_MANAGER}/:id`,
    { preValidation: [fastify.onlyManager], ...managerDeleteSchema },
    async function (request, reply) {
      await managerService.delete(request.params.id);

      reply.code(200).send({ message: 'Manager deleted' });
    }
  );
}
