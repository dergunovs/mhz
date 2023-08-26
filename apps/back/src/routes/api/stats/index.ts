import Product from '../../../models/product.js';
import Category from '../../../models/category.js';
import Manufacturer from '../../../models/manufacturer.js';
import Manager from '../../../models/manager.js';

import { IFastifyInstance } from '../../../interface/index.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: { search: string } }>('/count', async function (request, reply) {
    let count = {};

    try {
      await Promise.all([
        await Product.estimatedDocumentCount(),
        await Category.estimatedDocumentCount(),
        await Manufacturer.estimatedDocumentCount(),
        await Manager.estimatedDocumentCount(),
      ]).then(([products, categories, manufacturers, managers]) => {
        count = { products, categories, manufacturers, managers };
      });

      reply.code(200).send(count);
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });
}
