import { IConfiguration } from 'mhz-types';

import { configurationService } from '../services/configuration.js';
import { IFastifyInstance, IQuery } from '../interface/index.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: IQuery }>(
    '/configuration',
    { preValidation: [fastify.onlyLoggedIn] },
    async function (request, reply) {
      try {
        const { data, total } = await configurationService.getMany(
          request.query,
          fastify.jwt.decode,
          request.headers.authorization
        );

        reply.code(200).send({ data, total });
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.get<{ Params: { id: string } }>('/configuration/:id', async function (request, reply) {
    try {
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
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.patch<{ Body: IConfiguration; Params: { id: string } }>(
    '/configuration/:id',
    { preValidation: [fastify.onlyCustomer] },
    async function (request, reply) {
      try {
        await configurationService.update(request.params.id, request.body);

        reply.code(200).send({ message: 'Configuration updated' });
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.post<{ Body: IConfiguration }>(
    '/configuration',
    { preValidation: [fastify.onlyCustomer] },
    async function (request, reply) {
      try {
        await configurationService.create(request.body);

        reply.code(201).send({ message: 'Configuration created' });
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.delete<{ Params: { id: string } }>(
    '/configuration/:id',
    { preValidation: [fastify.onlyLoggedIn] },
    async function (request, reply) {
      try {
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
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );
}
