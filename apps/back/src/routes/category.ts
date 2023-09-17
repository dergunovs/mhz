import { ICategory } from 'mhz-types';

import { IFastifyInstance, IQuery } from '../interface/index.js';
import { categoryService } from '../services/category.js';
import {
  categoryGetManyScheme,
  categoryGetOneScheme,
  TCategory,
  categoryScheme,
  TCategoryParams,
} from '../schemas/category.js';
import { TBaseReply } from '../schemas/base.js';

export default async function (fastify: IFastifyInstance) {
  fastify.addSchema(categoryScheme);

  fastify.get<{ Querystring: IQuery; Reply: { 200: TCategory[] } }>(
    '/category',
    categoryGetManyScheme,
    async function (request, reply) {
      const categories = await categoryService.getMany();

      reply.code(200).send(categories);
    }
  );

  fastify.get<{ Params: TCategoryParams; Reply: { 200: TCategory | null; '4xx': TBaseReply } }>(
    '/category/:id',
    categoryGetOneScheme,
    async function (request, reply) {
      const { category, isCategoryFound, isNotValidId } = await categoryService.getOne(request.params.id);

      if (isCategoryFound) {
        reply.code(200).send(category);
      } else if (isNotValidId) {
        reply.code(404).send({ message: 'Not Valid id' });
      } else {
        reply.code(404).send({ message: 'Category not found' });
      }
    }
  );

  fastify.patch<{ Body: ICategory; Params: { id: string }; Reply: { 200: TBaseReply } }>(
    '/category/:id',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      await categoryService.update(request.params.id, request.body);

      reply.code(200).send({ message: 'Category updated' });
    }
  );

  fastify.post<{ Body: ICategory; Reply: { 201: TBaseReply; '5xx': TBaseReply } }>(
    '/category',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      const isReachedLimit = await categoryService.create(request.body);

      if (isReachedLimit) {
        reply.code(500).send({ message: 'You have reached maximum categories count' });
      } else {
        reply.code(201).send({ message: 'Category created' });
      }
    }
  );

  fastify.delete<{ Params: { id: string }; Reply: { 200: TBaseReply } }>(
    '/category/:id',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      await categoryService.delete(request.params.id);

      reply.code(200).send({ message: 'Category deleted' });
    }
  );
}
