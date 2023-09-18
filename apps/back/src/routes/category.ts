import {
  API_CATEGORY,
  categoryScheme,
  categoryGetManyScheme,
  categoryGetOneScheme,
  categoryUpdateOneScheme,
  categoryCreateScheme,
  categoryDeleteScheme,
} from 'mhz-contracts';
import type { TBaseReply, TCategory, TCategoryParams } from 'mhz-contracts';

import { IFastifyInstance, IQuery } from '../interface/index.js';
import { categoryService } from '../services/category.js';

export default async function (fastify: IFastifyInstance) {
  fastify.addSchema(categoryScheme);

  fastify.get<{ Querystring: IQuery; Reply: { 200: TCategory[] } }>(
    API_CATEGORY,
    categoryGetManyScheme,
    async function (request, reply) {
      const categories = await categoryService.getMany();

      reply.code(200).send(categories);
    }
  );

  fastify.get<{ Params: TCategoryParams; Reply: { 200: TCategory | null; '4xx': TBaseReply } }>(
    `${API_CATEGORY}/:id`,
    categoryGetOneScheme,
    async function (request, reply) {
      const { category, isNotValidId } = await categoryService.getOne(request.params.id);

      if (isNotValidId) {
        reply.code(404).send({ message: 'Not Valid id' });
      } else {
        reply.code(200).send(category);
      }
    }
  );

  fastify.patch<{ Body: TCategory; Params: TCategoryParams; Reply: { 200: TBaseReply; '4xx': TBaseReply } }>(
    `${API_CATEGORY}/:id`,
    { preValidation: [fastify.onlyManager], ...categoryUpdateOneScheme },
    async function (request, reply) {
      const { isNotValidId } = await categoryService.update(request.params.id, request.body);

      if (isNotValidId) {
        reply.code(404).send({ message: 'Not Valid id' });
      } else {
        reply.code(200).send({ message: 'Category updated' });
      }
    }
  );

  fastify.post<{ Body: TCategory; Reply: { 201: TBaseReply; '5xx': TBaseReply } }>(
    API_CATEGORY,
    { preValidation: [fastify.onlyManager], ...categoryCreateScheme },
    async function (request, reply) {
      const isReachedLimit = await categoryService.create(request.body);

      if (isReachedLimit) {
        reply.code(500).send({ message: 'You have reached maximum categories count' });
      } else {
        reply.code(201).send({ message: 'Category created' });
      }
    }
  );

  fastify.delete<{ Params: TCategoryParams; Reply: { 200: TBaseReply; '4xx': TBaseReply } }>(
    `${API_CATEGORY}/:id`,
    { preValidation: [fastify.onlyManager], ...categoryDeleteScheme },
    async function (request, reply) {
      const { isNotValidId } = await categoryService.delete(request.params.id);

      if (isNotValidId) {
        reply.code(404).send({ message: 'Not Valid id' });
      } else {
        reply.code(200).send({ message: 'Category deleted' });
      }
    }
  );
}
