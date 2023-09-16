import { ICategory } from 'mhz-types';

import { IFastifyInstance, IQuery, IBaseReply, IBaseError } from '../interface/index.js';
import { categoryService } from '../services/category.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: IQuery; Reply: { 200: ICategory[] } }>('/category', async function (request, reply) {
    const categories = await categoryService.getMany();

    reply.code(200).send(categories);
  });

  fastify.get<{ Params: { id: string }; Reply: { 200: ICategory | null } }>(
    '/category/:id',
    async function (request, reply) {
      const category = await categoryService.getOne(request.params.id);

      reply.code(200).send(category);
    }
  );

  fastify.patch<{ Body: ICategory; Params: { id: string }; Reply: { 200: IBaseReply } }>(
    '/category/:id',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      await categoryService.update(request.params.id, request.body);

      reply.code(200).send({ message: 'Category updated' });
    }
  );

  fastify.post<{ Body: ICategory; Reply: { 201: IBaseReply; '5xx': IBaseError } }>(
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

  fastify.delete<{ Params: { id: string }; Reply: { 200: IBaseReply } }>(
    '/category/:id',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      await categoryService.delete(request.params.id);

      reply.code(200).send({ message: 'Category deleted' });
    }
  );
}
