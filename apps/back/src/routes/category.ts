import { ICategory } from 'mhz-types';

import { IFastifyInstance, IQuery } from '../interface/index.js';
import { categoryService } from '../services/category.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: IQuery }>('/category', async function (request, reply) {
    try {
      const categories = await categoryService.getMany();

      reply.code(200).send(categories);
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.get<{ Params: { id: string } }>('/category/:id', async function (request, reply) {
    try {
      const category = await categoryService.getOne(request.params.id);

      reply.code(200).send(category);
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.patch<{ Body: ICategory; Params: { id: string } }>(
    '/category/:id',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      try {
        await categoryService.update(request.params.id, request.body);

        reply.code(200).send({ message: 'Category updated' });
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.post<{ Body: ICategory }>(
    '/category',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      try {
        const isReachedLimit = await categoryService.create(request.body);

        if (isReachedLimit) {
          reply.code(500).send({ message: 'You have reached maximum categories count' });
        } else {
          reply.code(201).send({ message: 'Category created' });
        }
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.delete<{ Params: { id: string } }>(
    '/category/:id',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      try {
        await categoryService.delete(request.params.id);

        reply.code(200).send({ message: 'Category deleted' });
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );
}
