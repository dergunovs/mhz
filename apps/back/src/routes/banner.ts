import { API_BANNER_ACTIVE, API_BANNER } from 'mhz-contracts';
import type { IQuery, IBaseReply, IFilterData, IBanner, IBaseParams } from 'mhz-contracts';

import { IFastifyInstance } from '../interface/index.js';
import { bannerService } from '../services/banner.js';
import {
  bannerGetManySchema,
  bannerGetActiveSchema,
  bannerGetOneSchema,
  bannerUpdateSchema,
  bannerCreateSchema,
  bannerDeleteSchema,
} from '../schemas/banner.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: IQuery; Reply: { 200: { data: IBanner[]; total?: number; filters?: IFilterData } } }>(
    API_BANNER,
    bannerGetManySchema,
    async function (request, reply) {
      const { data, total, filters } = await bannerService.getMany<IBanner>(request.query);

      reply.code(200).send({ data, total, filters });
    }
  );

  fastify.get<{ Reply: { 200: IBanner[] } }>(API_BANNER_ACTIVE, bannerGetActiveSchema, async function (request, reply) {
    const data = await bannerService.getActive<IBanner>();

    reply.code(200).send(data);
  });

  fastify.get<{ Params: IBaseParams; Reply: { 200: { data: IBanner | null } } }>(
    `${API_BANNER}/:id`,
    bannerGetOneSchema,
    async function (request, reply) {
      const data = await bannerService.getOne<IBanner>(
        request.params.id,
        fastify.jwt.decode,
        request.headers.authorization
      );

      reply.code(200).send(data);
    }
  );

  fastify.patch<{ Body: IBanner; Params: IBaseParams; Reply: { 200: IBaseReply } }>(
    `${API_BANNER}/:id`,
    { preValidation: [fastify.onlyManager], ...bannerUpdateSchema },
    async function (request, reply) {
      await bannerService.update<IBanner>(request.body, request.params.id);

      reply.code(200).send({ message: 'Banner updated' });
    }
  );

  fastify.post<{ Body: IBanner; Reply: { 201: IBaseReply } }>(
    API_BANNER,
    { preValidation: [fastify.onlyManager], ...bannerCreateSchema },
    async function (request, reply) {
      await bannerService.create<IBanner>(request.body);

      reply.code(201).send({ message: 'Banner created' });
    }
  );

  fastify.delete<{ Params: IBaseParams; Reply: { 200: IBaseReply } }>(
    `${API_BANNER}/:id`,
    { preValidation: [fastify.onlyManager], ...bannerDeleteSchema },
    async function (request, reply) {
      await bannerService.delete(request.params.id);

      reply.code(200).send({ message: 'Banner deleted' });
    }
  );
}
