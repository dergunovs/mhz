import { ICategory } from 'mhz-types';

import Category from '../../../models/category.js';

import { IFastifyInstance, IQuery } from '../../../interface/index.js';
import { deleteFile } from '../../../helpers/index.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: IQuery }>('/', async function (request, reply) {
    try {
      const categories = await Category.find().select('-description -fields -__v').sort('title').lean().exec();

      reply.code(200).send(categories);
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
      const count = await Category.find().countDocuments().exec();

      if (count === 12) {
        reply.code(500).send({ message: 'You have reached maximum categories count' });
      } else {
        const category = new Category(request.body);

        await category.save();
        reply.code(201).send({ message: 'created' });
      }
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
