import Product from '../../../models/product.js';
import Category from '../../../models/category.js';
import Manufacturer from '../../../models/manufacturer.js';
import Manager from '../../../models/manager.js';
import Customer from '../../../models/customer.js';
import Order from '../../../models/order.js';

import { IFastifyInstance } from '../../../interface/index.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: { search: string } }>(
    '/count',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      let count = {};

      try {
        await Promise.all([
          await Product.estimatedDocumentCount(),
          await Category.estimatedDocumentCount(),
          await Manufacturer.estimatedDocumentCount(),
          await Manager.estimatedDocumentCount(),
          await Customer.estimatedDocumentCount(),
          await Order.estimatedDocumentCount(),
        ]).then(([products, categories, manufacturers, managers, customers, orders]) => {
          count = { products, categories, manufacturers, managers, customers, orders };
        });

        reply.code(200).send(count);
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );
}
