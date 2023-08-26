import Product from '../../../models/product.js';
import Category from '../../../models/category.js';
import Manufacturer from '../../../models/manufacturer.js';
import Manager from '../../../models/manager.js';

import { IFastifyInstance } from '../../../interface/index.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: { search: string } }>('/', async function (request, reply) {
    try {
      let result;

      await Promise.all([
        await Product.find({ title: { $regex: request.query.search, $options: 'i' } })
          .lean()
          .exec(),

        await Category.find({ title: { $regex: request.query.search, $options: 'i' } })
          .lean()
          .exec(),

        await Manufacturer.find({ title: { $regex: request.query.search, $options: 'i' } })
          .lean()
          .exec(),

        Manager.find({
          $or: [
            { email: { $regex: request.query.search, $options: 'i' } },
            { firstName: { $regex: request.query.search, $options: 'i' } },
            { lastName: { $regex: request.query.search, $options: 'i' } },
          ],
        })
          .lean()
          .exec(),
      ]).then(([products, categories, manufacturers, managers]) => {
        result = { products, categories, manufacturers, managers };
      });

      reply.code(200).send(result);
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });
}
