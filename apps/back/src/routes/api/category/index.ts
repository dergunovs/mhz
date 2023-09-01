import { ICategory } from 'mhz-types';

import Category from '../../../models/category.js';
import { IFastifyInstance, IQuery } from '../../../interface/index.js';
import { deleteFile, paginate } from '../../../helpers/index.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: IQuery }>('/', async function (request, reply) {
    try {
      const { data, total } = await paginate(Category, {
        page: request.query.page,
        sort: request.query.sort,
        dir: request.query.dir,
      });

      reply.code(200).send({ data, total });
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.get<{ Params: { id: string } }>('/:id', async function (request, reply) {
    try {
      const category = await Category.findOne({ _id: request.params.id }).lean().exec();

      reply.code(200).send(category);
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.patch<{ Body: ICategory; Params: { id: string } }>(
    '/:id',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      try {
        await Category.findOneAndUpdate({ _id: request.params.id }, { ...request.body, dateUpdated: new Date() });
        reply.code(200).send({ message: 'updated' });
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.post<{ Body: ICategory }>('/', { preValidation: [fastify.onlyManager] }, async function (request, reply) {
    try {
      const category = new Category(request.body);

      await category.save();
      reply.code(201).send({ message: 'created' });
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.delete<{ Params: { id: string } }>(
    '/:id',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      try {
        const category = await Category.findOne({ _id: request.params.id });

        deleteFile(category?.iconUrl);

        await category?.deleteOne();

        reply.code(200).send({ message: 'deleted' });
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );
}
