import { API_CATEGORY, API_CATEGORY_POPULAR } from 'mhz-contracts';
import type { IQuery, IBaseReply, ICategory, IBaseParams } from 'mhz-contracts';

import { IFastifyInstance } from '../interface/index.js';
import { categoryService } from '../services/category.js';
import {
  categoryGetManySchema,
  categoryGetPopularSchema,
  categoryGetOneSchema,
  categoryUpdateSchema,
  categoryCreateSchema,
  categoryDeleteSchema,
} from '../schemas/category.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: IQuery; Reply: { 200: { data: ICategory[] } } }>(
    API_CATEGORY,
    categoryGetManySchema,
    async function (request, reply) {
      const data = await categoryService.getMany<ICategory>();

      reply.code(200).send(data);
    }
  );

  fastify.get<{ Reply: { 200: ICategory[] } }>(
    API_CATEGORY_POPULAR,
    categoryGetPopularSchema,
    async function (request, reply) {
      const data = await categoryService.getPopular<ICategory>();

      reply.code(200).send(data);
    }
  );

  fastify.get<{ Params: IBaseParams; Reply: { 200: { data: ICategory | null } } }>(
    `${API_CATEGORY}/:id`,
    categoryGetOneSchema,
    async function (request, reply) {
      const data = await categoryService.getOne<ICategory>(request.params.id);

      reply.code(200).send(data);
    }
  );

  fastify.patch<{ Body: ICategory; Params: IBaseParams; Reply: { 200: IBaseReply } }>(
    `${API_CATEGORY}/:id`,
    { preValidation: [fastify.onlyManager], ...categoryUpdateSchema },
    async function (request, reply) {
      await categoryService.update<ICategory>(request.body, request.params.id);

      reply.code(200).send({ message: 'Category updated' });
    }
  );

  fastify.post<{ Body: ICategory; Reply: { 201: IBaseReply; '5xx': IBaseReply } }>(
    API_CATEGORY,
    { preValidation: [fastify.onlyManager], ...categoryCreateSchema },
    async function (request, reply) {
      const isReachedLimit = await categoryService.create<ICategory>(request.body);

      if (isReachedLimit) {
        reply.code(500).send({ message: 'You have reached maximum categories count' });
      } else {
        reply.code(201).send({ message: 'Category created' });
      }
    }
  );

  fastify.delete<{ Params: IBaseParams; Reply: { 200: IBaseReply } }>(
    `${API_CATEGORY}/:id`,
    { preValidation: [fastify.onlyManager], ...categoryDeleteSchema },
    async function (request, reply) {
      await categoryService.delete(request.params.id);

      reply.code(200).send({ message: 'Category deleted' });
    }
  );
}
