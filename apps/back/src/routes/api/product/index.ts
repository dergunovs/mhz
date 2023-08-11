import Product from '../../../models/product.js';
import { IFastifyInstance } from '../../../interface/index.js';
import { paginate } from '../../../helpers/index.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: { page?: string } }>('/', async function (request, reply) {
    try {
      const { data, total } = await paginate(Product, request.query.page);

      reply.code(200).send({ data, total });
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });
}
