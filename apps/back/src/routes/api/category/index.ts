import { ICategory } from 'mhz-types';

import Category from '../../../models/category.js';
import { IFastifyInstance } from '../../../interface/index.js';
import { deleteFile, paginate } from '../../../helpers/index.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: { page?: string } }>('/', async function (request, reply) {
    try {
      const { data, total } = await paginate(Category, request.query.page);

      reply.code(200).send({ data, total });
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.delete<{ Params: { id: string } }>(
    '/:id',
    { preValidation: [fastify.checkAuth] },
    async function (request, reply) {
      try {
        const category = await Category.findOne({ _id: request.params.id });

        await category?.deleteOne();

        deleteFile(category?.iconUrl);

        reply.code(200).send({ message: 'deleted' });
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );
}
