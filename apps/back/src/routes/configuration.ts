import { API_CONFIGURATION } from 'mhz-contracts';
import type { IQuery, IBaseReply, IConfiguration, IBaseParams } from 'mhz-contracts';

import { configurationService } from '../services/configuration.js';
import { IFastifyInstance } from '../interface/index.js';

const schema = { tags: ['Configuration'] };

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: IQuery; Reply: { 200: { data: IConfiguration[]; total?: number } } }>(
    API_CONFIGURATION,
    { preValidation: [fastify.onlyLoggedIn], schema },
    async function (request, reply) {
      const { data, total } = await configurationService.getMany<IConfiguration>(
        request.query,
        fastify.jwt.decode,
        request.headers.authorization
      );

      reply.code(200).send({ data, total });
    }
  );

  fastify.get<{
    Params: IBaseParams;
    Reply: {
      200: { data: IConfiguration | null; isConfigurationEditable?: boolean };
      '4xx': IBaseReply;
    };
  }>(`${API_CONFIGURATION}/:id`, { schema }, async function (request, reply) {
    const { data, isConfigurationEditable, isConfigurationSharable } =
      await configurationService.getOne<IConfiguration>(
        request.params.id,
        fastify.jwt.decode,
        request.headers.authorization
      );

    if (isConfigurationSharable) {
      reply.code(200).send({ data, isConfigurationEditable });
    } else {
      reply.code(403).send({ message: 'Forbidden' });
    }
  });

  fastify.patch<{ Body: IConfiguration; Params: IBaseParams; Reply: { 200: IBaseReply } }>(
    `${API_CONFIGURATION}/:id`,
    { preValidation: [fastify.onlyCustomer], schema },
    async function (request, reply) {
      await configurationService.update<IConfiguration>(request.body, request.params.id);

      reply.code(200).send({ message: 'Configuration updated' });
    }
  );

  fastify.post<{ Body: IConfiguration; Reply: { 201: IBaseReply } }>(
    API_CONFIGURATION,
    { preValidation: [fastify.onlyCustomer], schema },
    async function (request, reply) {
      await configurationService.create<IConfiguration>(request.body);

      reply.code(201).send({ message: 'Configuration created' });
    }
  );

  fastify.delete<{ Params: IBaseParams; Reply: { 200: IBaseReply; '4xx': IBaseReply } }>(
    `${API_CONFIGURATION}/:id`,
    { preValidation: [fastify.onlyLoggedIn], schema },
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
