import { IConfiguration } from 'mhz-types';
import { API_CONFIGURATION } from 'mhz-contracts';

import { configurationService } from '../services/configuration.js';
import { IFastifyInstance, IQuery, IBaseReply } from '../interface/index.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: IQuery; Reply: { 200: { data: IConfiguration[]; total: number } } }>(
    API_CONFIGURATION,
    { preValidation: [fastify.onlyLoggedIn] },
    async function (request, reply) {
      const { data, total } = await configurationService.getMany(
        request.query,
        fastify.jwt.decode,
        request.headers.authorization
      );

      reply.code(200).send({ data, total });
    }
  );

  fastify.get<{
    Params: { id: string };
    Reply: {
      200: { configuration: IConfiguration | null; isEditable: boolean };
      '4xx': IBaseReply;
    };
  }>(`${API_CONFIGURATION}/:id`, async function (request, reply) {
    const { configuration, isEditable, isSharable } = await configurationService.getOne(
      request.params.id,
      fastify.jwt.decode,
      request.headers.authorization
    );

    if (isSharable) {
      reply.code(200).send({ configuration, isEditable });
    } else {
      reply.code(403).send({ message: 'Forbidden' });
    }
  });

  fastify.patch<{ Body: IConfiguration; Params: { id: string }; Reply: { 200: IBaseReply } }>(
    `${API_CONFIGURATION}/:id`,
    { preValidation: [fastify.onlyCustomer] },
    async function (request, reply) {
      await configurationService.update(request.params.id, request.body);

      reply.code(200).send({ message: 'Configuration updated' });
    }
  );

  fastify.post<{ Body: IConfiguration; Reply: { 201: IBaseReply } }>(
    API_CONFIGURATION,
    { preValidation: [fastify.onlyCustomer] },
    async function (request, reply) {
      await configurationService.create(request.body);

      reply.code(201).send({ message: 'Configuration created' });
    }
  );

  fastify.delete<{ Params: { id: string }; Reply: { 200: IBaseReply; '4xx': IBaseReply } }>(
    `${API_CONFIGURATION}/:id`,
    { preValidation: [fastify.onlyLoggedIn] },
    async function (request, reply) {
      const isDeletable = await configurationService.delete(
        request.params.id,
        fastify.jwt.decode,
        request.headers.authorization
      );

      if (isDeletable) {
        reply.code(200).send({ message: 'Configuration deleted' });
      } else {
        reply.code(403).send({ message: 'Forbidden' });
      }
    }
  );
}
